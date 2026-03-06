package com.coder_amit.service;

import com.coder_amit.model.Seat;
import com.coder_amit.repository.SeatRepository;
import org.springframework.stereotype.Service;

@Service
public class SeatService {

    private final SeatRepository seatRepository;

    public SeatService(SeatRepository seatRepository) {
        this.seatRepository = seatRepository;
    }

    public Seat bookSeat(Long seatId) {
        Seat seat = seatRepository.findById(seatId)
                .orElseThrow(() -> new RuntimeException("Seat not found"));

        if ("BOOKED".equalsIgnoreCase(seat.getStatus())) {
            throw new RuntimeException("Seat already booked");
        }

        seat.setStatus("BOOKED");

        return seatRepository.save(seat);
    }
}