import xgboost as xgb
import pandas as pd

# TODO: make this path relative or configurable
MODEL_PATH = "/Users/kriti/Desktop/f1-podium-predictor/notebook/xgb_model.json"

model = xgb.XGBClassifier()
model.load_model(MODEL_PATH)

def predict_prob(features: dict) -> float:
    df = pd.DataFrame([features])
    proba = model.predict_proba(df)[0][1]
    return float(proba)