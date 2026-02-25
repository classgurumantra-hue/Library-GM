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

    @ManyToOne
    @JoinColumn(name = "centre_id")
    private Centre centre;

    private String studentName;
    private LocalDate admissionDate;
}