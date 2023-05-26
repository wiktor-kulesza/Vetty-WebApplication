package com.wkulesza.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class CommentDto {

    private Integer threadId;

    private Integer commentId;

    private String text;

    private String userEmail;

    private Integer numberOfLikes;

    private List<LikeDto> likes;

}
