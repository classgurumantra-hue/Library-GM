package com.coder_amit.repository;

import com.coder_amit.model.CoinHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoinHistoryRepository extends JpaRepository<CoinHistory, Long> {
}