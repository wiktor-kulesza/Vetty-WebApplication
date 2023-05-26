package com.wkulesza.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LikeDto {

    private String userEmail;

    private Integer threadId;

    private Integer commentId;

}
