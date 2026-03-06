package com.coder_amit.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.coder_amit.model.Centre;
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

    @Column(name = "active")
    private Boolean active = true;

    @Column(name = "start_date")
    private LocalDate startDate;

    @ManyToOne
    @JoinColumn(name = "centre_id", nullable = false)
    @JsonIgnoreProperties({ "sections" })
    private Centre centre;

    @OneToMany(mappedBy = "section", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private java.util.List<Shift> shifts;
}