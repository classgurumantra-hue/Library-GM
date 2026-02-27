package com.coder_amit.controller;

import com.coder_amit.model.Booking;
import com.coder_amit.model.Payment;
import com.coder_amit.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/{seatNumber}")
    public Booking payForSeat(@PathVariable String seatNumber, @RequestBody Payment payment) throws Exception {
        return paymentService.processPayment(seatNumber, payment);
    }

    @GetMapping("/{seatNumber}")
    public Payment getPayment(@PathVariable String seatNumber) throws Exception {
        Booking booking = paymentService.processPayment(seatNumber, new Payment()); // dummy to fetch booking
        return booking.getPayment();
    }
}