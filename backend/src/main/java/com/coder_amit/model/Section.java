package com.coder_amit.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
@Setter
@Getter
@Entity
@Table(name = "sections")
public class Section {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Integer startSeatNumber;
    private Integer endSeatNumber;
    private Integer numberOfRows;
    private Integer numberOfColumns;
    private Boolean active;
    private LocalDate startDate;

    @ManyToOne
    @JoinColumn(name = "centre_id", nullable = false)
    private Centre centre;   // Relation to Centre

}
