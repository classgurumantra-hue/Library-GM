package com.coder_amit.service;

import com.coder_amit.repository.BookingRepository;
import com.coder_amit.model.PaymentCalculation;
import com.coder_amit.model.Shift;
import com.coder_amit.repository.ShiftRepository;
import org.springframework.stereotype.Service;

@Service
public class PaymentCalculationService {

    private final ShiftRepository shiftRepository;
    private final CouponService couponService;
    private final CoinService coinService;
    private final BookingRepository bookingRepository;

    public PaymentCalculationService(
            ShiftRepository shiftRepository,
            CouponService couponService,
            CoinService coinService,
            BookingRepository bookingRepository) {

        this.shiftRepository = shiftRepository;
        this.couponService = couponService;
        this.coinService = coinService;
        this.bookingRepository = bookingRepository;
    }

    public PaymentCalculation calculate(
            Long shiftId,
            Long userId,
            String couponCode,
            Double coins,
            Long centreId,
            String gender) {

        Shift shift = shiftRepository.findById(shiftId)
                .orElseThrow(() -> new RuntimeException("Shift not found"));

        Double shiftPrice = shift.getPrice();

        PaymentCalculation result = new PaymentCalculation();
        result.setShiftPrice(shiftPrice);

        // -------------------
        // Coupon Calculation
        // -------------------
        Double couponDiscount = 0.0;

        if (couponCode != null && !couponCode.isEmpty()) {
            couponDiscount = couponService.validateAndCalculateDiscount(
                    couponCode,
                    shiftPrice,
                    centreId,
                    gender);
        }

        result.setCouponDiscount(couponDiscount);

        Double priceAfterCoupon = shiftPrice - couponDiscount;
        result.setPriceAfterCoupon(priceAfterCoupon);

        // -------------------
        // Coin Calculation
        // -------------------
        Double coinUsed = 0.0;

        if (coins != null && coins > 0) {

            Double maxAllowedCoins = 0.0;

            if ("PERCENTAGE".equalsIgnoreCase(shift.getCoinLimitType())) {
                maxAllowedCoins = priceAfterCoupon * shift.getCoinLimitUsage() / 100;
            } else {
                maxAllowedCoins = shift.getCoinLimitUsage();
            }

            coinUsed = coinService.validateCoinUsage(userId, coins, maxAllowedCoins);
        }

        result.setCoinUsed(coinUsed);

        Double priceAfterCoin = priceAfterCoupon - coinUsed;
        result.setPriceAfterCoin(priceAfterCoin);

        // -------------------
        // Admission Fee (temporary fixed)
        // -------------------
        Double admissionFee = shift.getSection().getCentre().getAdmissionFee();
        var bookings = bookingRepository.findLatestBooking(userId, centreId);

        if (!bookings.isEmpty()) {

            var lastBooking = bookings.get(0);

            long days = java.time.temporal.ChronoUnit.DAYS.between(
                    lastBooking.getBookingTime().toLocalDate(),
                    java.time.LocalDate.now());

            if (days <= 33) {
                admissionFee = 0.0;
            }
        }
        result.setAdmissionFee(admissionFee);

        Double finalPrice = priceAfterCoin + admissionFee;
        result.setFinalPrice(finalPrice);

        return result;
    }
}