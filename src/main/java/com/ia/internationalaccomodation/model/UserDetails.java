package com.ia.internationalaccomodation.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "userdetails")
public class UserDetails {

    @Id
    private Long id;
    private String emailAddress;
}
