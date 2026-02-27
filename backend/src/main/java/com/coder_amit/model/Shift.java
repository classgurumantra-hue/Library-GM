package com.coder_amit.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@Entity
@Table(name = "shifts")
public class Shift {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private LocalTime startTime;
    private LocalTime endTime;

    private Double mrp;

    @Column(name = "discount_value")
    private Double discountValue;

    @Column(name = "discount_type")
    private String discountType;

    private Double price;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "expiry_date")
    private LocalDate expiryDate;

    private Integer durationDays;

    @Column(name = "interval_days")
    private Integer interval;

    private Double coinLimitUsage;
    private String coinLimitType;

    private Double discount90Days;
    private Double discount180Days;
    private Double discount270Days;
    private Double discount360Days;

    @ManyToOne
    @JoinColumn(name = "section_id", nullable = false)
    private Section section;
}