package com.coder_amit.service;

import com.coder_amit.model.*;
import com.coder_amit.repository.*;
import org.springframework.stereotype.Service;
import java.util.List;

import java.time.LocalDateTime;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final SeatRepository seatRepository;
    private final ShiftRepository shiftRepository;

    public BookingService(BookingRepository bookingRepository,
            SeatRepository seatRepository,
            ShiftRepository shiftRepository) {
        this.bookingRepository = bookingRepository;
        this.seatRepository = seatRepository;
        this.shiftRepository = shiftRepository;
    }

    public Booking createBooking(Long shiftId, Long seatId, Long studentId) {

        Seat seat = seatRepository.findById(seatId)

                .orElseThrow(() -> new RuntimeException("Seat not found"));

        if ("BOOKED".equalsIgnoreCase(seat.getStatus())
                || "HOLD".equalsIgnoreCase(seat.getStatus())) {
            throw new RuntimeException("Seat not available");
        }
        seat.setStatus("HOLD");
        seat.setLockTime(java.time.LocalDateTime.now());
        seatRepository.save(seat);

        Shift shift = shiftRepository.findById(shiftId)
                .orElseThrow(() -> new RuntimeException("Shift not found"));

        Booking booking = new Booking();
        booking.setShift(shift);
        booking.setSeat(seat);
        booking.setStudentId(studentId);
        booking.setAmount(shift.getPrice());
        booking.setPaymentStatus("PENDING");
        booking.setBookingTime(LocalDateTime.now());

        return bookingRepository.save(booking);
    }

    public List<Booking> getBookingsByStudent(Long studentId) {

        return bookingRepository.findByStudentId(studentId);

    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}