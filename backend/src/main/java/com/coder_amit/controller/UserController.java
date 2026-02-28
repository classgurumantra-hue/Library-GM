package com.coder_amit.controller;
import org.springframework.http.ResponseEntity;
import com.coder_amit.model.User;
import com.coder_amit.service.UserService;
import com.coder_amit.service.OtpService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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

    if(user.getEmail() == null){
        return ResponseEntity.badRequest()
                .body(Map.of("message","Email is required"));
    }

    if(!otpService.isOtpVerified(user.getEmail())){
        return ResponseEntity.badRequest()
                .body(Map.of("message","Invalid OTP"));
    }

    if(userService.isEmailExist(user.getEmail())){
        return ResponseEntity.badRequest()
                .body(Map.of("message","Email already registered"));
    }

    userService.signup(user);

    return ResponseEntity.ok(
            Map.of("message","Signup successfully")
    );
}


    // ⭐ Login API (Ab ye error nahi dega)
@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody User user){

    Optional<User> result =
            userService.login(user.getUsername(), user.getPassword());

    if(result.isPresent()){
        return ResponseEntity.ok(
                Map.of(
                        "message","Login successful",
                        "user",result.get().getUsername()
                )
        );
    }
    else{
        return ResponseEntity.badRequest()
                .body(Map.of("message","Username or password not match"));
    }
}

}
