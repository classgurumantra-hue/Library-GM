package com.coder_amit.service;

import com.coder_amit.model.Booking;
import com.coder_amit.model.Payment;
import com.coder_amit.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PaymentService {

    @Autowired
    private BookingRepository bookingRepository;

    // Process payment and attach to booking
    public Booking processPayment(String seatNumber, Payment payment) throws Exception {
        Optional<Booking> optionalBooking = bookingRepository.findBySeatNumber(seatNumber);

        if (optionalBooking.isEmpty()) {
            throw new Exception("Booking not found for seat: " + seatNumber);
        }

        Booking booking = optionalBooking.get();
        booking.setPayment(payment);

        return bookingRepository.save(booking);
    }
}