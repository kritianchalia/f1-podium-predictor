package com.f1predictor.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.f1predictor.backend.model.PredictionRequest;
import com.f1predictor.backend.model.PredictionResponse;
import com.f1predictor.backend.service.PredictionService;

@RestController
@RequestMapping("/api")
public class PredictionController {

    @Autowired
    private PredictionService predictionService;

    @PostMapping("/predict")
    public PredictionResponse predict(@RequestBody PredictionRequest request) {
        System.out.println("welcome");
        return predictionService.predictRace(request);
    }
}

