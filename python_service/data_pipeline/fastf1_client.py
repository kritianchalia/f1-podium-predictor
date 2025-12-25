import os
import fastf1

CACHE_PATH = '/Users/kriti/Desktop/f1-podium-predictor/python_service/f1_cache'
fastf1.Cache.enable_cache(CACHE_PATH)

from fastf1 import get_session

def get_quali_results(year: int, race_name: str):
    session = get_session(year, race_name, 'Q')
    session.load()

    quali_df = session.results[['DriverNumber', 'FullName', 'Position', 'Q1', 'Q2', 'Q3']]
    quali_df['FullName'] = quali_df['FullName'].str.lower()
    quali_df = quali_df.rename(columns={"Position": "qualifying_position"})

    # FastF1 exposes the round number via the event object
    round_number = int(session.event['RoundNumber'])

    return quali_df, round_number