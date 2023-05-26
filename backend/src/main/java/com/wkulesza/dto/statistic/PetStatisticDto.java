package com.wkulesza.dto.statistic;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PetStatisticDto {

    private String factor;

    private List<FactorsData> factorsData;
}
