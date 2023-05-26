package com.wkulesza.security;

import com.wkulesza.entity.User;
import com.wkulesza.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MyUserDetails implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        final User appUser = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User '" + email + "' not found"));
        return org.springframework.security.core.userdetails.User
                .withUsername(email)
                .password(appUser.getPassword())
                .authorities(appUser.getRoles())
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(false)
                .build();
    }

}