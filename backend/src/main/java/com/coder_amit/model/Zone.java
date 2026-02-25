package com.coder_amit.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="zones")
public class Zone {

    @Id
    @Column(name = "zone_name")
    private String zoneName;

    private String stateName;

    private String description;
}