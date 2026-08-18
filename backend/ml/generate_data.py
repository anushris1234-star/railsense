import numpy as np
import pandas as pd

np.random.seed(42)

N = 5000

trains = [
    ("12952", "Delhi", "Mumbai"),
    ("12951", "Mumbai", "Delhi"),
    ("12621", "Chennai", "New Delhi"),
    ("12622", "New Delhi", "Chennai"),
    ("12007", "Chennai", "Bengaluru"),
    ("12008", "Bengaluru", "Chennai"),
    ("12839", "Howrah", "Chennai"),
    ("12840", "Chennai", "Howrah"),
]

classes = ["SL", "3A", "2A", "CC"]
quotas = ["GN", "TQ"]

data = []

for _ in range(N):
    train_id, source, destination = trains[
        np.random.randint(len(trains))
    ]

    travel_class = np.random.choice(classes)
    quota = np.random.choice(quotas, p=[0.85, 0.15])

    current_wl = np.random.randint(1, 61)
    days_to_journey = np.random.randint(1, 31)

    day_of_week = np.random.randint(7)
    is_weekend = int(day_of_week >= 5)

    historical_confirmation_rate = np.clip(
        np.random.normal(0.78, 0.10),
        0.40,
        0.98
    )

    historical_cancellation_rate = np.clip(
        np.random.normal(0.18, 0.07),
        0.03,
        0.40
    )

    # Calculate a realistic confirmation tendency.
    score = (
        1.8
        - 0.045 * current_wl
        + 0.055 * days_to_journey
        + 1.5 * historical_confirmation_rate
        + 0.8 * historical_cancellation_rate
        - 0.35 * is_weekend
        - 0.5 * (quota == "TQ")
    )

    probability = 1 / (1 + np.exp(-score))

    confirmed = np.random.binomial(1, probability)
    # Train-specific demand profile.
    train_effects = {
        "12952": 0.10,
        "12951": 0.05,
        "12621": -0.05,
        "12622": -0.10,
        "12007": 0.15,
        "12008": 0.10,
        "12839": -0.15,
        "12840": -0.10,
    }

    train_effect = train_effects[train_id]

    # Class-specific demand.
    class_effects = {
        "SL": 0.05,
        "3A": 0.10,
        "2A": -0.05,
        "CC": 0.00,
    }

    class_effect = class_effects[travel_class]

    # Build the underlying confirmation score.
    score = (
        -0.90
        - 0.055 * current_wl
        + 0.070 * days_to_journey
        + 1.4 * historical_confirmation_rate
        + 1.0 * historical_cancellation_rate
        + train_effect
        + class_effect
        - 0.30 * is_weekend
        - 0.80 * (quota == "TQ")
    )

    # Convert score into probability.
    probability = 1 / (1 + np.exp(-score))

    # Add a little uncertainty so the relationship isn't deterministic.
    probability = np.clip(
        probability + np.random.normal(0, 0.04),
        0.02,
        0.98
    )

    confirmed = np.random.binomial(1, probability)
    data.append({
        "train_id": train_id,
        "source": source,
        "destination": destination,
        "travel_class": travel_class,
        "quota": quota,
        "current_wl": current_wl,
        "days_to_journey": days_to_journey,
        "day_of_week": day_of_week,
        "is_weekend": is_weekend,
        "historical_confirmation_rate": round(
            historical_confirmation_rate, 3
        ),
        "historical_cancellation_rate": round(
            historical_cancellation_rate, 3
        ),
        "confirmed": confirmed,
    })


df = pd.DataFrame(data)

output_path = "backend/ml/data/tickets.csv"

df.to_csv(output_path, index=False)

print(f"Generated {len(df)} records.")
print(f"Saved to: {output_path}")
print("\nFirst 5 rows:")
print(df.head())

print("\nConfirmation distribution:")
print(df["confirmed"].value_counts(normalize=True))