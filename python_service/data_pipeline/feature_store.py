import pandas as pd

FEATURE_PATH = "/Users/kriti/Desktop/f1-podium-predictor/notebook/historical_features.parquet"


def load_feature_store():
    return pd.read_parquet(FEATURE_PATH)


def get_driver_past_stats(driver_id: int, year: int, n: int = 5):

    df = load_feature_store()
    past = df[(df['driverId'] == driver_id) & (df['year'] < year)].sort_values('year', ascending=False).head(n)
    print("this is driver df",df,"\n")
    print("this is driver past",past,"\n")
    return {
        "prev_finish": past['positionOrder'].iloc[0] if len(past) > 0 else 10,
        "avg_finish": past['positionOrder'].mean() if len(past) > 0 else 10,
        "podium_rate": past['podium'].mean() if len(past) > 0 else 0.0,
    }


def get_constructor_past_stats(constructor_id: int, year: int, n: int = 5):
    df = load_feature_store()
    past = df[(df['constructorId'] == constructor_id) & (df['year'] < year)].sort_values('year', ascending=False).head(n)
    print("this is constructor df",df,"\n")
    print("this is constructor past",past,"\n")
    return {
        "prev_finish": past['constructor_prev_avg_finish'].iloc[0] if len(past) > 0 else 10,
        "avg_finish": past['constructor_rolling_avg_finish'].mean() if len(past) > 0 else 10,
        "podium_rate": past['constructor_rolling_podium_rate'].mean() if len(past) > 0 else 0.0,
    }
