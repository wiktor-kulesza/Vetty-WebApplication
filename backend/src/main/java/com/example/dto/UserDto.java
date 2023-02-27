package com.example.dto;

import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class UserDto {

    private Integer id;

    private String login;

    private String email;

}