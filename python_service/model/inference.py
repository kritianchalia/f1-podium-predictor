import xgboost as xgb
import joblib
import pandas as pd

# load model + scaler
model = xgb.XGBClassifier()
model.load_model("/Users/kriti/Desktop/f1-podium-predictor/notebook/xgb_model.json")

scaler = joblib.load("/Users/kriti/Desktop/f1-podium-predictor/notebook/scaler.pkl")


def predict_prob(features: dict) -> float:
    df = pd.DataFrame([features])
    df_scaled = scaler.transform(df)
    proba = model.predict_proba(df_scaled)[0][1]
    return float(proba)
