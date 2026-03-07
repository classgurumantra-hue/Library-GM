package com.coder_amit.controller;

import com.coder_amit.model.Payment;
import com.coder_amit.service.PaymentService;
import org.springframework.web.bind.annotation.*;
import com.coder_amit.model.PaymentCalculation;
import com.coder_amit.service.PaymentCalculationService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import com.razorpay.Utils;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin
public class PaymentController {

    @Value("${razorpay.key_id}")
    private String razorpayKey;

    @Value("${razorpay.key_secret}")
    private String razorpaySecret;

    private final PaymentService paymentService;
    private final PaymentCalculationService paymentCalculationService;

    public PaymentController(
            PaymentService paymentService,
            PaymentCalculationService paymentCalculationService) {

        this.paymentService = paymentService;
        this.paymentCalculationService = paymentCalculationService;
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

    @PostMapping("/calculate")
    public PaymentCalculation calculatePayment(
            @RequestParam Long shiftId,
            @RequestParam Long userId,
            @RequestParam(required = false) String couponCode,
            @RequestParam(required = false) Double coins,
            @RequestParam Long centreId,
            @RequestParam String gender) {

        return paymentCalculationService.calculate(
                shiftId,
                userId,
                couponCode,
                coins,
                centreId,
                gender);
    }

    @PostMapping("/verify")
    public String verifyPayment(
            @RequestParam String razorpayOrderId,
            @RequestParam String razorpayPaymentId,
            @RequestParam String razorpaySignature,
            @RequestParam Long bookingId) {

        try {

            String payload = razorpayOrderId + "|" + razorpayPaymentId;

            boolean isValid = Utils.verifySignature(
                    payload,
                    razorpaySignature,
                    razorpaySecret);

            if (!isValid) {
                return "Payment verification failed";
            }

            paymentService.createPayment(bookingId, razorpayOrderId);

            return "Payment verified and booking confirmed";

        } catch (Exception e) {
            e.printStackTrace();
            return "Payment verification error";
        }
    }
}