package com.wkulesza.dto;

import com.wkulesza.entity.UserRole;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@NoArgsConstructor
public class UserDto {

    private Integer id;

    private String email;

    private String password;

    private String name;

    private String surname;

    List<UserRole> roles;

}