package com.wkulesza.dto.statistic;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FactorsData {

    private Date date;

    private Double averageValue;

    private Double averageBreedValue;
}
