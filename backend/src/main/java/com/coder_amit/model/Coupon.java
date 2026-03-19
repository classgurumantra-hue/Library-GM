package com.coder_amit.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "coupons")
public class Coupon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String code;

    private Double minPrice;

    private LocalDate startDate;

    private LocalDate expiryDate;

    @Column(name = "discount_type")
    private String discountType;

    @Column(name = "discount_value")
    private Double discountValue;

    @ElementCollection
    private List<String> genders;

    @ElementCollection
    private List<Long> centres;

    private String applicableFor; // STUDENT / VENDOR / ALL

}