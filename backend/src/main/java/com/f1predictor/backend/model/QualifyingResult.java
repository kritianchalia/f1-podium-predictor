package com.f1predictor.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QualifyingResult {
    private long driverId;
    private int qualifyingPosition;
}

