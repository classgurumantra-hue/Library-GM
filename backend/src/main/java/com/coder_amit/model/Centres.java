package com.coder_amit.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table( name = "centres")
public class Centres {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String centreName;
    private Integer capacity;
    private Double admissionFee;
    private String description;

    @ManyToOne
    @JoinColumn(name = "zone_id", nullable = false)
    private Zone zone;   // Relation to Zone
}

