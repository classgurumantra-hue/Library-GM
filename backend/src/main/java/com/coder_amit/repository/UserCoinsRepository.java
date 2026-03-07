package com.coder_amit.repository;

import com.coder_amit.model.UserCoins;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserCoinsRepository extends JpaRepository<UserCoins, Long> {

    Optional<UserCoins> findByUserId(Long userId);
}