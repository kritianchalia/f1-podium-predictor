package com.f1predictor.backend.service;

import com.f1predictor.backend.model.DriverFeatureRow;
import org.apache.avro.generic.GenericRecord;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.parquet.avro.AvroParquetReader;
import org.apache.parquet.hadoop.ParquetReader;
import org.apache.parquet.hadoop.util.HadoopInputFile;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;

@Service
public class FeatureStoreService {

    private Map<Long, DriverFeatureRow> Map = new HashMap<>();

    @PostConstruct
    public void load() {
        try {
            String parquetPath = "/Users/kriti/Desktop/f1-podium-predictor/notebook/historical_features.parquet";
            Path path = new Path(parquetPath);
            Configuration conf = new Configuration();

            ParquetReader<GenericRecord> reader =
                    AvroParquetReader.<GenericRecord>builder(
                            HadoopInputFile.fromPath(path, conf)
                    ).build();

            GenericRecord rec;
            while ((rec = reader.read()) != null) {
                long driverId = (long) rec.get("driverId");
                String driverName = rec.get("forename").toString() + " " +
                                    rec.get("surname").toString();

                DriverFeatureRow row = new DriverFeatureRow(
                        driverId,
                        driverName,
                        (double) rec.get("prev_race_finish"),
                        (double) rec.get("rolling_avg_finish"),
                        (double) rec.get("rolling_podium_rate"),
                        (double) rec.get("constructor_prev_avg_finish"),
                        (double) rec.get("constructor_rolling_avg_finish"),
                        (double) rec.get("constructor_rolling_podium_rate")
                );
                Map.put(driverId, row);
            }
            reader.close();
            System.out.println("Loaded feature store for " + Map.size() + " drivers");

        } catch (Exception e) {
            System.out.println("WE GOT AN ERROR");
            e.printStackTrace();
        }
    }

    public DriverFeatureRow getLatest(long driverId) {

        System.out.println(driverId);
        return Map.get(driverId);
        
    }
}
