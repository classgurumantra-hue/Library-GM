package com.coder_amit.controller;

import com.coder_amit.model.Seat;
import com.coder_amit.repository.SeatRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seats")
@CrossOrigin
public class SeatController {

    private final SeatRepository seatRepository;

    public SeatController(SeatRepository seatRepository) {
        this.seatRepository = seatRepository;
    }

    @GetMapping("/{shiftId}")
    public List<Seat> getSeatsByShift(@PathVariable Long shiftId) {
        return seatRepository.findByShiftIdOrderBySeatNumberAsc(shiftId);
    }
}