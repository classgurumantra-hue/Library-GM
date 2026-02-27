package com.coder_amit.controller;
import org.springframework.http.ResponseEntity;
import com.coder_amit.model.User;
import com.coder_amit.service.UserService;
import com.coder_amit.service.OtpService;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Maine ise "*" kar diya hai taaki frontend se koi connection error na aaye
public class UserController {

    private final UserService userService;
    private final OtpService otpService;

    public UserController(UserService userService,
                           OtpService otpService){
        this.userService = userService;
        this.otpService = otpService;
    }

    // ⭐ Signup API
@PostMapping("/signup")
public ResponseEntity<?> signup(@RequestBody User user){

    if(user.getEmail() != null){

        if(!otpService.isOtpVerified(user.getEmail())){
            return ResponseEntity.badRequest()
                    .body("Signup successfully");
        }
    }

    User savedUser = userService.signup(user);

    return ResponseEntity.ok(savedUser);
}



    // ⭐ Login API (Ab ye error nahi dega)
    @PostMapping("/login")
    public Object login(@RequestBody User user){

        Optional<User> result = 
                userService.login(user.getUsername(), user.getPassword());

        // Yahan galti thi, ab solve ho gayi hai
        if (result.isPresent()) {
            return result.get(); // User object return karega
        } else {
            return "Invalid username or password"; // String return karega
        }
    }
}