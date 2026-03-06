package com.coder_amit.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "zones")
public class Zone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "zone_name", unique = true, nullable = false)
    private String zoneName;

    private String stateName;

    private String description;

    private Boolean active = true;

    private Boolean deleted = false;

    @JsonIgnore
    @OneToMany(mappedBy = "zone")
    private List<Centre> centres;

}