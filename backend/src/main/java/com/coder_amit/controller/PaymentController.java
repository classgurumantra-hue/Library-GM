package com.coder_amit.controller;

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

    @PostMapping("/{bookingId}")
    public Payment payForBooking(@PathVariable Long bookingId) throws Exception {
        return paymentService.processPayment(bookingId);
    }
}