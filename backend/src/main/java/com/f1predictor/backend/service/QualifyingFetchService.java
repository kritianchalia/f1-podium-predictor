package com.f1predictor.backend.service;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.f1predictor.backend.model.QualifyingResult;

@Service
public class QualifyingFetchService {

    private final RestTemplate rest = new RestTemplate();

    public List<QualifyingResult> fetch(int season, String race) {
        // String url = "http://localhost:9000/quali?season="+season+"&race="+race;
        // ResponseEntity<QualifyingResult[]> response =
        //     rest.getForEntity(url, QualifyingResult[].class);

        // return Arrays.asList(response.getBody());
        return Arrays.asList(
                new QualifyingResult(830, 1),
                new QualifyingResult(4, 2),
                new QualifyingResult(1, 3)
        );
    }
}

