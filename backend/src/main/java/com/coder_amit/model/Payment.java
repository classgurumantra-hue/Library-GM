package com.coder_amit.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "payment")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double amount;
    private LocalDate paymentDate;

    @ManyToOne
    @JoinColumn(name = "centre_id")
    private Centre centre;
}