package com.coder_amit.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "admission")
public class Admission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // student
    @ManyToOne
    @JoinColumn(name = "student_id")
    private User student;

    // vendor who initiated admission
    @ManyToOne
    @JoinColumn(name = "vendor_id")
    private User vendor;

    @ManyToOne
    @JoinColumn(name = "centre_id")
    private Centre centre;

    @ManyToOne
    @JoinColumn(name = "section_id")
    private Section section;

    @ManyToOne
    @JoinColumn(name = "shift_id")
    private Shift shift;

    @ManyToOne
    @JoinColumn(name = "seat_id")
    private Seat seat;

    private String studentName;

    private LocalDate admissionDate;

    // verification token sent to email
    private String verificationToken;

    // PENDING / ACCEPTED / REJECTED
    private String status;
}