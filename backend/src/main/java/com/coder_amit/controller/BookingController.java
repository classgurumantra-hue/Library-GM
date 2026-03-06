package com.coder_amit.controller;

import com.coder_amit.model.Booking;
import com.coder_amit.service.BookingService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.coder_amit.repository.BookingRepository;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public Booking createBooking(@RequestParam Long shiftId,
            @RequestParam Long seatId,
            @RequestParam Long studentId) {

        return bookingService.createBooking(shiftId, seatId, studentId);
    }

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/zone/{zoneId}")
    public List<Booking> getBookingsByZone(@PathVariable Long zoneId) {
        return bookingRepository.findBySeat_Shift_Section_Centre_Zone_Id(zoneId);
    }

    @GetMapping("/student/{studentId}")
    public List<Booking> getBookingsByStudent(@PathVariable Long studentId) {
        return bookingService.getBookingsByStudent(studentId);
    }

    @GetMapping("/centre/{centreId}")
    public List<Booking> getBookingsByCentre(@PathVariable Long centreId) {
        return bookingRepository.findBySeat_Shift_Section_Centre_Id(centreId);
    }

    @GetMapping("/section/{sectionId}")
    public List<Booking> getBookingsBySection(@PathVariable Long sectionId) {
        return bookingRepository.findBySeat_Shift_Section_Id(sectionId);
    }

    @GetMapping("/shift/{shiftId}")
    public List<Booking> getBookingsByShift(@PathVariable Long shiftId) {
        return bookingRepository.findBySeat_Shift_Id(shiftId);
    }

    @Autowired
    private BookingRepository bookingRepository;

}