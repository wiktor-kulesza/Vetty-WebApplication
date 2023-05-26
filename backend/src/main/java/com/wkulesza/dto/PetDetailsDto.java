package com.wkulesza.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
public class PetDetailsDto {
    private Integer id;

    private String name;

    private String species;

    private String sex;

    private Date birthDate;

    private String breedName;

    private ImageDto image;
}
