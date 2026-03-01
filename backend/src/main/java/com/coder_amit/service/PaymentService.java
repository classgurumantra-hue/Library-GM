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

    public Payment processPayment(Long bookingId) throws Exception {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new Exception("Booking not found"));

        Payment payment = new Payment();
        payment.setStatus("SUCCESS");

        booking.setPayment(payment);

        bookingRepository.save(booking);

        return payment;
    }
}