package com.example.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ImageDto {

    private Integer id;

    private String name;

    private byte[] image;

    private String imageBase64;
}
