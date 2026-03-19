package com.coder_amit.service;

import com.coder_amit.model.User;
import com.coder_amit.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.coder_amit.model.Role;
import com.coder_amit.exception.EmailAlreadyExistsException;
import com.coder_amit.model.CoinHistory;
import com.coder_amit.repository.CoinHistoryRepository;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final CoinHistoryRepository coinHistoryRepository;

    public UserService(UserRepository userRepository,
            BCryptPasswordEncoder passwordEncoder,
            CoinHistoryRepository coinHistoryRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.coinHistoryRepository = coinHistoryRepository;
    }

    private String generateReferralCode() {
        return UUID.randomUUID()
                .toString()
                .replace("-", "")
                .substring(0, 6)
                .toUpperCase();
    }

    // ✅ Signup Logic
    public User signup(User user) {

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException("Email already registered!");
        }

        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username already taken!");
        }

        // password encrypt
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // role set
        user.setRole(Role.STUDENT);

        // signup bonus
        user.setWalletCoins(200);

        // referral code generate
        user.setReferralCode(generateReferralCode());

        // check if referral code used
        // check if referral code used
        if (user.getReferredBy() != null && !user.getReferredBy().isEmpty()) {

            Optional<User> referrer = userRepository.findByReferralCode(user.getReferredBy());

            if (referrer.isEmpty()) {
                throw new RuntimeException("Invalid referral code");
            }

            User refUser = referrer.get();

            // referrer ko reward coins
            refUser.setWalletCoins(refUser.getWalletCoins() + 50);

            userRepository.save(refUser);

            CoinHistory referralHistory = new CoinHistory();
            referralHistory.setUserId(refUser.getId());
            referralHistory.setCoins(50);
            referralHistory.setType("REFERRAL_REWARD");

            coinHistoryRepository.save(referralHistory);

            // 🔥 wallet update bhi karo
            refUser.setWalletCoins(refUser.getWalletCoins() + 50);
            userRepository.save(refUser);
        }
        User savedUser = userRepository.save(user);
        // signup bonus history
        CoinHistory history = new CoinHistory();
        history.setUserId(savedUser.getId());
        history.setCoins(200);
        history.setType("SIGNUP_BONUS");

        coinHistoryRepository.save(history);

        return savedUser;
    }

    // ✅ Login Logic
    // ✅ SIMPLE LOGIN (NO BCRYPT)
    public Optional<User> login(String email, String password) {

        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isPresent()) {

            User user = userOpt.get();

            if (user.getPassword().equals(password)) {
                return Optional.of(user);
            }
        }

        return Optional.empty();
    }

    public boolean isEmailExist(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public java.util.List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public java.util.List<User> getUsersByRole(Role role) {
        return userRepository.findByRole(role);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public User save(User user) {
        user.setCreatedAt(java.time.LocalDateTime.now());
        return userRepository.save(user);
    }

}
