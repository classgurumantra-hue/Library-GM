package com.coder_amit.service;

import com.coder_amit.model.UserCoins;
import com.coder_amit.repository.UserCoinsRepository;
import org.springframework.stereotype.Service;

@Service
public class CoinService {

    private final UserCoinsRepository userCoinsRepository;

    public CoinService(UserCoinsRepository userCoinsRepository) {
        this.userCoinsRepository = userCoinsRepository;
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
}