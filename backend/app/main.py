from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd


app = FastAPI(title="RailSense API")


# Allow requests from the frontend
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="RailSense API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://anushris1234-star.github.io",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=False,
)

# Load trained ML model
model_path = "backend/ml/models/confirmation_model.joblib"
model = joblib.load(model_path)


# Load synthetic historical ticket data
data_path = "backend/ml/data/tickets.csv"
ticket_data = pd.read_csv(data_path)


# -----------------------------
# Request models
# -----------------------------

class TicketInput(BaseModel):
    train_id: str
    source: str
    destination: str
    travel_class: str
    quota: str
    current_wl: int
    days_to_journey: int
    day_of_week: int
    is_weekend: int
    historical_confirmation_rate: float
    historical_cancellation_rate: float


class SimulationChanges(BaseModel):
    current_wl: int | None = None
    days_to_journey: int | None = None
    day_of_week: int | None = None
    is_weekend: int | None = None
    train_id: str | None = None
    travel_class: str | None = None


class SimulationInput(BaseModel):
    current: TicketInput
    changes: SimulationChanges


class AlternativesInput(BaseModel):
    train_id: str
    source: str
    destination: str
    travel_class: str
    quota: str
    current_wl: int
    days_to_journey: int
    day_of_week: int
    is_weekend: int
    historical_confirmation_rate: float
    historical_cancellation_rate: float


# -----------------------------
# Shared ML prediction function
# -----------------------------

def predict_probability(ticket_data: dict) -> float:
    """
    Run the saved ML model and return confirmation probability.
    """

    input_df = pd.DataFrame([ticket_data])

    probability = model.predict_proba(input_df)[0][1]

    return float(probability)


# -----------------------------
# Health check
# -----------------------------

@app.get("/health")
def health_check():
    return {"status": "ok"}


# -----------------------------
# Prediction endpoint
# -----------------------------

@app.post("/predict")
def predict_ticket(ticket: TicketInput):

    probability = predict_probability(ticket.model_dump())
    percentage = probability * 100

    if percentage >= 75:
        prediction_band = "high"
    elif percentage >= 50:
        prediction_band = "moderate"
    else:
        prediction_band = "low"

    return {
        "confirmation_probability": round(probability, 4),
        "confirmation_percentage": round(percentage, 2),
        "prediction_band": prediction_band,
    }


# -----------------------------
# Simulation endpoint
# -----------------------------

@app.post("/simulate")
def simulate_ticket(simulation: SimulationInput):

    # Convert current ticket to a dictionary
    original_ticket = simulation.current.model_dump()

    # Calculate original probability
    original_probability = predict_probability(original_ticket)

    # Make a copy so we don't modify the original
    modified_ticket = original_ticket.copy()

    # Apply requested changes
    changes = simulation.changes.model_dump(exclude_none=True)

    modified_ticket.update(changes)

    # Calculate new probability using THE SAME MODEL
    new_probability = predict_probability(modified_ticket)

    # Calculate difference
    change = new_probability - original_probability
    change_percentage_points = change * 100

    # Generate recommendation
    if change_percentage_points > 5:
        recommendation = (
            "This change significantly improves the estimated "
            "confirmation probability."
        )

    elif change_percentage_points > 0:
        recommendation = (
            "This change slightly improves the estimated "
            "confirmation probability."
        )

    elif change_percentage_points < -5:
        recommendation = (
            "This change significantly reduces the estimated "
            "confirmation probability."
        )

    elif change_percentage_points < 0:
        recommendation = (
            "This change slightly reduces the estimated "
            "confirmation probability."
        )

    else:
        recommendation = (
            "This change has little effect on the estimated "
            "confirmation probability."
        )

    return {
        "original_probability": round(original_probability, 4),
        "new_probability": round(new_probability, 4),
        "change": round(change, 4),
        "change_percentage_points": round(
            change_percentage_points, 2
        ),
        "recommendation": recommendation,
    }


# -----------------------------
# Alternatives endpoint
# -----------------------------

@app.post("/alternatives")
def find_alternatives(ticket: AlternativesInput):

    current_ticket = ticket.model_dump()

    # Calculate probability of the user's current ticket
    current_probability = predict_probability(current_ticket)

    # Find candidates matching the same route and class
    candidates = ticket_data[
        (ticket_data["source"] == ticket.source)
        & (ticket_data["destination"] == ticket.destination)
        & (ticket_data["travel_class"] == ticket.travel_class)
    ].copy()

    # Don't recommend the exact same train
    candidates = candidates[
        candidates["train_id"].astype(str) != str(ticket.train_id)
    ]

    # Prefer candidates with similar journey timing
    candidates["timing_difference"] = (
        abs(candidates["days_to_journey"] - ticket.days_to_journey)
        + abs(candidates["day_of_week"] - ticket.day_of_week)
    )

    candidates = candidates.sort_values("timing_difference")

    alternatives = []

    for _, candidate in candidates.iterrows():

        candidate_ticket = {
            "train_id": str(candidate["train_id"]),
            "source": candidate["source"],
            "destination": candidate["destination"],
            "travel_class": candidate["travel_class"],
            "quota": ticket.quota,
            "current_wl": int(candidate["current_wl"]),
            "days_to_journey": int(candidate["days_to_journey"]),
            "day_of_week": int(candidate["day_of_week"]),
            "is_weekend": int(candidate["is_weekend"]),
            "historical_confirmation_rate": float(
                candidate["historical_confirmation_rate"]
            ),
            "historical_cancellation_rate": float(
                candidate["historical_cancellation_rate"]
            ),
        }

        probability = predict_probability(candidate_ticket)

        improvement = (
            probability - current_probability
        ) * 100

        alternatives.append({
            "train_id": candidate_ticket["train_id"],
            "source": candidate_ticket["source"],
            "destination": candidate_ticket["destination"],
            "travel_class": candidate_ticket["travel_class"],
            "current_wl": candidate_ticket["current_wl"],
            "confirmation_percentage": round(
                probability * 100, 2
            ),
            "improvement": round(improvement, 2),
        })

    # Rank by predicted confirmation probability
    alternatives.sort(
        key=lambda x: x["confirmation_percentage"],
        reverse=True
    )

    # Return maximum 5 alternatives
    alternatives = alternatives[:5]

    return {
        "current_probability": round(
            current_probability * 100, 2
        ),
        "alternatives": alternatives,
        "data_source": "synthetic_prototype_data",
        "live_availability": False,
    }