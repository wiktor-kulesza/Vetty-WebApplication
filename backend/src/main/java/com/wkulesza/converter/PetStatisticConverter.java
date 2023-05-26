package com.wkulesza.converter;

import com.wkulesza.dto.statistic.FactorsData;
import com.wkulesza.dto.statistic.PetStatisticDto;
import com.wkulesza.entity.statistic.PetStatistic;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PetStatisticConverter {

    public static List<PetStatisticDto> convert(List<PetStatistic> petStatistics) {
        Map<String, List<FactorsData>> groupedData = new HashMap<>();

        // Group the data by factor
        for (PetStatistic petStatistic : petStatistics) {
            String factor = petStatistic.getFactor();
            Date date = petStatistic.getDate();
            Double averageValue = petStatistic.getAverageValue();
            Double averageBreedValue = petStatistic.getBreedAverageValue();

            FactorsData factorsData = FactorsData.builder()
                    .date(date)
                    .averageValue(averageValue)
                    .averageBreedValue(averageBreedValue).build();
            if (groupedData.containsKey(factor)) {
                groupedData.get(factor).add(factorsData);
            } else {
                List<FactorsData> data = new ArrayList<>();
                data.add(factorsData);
                groupedData.put(factor, data);
            }
        }

        // Convert the grouped data to PetStatisticDto objects
        List<PetStatisticDto> petStatisticDtos = new ArrayList<>();

        for (Map.Entry<String, List<FactorsData>> entry : groupedData.entrySet()) {
            String factor = entry.getKey();
            List<FactorsData> factorsData = entry.getValue();

            PetStatisticDto petStatisticDto = new PetStatisticDto(factor, factorsData);
            petStatisticDtos.add(petStatisticDto);
        }

        return petStatisticDtos;
    }
}

