package com.wkulesza.dto;

import com.wkulesza.entity.medicalhistory.BloodFactor;
import com.wkulesza.entity.medicalhistory.Result;
import com.wkulesza.entity.medicalhistory.Tag;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.List;

@Data
@NoArgsConstructor
public class MedicalHistoryDto {

    private Integer id;

    private Date date;

    private String description;

    private String diagnosis;

    private Boolean isPublic;

    private Integer petId;

    private List<BloodFactor> bloodResults;

    private List<Result> results;

    private List<Tag> tags;

}
