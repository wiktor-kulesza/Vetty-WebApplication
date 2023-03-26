package com.example.dto;

import com.example.entity.medicalhistory.BloodFactor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ResultDto {
    Integer id;

    List<BloodFactor> factors;
}
