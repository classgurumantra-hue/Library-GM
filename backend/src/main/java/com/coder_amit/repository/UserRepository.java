package com.coder_amit.repository;

import com.coder_amit.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import java.util.Optional;

public interface UserRepository  extends JpaRepository<User ,Long> {
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email); 

}
