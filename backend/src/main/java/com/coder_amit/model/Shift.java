package com.coder_amit.model;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Setter
@Getter
@Entity
@Table(name ="shifts")
public class Shift {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private LocalTime startTime;
    private LocalTime endTime;

    private Double mrp;
    private Double discountValue;   // discount amount or percentage
    private String discountType;    // "FIXED" or "PERCENTAGE"
    private Double price;

    private LocalDate startDate;
    private LocalDate expiryDate;
    private Integer durationDays;
//    private Integer interval;
@Column(name = "interval_days")
private Integer interval;
    private Double coinLimitUsage;
    private String coinLimitType;   // "FIXED" or "PERCENTAGE"

    // Special discounts
    private Double discount90Days;
    private Double discount180Days;
    private Double discount270Days;
    private Double discount360Days;

    @ManyToOne
    @JoinColumn(name = "section_id", nullable = false)
    private Section section;   // Relation to Section

}
