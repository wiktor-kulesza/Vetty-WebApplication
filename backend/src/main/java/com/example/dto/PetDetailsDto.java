package com.example.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PetDetailsDto {
    private Integer id;

    private String name;

    private String species;

    private String sex;

    private String breedName;

    private ImageDto image;
}
