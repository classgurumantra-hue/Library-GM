package com.coder_amit.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "sections")
public class Section {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "start_seat_number")
    private Integer startSeatNumber;

    @Column(name = "end_seat_number")
    private Integer endSeatNumber;

    private Integer numberOfRows;
    private Integer numberOfColumns;
    private Boolean active;

    @Column(name = "start_date")
    private LocalDate startDate;

    @ManyToOne
    @JoinColumn(name = "centre_id", nullable = false)
    private Centre centre;
}