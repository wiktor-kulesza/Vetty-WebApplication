package com.wkulesza.service;

import com.wkulesza.entity.User;
import com.wkulesza.exception.AuthException;
import com.wkulesza.repository.UserRepository;
import com.wkulesza.security.JwtTokenProvider;
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

    public boolean validateUser(String ownerEmail) {
        return userRepository.existsByEmail(ownerEmail);
    }

    public void delete(String email) {
        userRepository.deleteByEmail(email);
    }

    public Optional<User> getUserByEmail(String ownerEmail) {
        return userRepository.findByEmail(ownerEmail);
    }

    public boolean exists(String email) {
        return userRepository.existsByEmail(email);
    }

    public Object getUser(String email) {
        return userRepository.findByEmail(email);
    }
}
