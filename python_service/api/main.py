

from fastapi import FastAPI
from data_pipeline.fastf1_client import get_quali_results
from data_pipeline.feature_store import load_feature_store, get_driver_past_stats, get_constructor_past_stats
from data_pipeline.feature_builder import build_feature_vector
from model.inference import predict_prob
from pydantic import BaseModel

app = FastAPI()
class RaceRequest(BaseModel):
    season: int
    race_name: str

@app.post("/predict")
def predict_podium(req: RaceRequest):
    season = req.season
    race_name = req.race_name
    # Pull quali results
    quali_df = get_quali_results(season, race_name)

    # merge with feature store to get driver & constructor IDs
    feature_store_df = load_feature_store()
    merged = feature_store_df.merge(quali_df[['DriverNumber', 'FullName', 'qualifying_position', 'Q1', 'Q2', 'Q3']],
                            on="FullName",
                            how="left")
    print("this is merged",merged)
    results = []
    for _, row in merged.iterrows():
        print("this is row",row)
        driver_stats = get_driver_past_stats(row['driverId'], season)
        constructor_stats = get_constructor_past_stats(row['constructorId'], season)

        features = build_feature_vector(
            quali_position=row['qualifying_position'],
            last_n_stats=driver_stats,
            constructor_stats=constructor_stats
        )

        podium_prob = predict_prob(features)

        results.append({
            "driver": row['FullName'],
            "qualifying_position": int(row['qualifying_position']),
            "podium_probability": round(podium_prob, 4)
        })

    # sort by highest chance
    results = sorted(results, key=lambda x: x['podium_probability'], reverse=True)

    return {
        "race": race_name,
        "season": season,
        "predicted_top3": results[:3],
        "full_probabilities": results
    }
