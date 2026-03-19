package com.coder_amit.service;

import com.coder_amit.model.Coupon;
import com.coder_amit.repository.CouponRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CouponService {

    private final CouponRepository couponRepository;

    public CouponService(CouponRepository couponRepository) {
        this.couponRepository = couponRepository;
    }

    // Save coupon
    public Coupon saveCoupon(Coupon coupon) {
        return couponRepository.save(coupon);
    }

    // Get all coupons
    public List<Coupon> getAllCoupons() {
        return couponRepository.findAll();
    }

    // Find coupon by code
    public Optional<Coupon> getCouponByCode(String code) {
        return couponRepository.findByCode(code);
    }

    public Double validateAndCalculateDiscount(String code, Double price, Long centreId, String gender,
            String userType) {

        Optional<Coupon> optionalCoupon = couponRepository.findByCode(code);

        if (optionalCoupon.isEmpty()) {
            throw new RuntimeException("Invalid coupon code");
        }

        Coupon coupon = optionalCoupon.get();

        java.time.LocalDate today = java.time.LocalDate.now();

        // expiry check
        if (coupon.getExpiryDate() != null && today.isAfter(coupon.getExpiryDate())) {
            throw new RuntimeException("Coupon expired");
        }

        // minimum price check
        if (coupon.getMinPrice() != null && price < coupon.getMinPrice()) {
            throw new RuntimeException("Price is below minimum required for this coupon");
        }

        // centre check
        if (coupon.getCentres() != null && !coupon.getCentres().isEmpty()
                && !coupon.getCentres().contains(centreId)) {
            throw new RuntimeException("Coupon not valid for this centre");
        }

        // gender check
        if (coupon.getGenders() != null && !coupon.getGenders().isEmpty()
                && !coupon.getGenders().contains(gender)) {
            throw new RuntimeException("Coupon not valid for this gender");

        }

        // user type check (STUDENT / VENDOR / ALL)
        if (coupon.getApplicableFor() != null && !coupon.getApplicableFor().equalsIgnoreCase("ALL")) {

            if (!coupon.getApplicableFor().equalsIgnoreCase(userType)) {
                throw new RuntimeException("Coupon not applicable for this user");
            }
        }

        Double discount;

        if ("PERCENTAGE".equalsIgnoreCase(coupon.getDiscountType())) {
            discount = price * coupon.getDiscountValue() / 100;
        } else {
            discount = coupon.getDiscountValue();
        }
        System.out.println("DISCOUNT = " + discount);
        return discount;
    }
}