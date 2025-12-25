package com.f1predictor.backend.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PredictionResponse {
    private List<PredictedDriver> podium;
}

