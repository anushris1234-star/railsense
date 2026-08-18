from fastapi import FastAPI
from pydantic import BaseModel
import joblib

from fastapi import FastAPI

app = FastAPI(title="RailSense API")
model_path = "backend/ml/models/confirmation_model.joblib"

model = joblib.load(model_path)
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

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/predict")
def predict_ticket(ticket: TicketInput):

    input_data = [[
        ticket.train_id,
        ticket.source,
        ticket.destination,
        ticket.travel_class,
        ticket.quota,
        ticket.current_wl,
        ticket.days_to_journey,
        ticket.day_of_week,
        ticket.is_weekend,
        ticket.historical_confirmation_rate,
        ticket.historical_cancellation_rate,
    ]]

    columns = [
        "train_id",
        "source",
        "destination",
        "travel_class",
        "quota",
        "current_wl",
        "days_to_journey",
        "day_of_week",
        "is_weekend",
        "historical_confirmation_rate",
        "historical_cancellation_rate",
    ]

    import pandas as pd

    input_df = pd.DataFrame(input_data, columns=columns)

    probability = model.predict_proba(input_df)[0][1]

    return {
        "confirmation_probability": round(float(probability), 4),
        "confirmation_percentage": round(float(probability * 100), 2),
    }

