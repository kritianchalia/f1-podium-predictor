package com.f1predictor.backend.service;

import com.f1predictor.backend.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PredictionService {

    @Autowired FeatureStoreService featureStore;
    @Autowired QualifyingFetchService qualiService;
    @Autowired ModelService modelService;

    public PredictionResponse predictRace(PredictionRequest req) {
        List<QualifyingResult> quali = qualiService.fetch(req.getSeason(), req.getRaceName());
        System.out.println("this is quali data"+ quali);
        List<PredictedDriver> results = quali.stream()
                .map(q -> {
                    DriverFeatureRow f = featureStore.getLatest(q.getDriverId());
                    System.out.println("this is f"+ f);
                    ModelFeatureSet m = new ModelFeatureSet(
                            q.getDriverId(),
                            q.getQualifyingPosition(),
                            f.getPrevRaceFinish(),
                            f.getRollingAvgFinish(),
                            f.getRollingPodiumRate(),
                            f.getConstructorPrevAvgFinish(),
                            f.getConstructorRollingAvgFinish(),
                            f.getConstructorRollingPodiumRate()
                    );

                    double prob = modelService.predict(m);
                    return new PredictedDriver(f.getDriverName(), prob);
                })
                .sorted(Comparator.comparingDouble(PredictedDriver::getProbability).reversed())
                .collect(Collectors.toList());

        return new PredictionResponse(results.subList(0, 3));
    }
}
