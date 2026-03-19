package com.coder_amit.controller;

import com.coder_amit.model.CoinHistory;
import com.coder_amit.repository.CoinHistoryRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coins")
@CrossOrigin
public class CoinHistoryController {

    private final CoinHistoryRepository coinHistoryRepository;

    public CoinHistoryController(CoinHistoryRepository coinHistoryRepository) {
        this.coinHistoryRepository = coinHistoryRepository;
    }

    @GetMapping("/{userId}")
    public List<CoinHistory> getUserHistory(@PathVariable Long userId) {
        return coinHistoryRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }
}