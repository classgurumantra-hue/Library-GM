package com.coder_amit.service;

import com.coder_amit.model.User;
import com.coder_amit.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       BCryptPasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // ✅ Signup Logic
    public User signup(User user){

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    // ✅ Login Logic
    public Optional<User> login(String username, String password){

        Optional<User> userOpt = userRepository.findByUsername(username);

        if(userOpt.isPresent()){
            User user = userOpt.get();

            if(passwordEncoder.matches(password, user.getPassword())){
                return Optional.of(user);
            }
        }

        return Optional.empty();
    }
}
