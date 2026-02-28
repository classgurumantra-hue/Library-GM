package com.coder_amit.controller;

import com.coder_amit.dto.OtpRequest;
import com.coder_amit.service.OtpService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/otp")
@CrossOrigin(origins = "*")
public class OtpController {

    private final OtpService otpService;

    // email -> otp
    private Map<String, String> otpStorage = new HashMap<>();

    // email -> expiry time
    private Map<String, LocalDateTime> otpExpiry = new HashMap<>();

    // email -> otp verified status ⭐
    private Map<String, Boolean> otpVerified = new HashMap<>();

    public OtpController(OtpService otpService){
        this.otpService = otpService;
    }

    // ✅ Send OTP
    @PostMapping("/send")
    public String sendOtp(@RequestBody OtpRequest request){

        String email = request.getEmail();

        String otp = otpService.generateOtp();

        otpService.sendOtpEmail(email, otp);

        otpStorage.put(email, otp);
        otpExpiry.put(email, LocalDateTime.now().plusMinutes(5));

        otpVerified.put(email, false);

        return "OTP sent successfully";
    }

    // ✅ Verify OTP
    @PostMapping("/verify")
    public String verifyOtp(@RequestBody OtpRequest request,
                             @RequestParam String otp){

        String email = request.getEmail();

        String storedOtp = otpStorage.get(email);
        LocalDateTime expiryTime = otpExpiry.get(email);

        if(storedOtp == null || expiryTime == null){
            return "OTP not found";
        }

        if(LocalDateTime.now().isAfter(expiryTime)){
            return "OTP expired";
        }

        if(storedOtp.equals(otp)){
            otpStorage.remove(email);
            otpExpiry.remove(email);
            otpVerified.put(email, true);

            otpService.markOtpVerified(email);

            return "OTP verified successfully";
        }

        return "Invalid OTP";
    }

    // ⭐ Signup validation helper
    public boolean isOtpVerified(String email){
        return otpVerified.getOrDefault(email, false);
    }
}
