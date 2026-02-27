package com.coder_amit.repository;

import com.coder_amit.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    Optional<Booking> findBySeatNumber(String seatNumber);
}