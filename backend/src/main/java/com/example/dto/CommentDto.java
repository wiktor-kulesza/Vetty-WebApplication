package com.example.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CommentDto {
    private Integer id;

    private String text;

    private Integer numberOfLikes;

}
