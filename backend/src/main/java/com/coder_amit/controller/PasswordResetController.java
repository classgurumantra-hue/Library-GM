package com.coder_amit.controller;

import com.coder_amit.service.PasswordResetService;
import com.coder_amit.service.UserService;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth/forgot-password")
@CrossOrigin(origins="*")
public class PasswordResetController {

    private final PasswordResetService resetService;
    private final UserService userService;

    public PasswordResetController(
            PasswordResetService resetService,
            UserService userService){

        this.resetService = resetService;
        this.userService = userService;
    }

    // ⭐ Send Reset Link API
    @PostMapping("/send-reset-link")
    public Map<String,String> sendResetLink(@RequestBody Map<String,String> request){

        String email = request.get("email");

        if(!userService.isEmailExist(email)){
            return Map.of("message","Email not registered");
        }

        String token = resetService.generateResetToken(email);

        // TODO → Email sender logic add kare backend developer
        String resetLink =
                "http://localhost:8087/reset-password.html?email="+email+"&token="+token;

        System.out.println("Reset Link : " + resetLink);

        return Map.of(
                "message","Reset link generated"
        );
    }

}