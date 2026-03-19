package com.coder_amit.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;

    @ManyToOne
    @JoinColumn(name = "studentId", insertable = false, updatable = false)
    private User student;

    private Long vendorId;

    @ManyToOne
    @JoinColumn(name = "seat_id", nullable = false)
    private Seat seat;

    @ManyToOne
    @JoinColumn(name = "shift_id", nullable = false)
    private Shift shift;

    private Double amount;
    private Double commission;
    private Double vendorPayable;
    private Double coinsUsed;

    private String paymentStatus;

    private LocalDateTime bookingTime;

    @OneToOne
    @JoinColumn(name = "payment_id")
    private Payment payment;
}