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
@RequestMapping("/api/subadmin")
public class SubAdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OtpService otpService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // ⭐ Register Subadmin
    @PostMapping("/register")
    public ResponseEntity<?> registerSubadmin(@RequestBody User user) {

        if (!otpService.isOtpVerified(user.getEmail())) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "OTP not verified"));
        }

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Email already exists"));
        }

        user.setRole(Role.SUB_ADMIN);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);

        return ResponseEntity.ok(
                Map.of("message", "Subadmin created successfully"));
    }

    // ⭐ List Subadmins
    @GetMapping("/list")
    public ResponseEntity<?> getAllSubadmins() {

        List<User> subadmins = userRepository.findByRole(Role.SUB_ADMIN);

        return ResponseEntity.ok(subadmins);
    }

    // ⭐ Block / Unblock Subadmin (Toggle)
    @PutMapping("/block/{id}")
    public ResponseEntity<?> toggleSubadmin(@PathVariable Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setBlocked(!user.isBlocked());

        userRepository.save(user);

        String msg = user.isBlocked()
                ? "Subadmin blocked successfully"
                : "Subadmin unblocked successfully";

        return ResponseEntity.ok(Map.of("message", msg));
    }

    // ⭐ Update Subadmin
    @PutMapping("/{id}")
    public ResponseEntity<?> updateSubadmin(@PathVariable Long id,
            @RequestBody User user) {

        User existing = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (existing.isBlocked()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Blocked subadmin cannot be edited"));
        }

        existing.setFullname(user.getFullname());
        existing.setMobile(user.getMobile());
        existing.setEmail(user.getEmail());

        userRepository.save(existing);

        return ResponseEntity.ok(Map.of(
                "message", "Subadmin updated successfully"));
    }
}