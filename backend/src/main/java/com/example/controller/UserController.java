package com.example.controller;

import com.example.dto.UserDto;
import com.example.entity.User;
import com.example.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(maxAge = 3600)
public class UserController {

    private final UserService userService;
    private final ModelMapper modelMapper;

    @PostMapping("/login")
    @CrossOrigin
    public String login(@RequestParam String email, @RequestParam String password) {
        return userService.login(email, password);
    }

    @PostMapping("/register")
    @CrossOrigin
    public String register(@RequestBody UserDto user) {
        return userService.register(modelMapper.map(user, User.class));
    }

    @PostMapping("/delete")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String delete(@RequestParam String email) {
        userService.delete(email);
        return email;
    }
}
