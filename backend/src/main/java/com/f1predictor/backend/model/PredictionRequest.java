package com.f1predictor.backend.model;

import lombok.Data;

@Data
public class PredictionRequest {
    private int season;
    private String raceName;
}

