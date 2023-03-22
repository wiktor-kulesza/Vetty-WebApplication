package com.example.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

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

    private ImageDto image;

}
