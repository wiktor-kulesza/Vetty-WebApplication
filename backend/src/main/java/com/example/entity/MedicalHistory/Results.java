package com.example.entity.MedicalHistory;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
@Entity
@Table(name = "results")
public class Results {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    //TODO: ADD proper stucture for results
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "results")
    private List<BloodFactor> factors;

    @ManyToOne
    @JoinColumn(name = "medical_history_id")
    private MedicalHistory medicalHistory;

}