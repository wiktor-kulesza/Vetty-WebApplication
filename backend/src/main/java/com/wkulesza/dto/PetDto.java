package com.wkulesza.dto;

import com.wkulesza.entity.medicalhistory.MedicalHistory;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.List;

@Data
@NoArgsConstructor
public class PetDto {
    private Integer id;

    private String name;

    private String species;

    private String sex;

    private String breedName;

    private Integer imageId;

    private Date birthDate;

    private String ownerEmail;

    private List<MedicalHistory> medicalHistories;

    private ImageDto image;

}
