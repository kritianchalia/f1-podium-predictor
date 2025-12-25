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
    quali_df,round_number = get_quali_results(season, race_name)
    # merge with feature store to get driver & constructor IDs
    feature_store_df = load_feature_store()
    feature_store_df = feature_store_df[feature_store_df['year'] == season]
    feature_store_drivers = (
    feature_store_df.sort_values('round')
    .groupby('driverId')
    .tail(1)        # latest round
    )

    merged = quali_df.merge(
    feature_store_drivers[['driverId', 'constructorId', 'FullName']],
    how="left",
    left_on="FullName",
    right_on="FullName"
    )

    # Inspect / guard against missing IDs
    # missing = merged[merged['driverId'].isna() | merged['constructorId'].isna()]
    # if not missing.empty:
    #     print("WARNING: missing driverId/constructorId for these drivers:")
    #     print(missing[['FullName', 'qualifying_position']])

    #     merged = merged.dropna(subset=['driverId', 'constructorId'])
    print("this is merged",merged)
    results = []
    for _, row in merged.iterrows():
        driver_stats = get_driver_past_stats(row['driverId'],round_number, season)
        constructor_stats = get_constructor_past_stats(row['constructorId'],round_number, season)

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