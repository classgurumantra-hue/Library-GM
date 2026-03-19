package com.coder_amit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.coder_amit.model.User;
import com.coder_amit.model.Role;
import com.coder_amit.repository.UserRepository;
import com.coder_amit.service.OtpService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/coadmin")
public class CoAdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OtpService otpService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // ⭐ Register CoAdmin
    @PostMapping("/register")
    public ResponseEntity<?> registerCoadmin(@RequestBody User user) {

        if (!otpService.isOtpVerified(user.getEmail())) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "OTP not verified"));
        }

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email already exists"));
        }

        user.setRole(Role.CO_ADMIN);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);

        return ResponseEntity.ok(
                Map.of("message", "CoAdmin created successfully"));
    }

    // ⭐ List CoAdmins
    @GetMapping("/list")
    public ResponseEntity<?> getAllCoadmins() {

        List<User> coadmins = userRepository.findByRole(Role.CO_ADMIN);

        return ResponseEntity.ok(coadmins);
    }

    // ⭐ Block / Unblock
    @PutMapping("/block/{id}")
    public ResponseEntity<?> toggleCoadmin(@PathVariable Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setBlocked(!user.isBlocked());

        userRepository.save(user);

        String msg = user.isBlocked()
                ? "CoAdmin blocked successfully"
                : "CoAdmin unblocked successfully";

        return ResponseEntity.ok(Map.of("message", msg));
    }

    @PostMapping
    public ResponseEntity<?> createCoadmin(@RequestBody User user) {

        user.setRole(Role.CO_ADMIN);

        User saved = userRepository.save(user);

        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCoadmin(@PathVariable Long id, @RequestBody User user) {
        user.setId(id);
        user.setRole(Role.CO_ADMIN);
        return ResponseEntity.ok(userRepository.save(user));
    }
}