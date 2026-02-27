package com.coder_amit.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "centre")
public class Centre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "centre_name")
    private String centreName;

    private Integer capacity;

    private Double admissionFee;

    private String description;

    @ManyToOne
    @JoinColumn(name = "zone_id")
    private Zone zone;
}