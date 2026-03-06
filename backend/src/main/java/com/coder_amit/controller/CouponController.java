package com.coder_amit.controller;

import com.coder_amit.model.Coupon;
import com.coder_amit.service.CouponService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coupons")
@CrossOrigin("*")
public class CouponController {

    private final CouponService couponService;

    public CouponController(CouponService couponService) {
        this.couponService = couponService;
    }

    // Create coupon
    @PostMapping
    public Coupon createCoupon(@RequestBody Coupon coupon) {
        return couponService.saveCoupon(coupon);
    }

    // Get all coupons
    @GetMapping
    public List<Coupon> getCoupons() {
        return couponService.getAllCoupons();
    }

    // Get coupon by code
    @GetMapping("/{code}")
    public Coupon getCoupon(@PathVariable String code) {
        return couponService.getCouponByCode(code).orElse(null);
    }

    @PostMapping("/validate")
    public Double validateCoupon(
            @RequestParam String code,
            @RequestParam Double price,
            @RequestParam Long centreId,
            @RequestParam String gender) {

        return couponService.validateAndCalculateDiscount(code, price, centreId, gender);
    }
}