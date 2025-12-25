package com.f1predictor.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.f1predictor.backend.model.ModelFeatureSet;
import com.f1predictor.backend.model.ModelPredictionResponse;

@Service
public class ModelService {

    private final RestTemplate rest = new RestTemplate();

    public double predict(ModelFeatureSet features) {
        // String url = "http://localhost:8000/predict";
        // ModelPredictionResponse res =
        //         rest.postForObject(url, features, ModelPredictionResponse.class);
        // return res.getPrediction();
        return 345678;
    }
}
