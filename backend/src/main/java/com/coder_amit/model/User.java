package com.coder_amit.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String username;

    private String password;

    private String fullname;
    private String mobile;
    private String email;
    private String gender;
    private String referralCode;

    @Enumerated(EnumType.STRING)
    private Role role;
    private boolean blocked = false;
}
