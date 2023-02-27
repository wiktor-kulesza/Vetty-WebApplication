package com.example.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;

@Data
@NoArgsConstructor
public class PetDto {
    private Integer id;

    private String name;

    private String species;

    private String breedName;

    private MultipartFile image;

    private Date birthDate;

    private Integer ownerId;

}
