package com.coder_amit.controller;

import com.coder_amit.model.Seat;
import com.coder_amit.repository.SeatRepository;
import com.coder_amit.service.SeatService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seats")
@CrossOrigin
public class SeatController {

    private final SeatRepository seatRepository;
    private final SeatService seatService;

    public SeatController(SeatRepository seatRepository, SeatService seatService) {
        this.seatRepository = seatRepository;
        this.seatService = seatService;
    }

    @GetMapping("/{shiftId}")
    public List<Seat> getSeatsByShift(@PathVariable Long shiftId) {
        return seatRepository.findByShiftIdOrderBySeatNumberAsc(shiftId);
    }

    @PostMapping("/book/{seatId}")
    public Seat bookSeat(@PathVariable Long seatId) {
        return seatService.bookSeat(seatId);
    }
}