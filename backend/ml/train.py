import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
)
import joblib


# Load dataset
df = pd.read_csv("backend/ml/data/tickets.csv")

print("Dataset shape:", df.shape)
print("\nColumns:")
print(df.columns.tolist())


# Features used by the model
features = [
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

target = "confirmed"


X = df[features]
y = df[target]

# Columns containing text/categories
categorical_features = [
    "train_id",
    "source",
    "destination",
    "travel_class",
    "quota",
]

# Columns already represented as numbers
numeric_features = [
    "current_wl",
    "days_to_journey",
    "day_of_week",
    "is_weekend",
    "historical_confirmation_rate",
    "historical_cancellation_rate",
]


# Convert categorical values into numerical features
preprocessor = ColumnTransformer(
    transformers=[
        (
            "categorical",
            OneHotEncoder(handle_unknown="ignore"),
            categorical_features,
        ),
        (
            "numeric",
            "passthrough",
            numeric_features,
        ),
    ]
)
# Create the ML model
model = RandomForestClassifier(
    n_estimators=200,
    max_depth=12,
    random_state=42,
    class_weight="balanced",
)

# Combine preprocessing + model into one pipeline
pipeline = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        ("model", model),
    ]
)


# Split into training and testing data
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)


print("\nTraining samples:", len(X_train))
print("Testing samples:", len(X_test))

# Train the model
pipeline.fit(X_train, y_train)

print("\nModel training complete!")
# Make predictions on data the model has never seen
y_pred = pipeline.predict(X_test)

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)

print("\nModel Evaluation")
print("----------------")
print(f"Accuracy: {accuracy:.4f}")

print("\nClassification Report:")
print(classification_report(y_test, y_pred))

print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))

# Get confirmation probabilities
probabilities = pipeline.predict_proba(X_test)[:, 1]

print("\nFirst 10 confirmation probabilities:")
print(probabilities[:10])

# Test a realistic ticket
sample_ticket = pd.DataFrame([{
    "train_id": "12952",
    "source": "Delhi",
    "destination": "Mumbai",
    "travel_class": "3A",
    "quota": "GN",
    "current_wl": 10,
    "days_to_journey": 18,
    "day_of_week": 5,
    "is_weekend": 1,
    "historical_confirmation_rate": 0.82,
    "historical_cancellation_rate": 0.18,
}])

sample_probability = pipeline.predict_proba(sample_ticket)[0][1]

print("\nSample Ticket")
print("-------------")
print(f"Confirmation probability: {sample_probability:.2%}")
# Save the trained pipeline
model_path = "backend/ml/models/confirmation_model.joblib"

joblib.dump(pipeline, model_path)

print(f"\nModel saved to: {model_path}")