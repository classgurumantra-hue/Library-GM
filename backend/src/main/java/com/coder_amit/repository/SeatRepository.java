package com.coder_amit.repository;

import com.coder_amit.model.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SeatRepository extends JpaRepository<Seat, Long> {

    List<Seat> findByShiftIdOrderBySeatNumberAsc(Long shiftId);
}