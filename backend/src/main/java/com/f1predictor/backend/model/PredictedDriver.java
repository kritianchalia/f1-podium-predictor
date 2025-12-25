package com.f1predictor.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PredictedDriver {
    private String driverName;
    private double probability;
}

