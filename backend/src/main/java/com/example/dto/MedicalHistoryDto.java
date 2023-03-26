package com.example.dto;

import com.example.entity.medicalhistory.Result;
import com.example.entity.medicalhistory.Tag;
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

    private Integer petId;

    private List<Result> bloodResults;

    private List<Thread> threads;

    private List<Tag> tags;

}
