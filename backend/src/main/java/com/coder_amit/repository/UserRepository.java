package com.coder_amit.repository;

import com.coder_amit.model.User;
import com.coder_amit.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    Optional<User> findByMobile(String mobile);

    Optional<User> findByReferralCode(String referralCode);

    List<User> findByRole(Role role);

    boolean existsByEmail(String email);

}