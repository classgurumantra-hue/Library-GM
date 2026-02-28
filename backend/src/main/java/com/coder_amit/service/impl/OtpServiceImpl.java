package com.coder_amit.service.impl;

import com.coder_amit.service.OtpService;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpServiceImpl implements OtpService {

    private final JavaMailSender mailSender;

    private final Map<String,String> otpStorage = new ConcurrentHashMap<>();
    private final Map<String,Boolean> otpVerified = new ConcurrentHashMap<>();

    public OtpServiceImpl(JavaMailSender mailSender){
        this.mailSender = mailSender;
    }

    @Override
    public String generateOtp(){
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    @Override
    @Async
    public void sendOtpEmail(String email,String otp){
        try{
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("Library OTP Verification");
            message.setText("Your OTP is : " + otp);

            mailSender.send(message);

            otpStorage.put(email,otp);

        }catch(Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public boolean isOtpVerified(String email){
        return otpVerified.getOrDefault(email,false);
    }

    @Override
    public void markOtpVerified(String email){
        otpVerified.put(email,true);
    }

    public String getStoredOtp(String email){
        return otpStorage.get(email);
    }

    
}
