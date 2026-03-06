package com.coder_amit.config;

import com.coder_amit.model.User;
import com.coder_amit.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DbUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public DbUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        // IMPORTANT: Spring expects ROLE_ prefix when using hasRole("ADMIN")
        String role = "ROLE_" + (user.getRole() != null ? user.getRole().name() : "STUDENT");

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getPassword()) // already BCrypt in DB
                .authorities(List.of(new SimpleGrantedAuthority(role)))
                .build();
    }
}