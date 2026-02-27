package com.coder_amit.service;

public interface OtpService {

    String generateOtp();

    void sendOtpEmail(String email, String otp);

    boolean isOtpVerified(String email);

    void markOtpVerified(String email);
}
