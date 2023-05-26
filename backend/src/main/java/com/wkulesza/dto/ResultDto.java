package com.wkulesza.dto;

import com.wkulesza.entity.medicalhistory.BloodFactor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ResultDto {
    private Integer id;

    private List<BloodFactor> factors;
}
