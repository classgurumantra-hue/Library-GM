package com.coder_amit.service;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class PasswordResetService {

    private final JavaMailSender mailSender;

    private final Map<String,String> resetTokenStorage = new ConcurrentHashMap<>();

    public PasswordResetService(JavaMailSender mailSender){
        this.mailSender = mailSender;
    }

    public String generateResetToken(String email){

        String token = UUID.randomUUID().toString();

        resetTokenStorage.put(email, token);

        sendResetEmail(email, token);

        return token;
    }

    private void sendResetEmail(String email,String token){

        String resetLink =
                "http://127.0.0.1:5500/student-panel/reset-password.html?email="
                        + email + "&token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Password Reset Link");
        message.setText("Click link to reset password:\n" + resetLink);

        mailSender.send(message);
    }

    public boolean validateToken(String email,String token){
        return token.equals(resetTokenStorage.get(email));
    }

    public void removeToken(String email){
        resetTokenStorage.remove(email);
    }
}