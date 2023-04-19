package com.example.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ThreadDto {
    private Integer id;

    private String authorEmail;

    private String title;

    private String content;

    private Integer medicalHistoryId;

    private MedicalHistoryDto medicalHistory;

    private List<CommentDto> comments;

    private PetDetailsDto pet;

}
