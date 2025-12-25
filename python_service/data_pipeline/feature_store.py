import pandas as pd

FEATURE_PATH = "/Users/kriti/Desktop/f1-podium-predictor/notebook/historical_features.parquet"


def load_feature_store():
    return pd.read_parquet(FEATURE_PATH)


def get_driver_past_stats(driver_id: int, season: int, round_number: int, n: int = 5):
    df = load_feature_store()

    mask = (
        (df['driverId'] == driver_id) &
        (
            (df['year'] < season) |
            ((df['year'] == season) & (df['round'] < round_number))
        )
    )

    past = df.loc[mask].sort_values(['year', 'round'])

    if past.empty:
        return {
            "prev_finish": 10,
            "avg_finish": 10,
            "podium_rate": 0.0,
        }

    last_n = past.tail(n)

    return {
        "prev_finish": float(last_n['positionOrder'].iloc[-1]),
        "avg_finish": float(last_n['positionOrder'].mean()),
        "podium_rate": float(last_n['podium'].mean()),
    }

def get_constructor_past_stats(constructor_id: int, season: int, round_number: int):
    df = load_feature_store()

    mask = (
        (df['constructorId'] == constructor_id) &
        (
            (df['year'] < season) |
            ((df['year'] == season) & (df['round'] < round_number))
        )
    )

    past = df.loc[mask].sort_values(['year', 'round'])

    if past.empty:
        return {
            "prev_finish": 10,
            "avg_finish": 10,
            "podium_rate": 0.0,
        }

    last_row = past.iloc[-1]

    return {
        "prev_finish": float(last_row['constructor_prev_avg_finish']),
        "avg_finish": float(last_row['constructor_rolling_avg_finish']),
        "podium_rate": float(last_row['constructor_rolling_podium_rate']),
    }