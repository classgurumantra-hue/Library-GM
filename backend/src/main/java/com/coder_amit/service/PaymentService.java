package com.coder_amit.service;

import com.coder_amit.model.Booking;
import com.coder_amit.model.Payment;
import com.coder_amit.repository.BookingRepository;
import com.coder_amit.repository.PaymentRepository;
import org.springframework.stereotype.Service;
import com.coder_amit.repository.SeatRepository;
import com.coder_amit.model.Seat;

import java.time.LocalDate;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;
    private final SeatRepository seatRepository;

    public PaymentService(PaymentRepository paymentRepository,
            BookingRepository bookingRepository,
            SeatRepository seatRepository) {

        this.paymentRepository = paymentRepository;
        this.bookingRepository = bookingRepository;
        this.seatRepository = seatRepository;
    }

    public Payment createPayment(Long bookingId, String razorpayOrderId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        Payment payment = new Payment();
        payment.setAmount(booking.getAmount());
        payment.setStatus("CREATED");
        payment.setPaymentDate(LocalDate.now());
        payment.setRazorpayOrderId(razorpayOrderId);

        payment.setBooking(booking);
        Payment savedPayment = paymentRepository.save(payment);

        booking.setPayment(savedPayment);
        booking.setPaymentStatus("SUCCESS");

        Seat seat = booking.getSeat();
        seat.setStatus("BOOKED");
        seatRepository.save(seat);

        bookingRepository.save(booking);

        return savedPayment;
    }
}