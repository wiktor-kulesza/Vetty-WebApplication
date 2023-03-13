package com.example.service;

import com.example.entity.User;
import com.example.exception.AuthException;
import com.example.repository.UserRepository;
import com.example.security.JwtTokenProvider;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    public String login(String email, String password) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
            return jwtTokenProvider.createToken(email, userRepository.findByEmail(email).get().getRoles());
        } catch (AuthenticationException e) {
            throw new AuthException("Invalid username/password supplied", HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    public String register(User user) {
        if (!userRepository.existsByEmail(user.getEmail())) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(user);
            return jwtTokenProvider.createToken(user.getEmail(), user.getRoles());
        } else {
            throw new AuthException("Email already in use", HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    public Optional<User> getUserById(Integer id) {
        return userRepository.findById(id);
    }

    public boolean validateUser(Integer ownerId) {
        return userRepository.existsById(ownerId);
    }

    public void delete(String email) {
        userRepository.deleteByEmail(email);
    }
}
