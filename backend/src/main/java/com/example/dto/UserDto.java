package com.example.dto;

import com.example.entity.UserRole;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@NoArgsConstructor
public class UserDto {

    private Integer id;

    private String email;

    private String password;

    List<UserRole> roles;

}