package com.example.entity.MedicalHistory;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "blood_factors")
public class BloodFactor {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @Enumerated(EnumType.STRING)
    private BloodFactorType bloodFactorType;

    private Double value;

    @ManyToOne
    @JoinColumn(name = "results_id")
    private Results results;

}