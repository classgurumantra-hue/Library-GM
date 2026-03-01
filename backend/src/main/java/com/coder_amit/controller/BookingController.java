package com.coder_amit.controller;

import com.coder_amit.model.Booking;
import com.coder_amit.repository.BookingRepository;
import com.coder_amit.repository.ShiftRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin
public class BookingController {

    private final BookingRepository bookingRepository;
    private final ShiftRepository shiftRepository;

    public BookingController(BookingRepository bookingRepository,
                             ShiftRepository shiftRepository) {
        this.bookingRepository = bookingRepository;
        this.shiftRepository = shiftRepository;
    }

    @PostMapping("/{shiftId}")
    public Booking bookSeat(@RequestBody Booking booking,
                            @PathVariable Long shiftId) {

        return shiftRepository.findById(shiftId).map(shift -> {
            booking.setShift(shift);
            return bookingRepository.save(booking);
        }).orElseThrow(() -> new RuntimeException("Shift not found"));
    }
}