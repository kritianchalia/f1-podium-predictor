def build_feature_vector(quali_position, last_n_stats, constructor_stats):
    return {
      "qualifying_position": quali_position,
      "prev_race_finish": last_n_stats['prev_finish'],
      "rolling_avg_finish": last_n_stats['avg_finish'],
      "rolling_podium_rate": last_n_stats['podium_rate'],
      "constructor_prev_avg_finish": constructor_stats['prev_finish'],
      "constructor_rolling_avg_finish": constructor_stats['avg_finish'],
      "constructor_rolling_podium_rate": constructor_stats['podium_rate']
    }
