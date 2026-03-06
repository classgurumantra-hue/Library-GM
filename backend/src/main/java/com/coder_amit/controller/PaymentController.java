package com.coder_amit.controller;

import com.coder_amit.model.Payment;
import com.coder_amit.service.PaymentService;
import org.springframework.web.bind.annotation.*;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin
public class PaymentController {

    @Value("${razorpay.key_id}")
    private String razorpayKey;

    @Value("${razorpay.key_secret}")
    private String razorpaySecret;

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/create")
    public Payment createPayment(
            @RequestParam Long bookingId,
            @RequestParam String razorpayOrderId) {

        return paymentService.createPayment(bookingId, razorpayOrderId);
    }

    @PostMapping("/create-order")
    public String createOrder(@RequestParam int amount) {

        try {

            RazorpayClient razorpay = new RazorpayClient(razorpayKey, razorpaySecret);

            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", amount * 100);
            orderRequest.put("currency", "INR");
            orderRequest.put("payment_capture", 1);

            Order order = razorpay.orders.create(orderRequest);

            return order.toString();

        } catch (Exception e) {
            e.printStackTrace();
            return "{\"error\":\"Order creation failed\"}";
        }
    }
}