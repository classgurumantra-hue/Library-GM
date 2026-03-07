package com.coder_amit.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentCalculation {

    private Double shiftPrice;

    private Double couponDiscount;

    private Double priceAfterCoupon;

    private Double coinUsed;

    private Double priceAfterCoin;

    private Double admissionFee;

    private Double finalPrice;
}