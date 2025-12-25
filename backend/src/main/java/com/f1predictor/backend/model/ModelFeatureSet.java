package com.f1predictor.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ModelFeatureSet {
    private long driverId;
    private int qualifyingPosition;
    private double prevRaceFinish;
    private double rollingAvgFinish;
    private double rollingPodiumRate;
    private double constructorPrevAvgFinish;
    private double constructorRollingAvgFinish;
    private double constructorRollingPodiumRate;
}

