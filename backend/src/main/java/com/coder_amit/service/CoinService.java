package com.coder_amit.service;

import com.coder_amit.model.User;
import com.coder_amit.model.UserCoins;
import com.coder_amit.repository.UserCoinsRepository;
import org.springframework.stereotype.Service;
import com.coder_amit.repository.UserRepository;
import com.coder_amit.repository.CoinHistoryRepository;
import com.coder_amit.model.CoinHistory;

@Service
public class CoinService {

    private final UserCoinsRepository userCoinsRepository;
    private final UserRepository userRepository;
    private final CoinHistoryRepository coinHistoryRepository;

    public CoinService(UserCoinsRepository userCoinsRepository,
            UserRepository userRepository,
            CoinHistoryRepository coinHistoryRepository) {

        this.userCoinsRepository = userCoinsRepository;
        this.userRepository = userRepository;
        this.coinHistoryRepository = coinHistoryRepository;
    }

    // Get coins of user
    public Double getUserCoins(Long userId) {
        return userCoinsRepository.findByUserId(userId)
                .map(UserCoins::getCoins)
                .orElse(0.0);
    }

    // Validate coin usage
    public Double validateCoinUsage(Long userId, Double coinsToUse, Double maxAllowedCoins) {

        Double availableCoins = getUserCoins(userId);

        if (coinsToUse > availableCoins) {
            throw new RuntimeException("Not enough coins in wallet");
        }

        if (coinsToUse > maxAllowedCoins) {
            throw new RuntimeException("Coin usage exceeds shift limit");
        }

        return coinsToUse;
    }

    // Deduct coins after successful payment
    public void deductCoins(Long userId, Double coinsUsed) {

        UserCoins wallet = userCoinsRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Coin wallet not found"));

        wallet.setCoins(wallet.getCoins() - coinsUsed);

        userCoinsRepository.save(wallet);
    }

    // Referral reward after successful payment
    public void processReferralReward(Long studentId, Double amount) {

        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        if (student.getReferredBy() == null || student.getReferredBy().isEmpty()) {
            return;
        }

        User referrer = userRepository
                .findByReferralCode(student.getReferredBy())
                .orElse(null);

        if (referrer == null) {
            return;
        }

        int reward = (int) (amount * 0.30);

        referrer.setWalletCoins(referrer.getWalletCoins() + reward);
        userRepository.save(referrer);

        CoinHistory history = new CoinHistory();
        history.setUserId(referrer.getId());
        history.setCoins((int) reward);
        history.setType("REFERRAL_REWARD");

        coinHistoryRepository.save(history);
    }
}