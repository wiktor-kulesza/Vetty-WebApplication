package com.wkulesza.entity.medicalhistory;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Builder
@Entity
@Table(name = "results")
@NoArgsConstructor
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @OneToMany(orphanRemoval = true, mappedBy = "result", cascade = CascadeType.ALL)
    private List<BloodFactor> factors;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference(value = "medical-history-result")
    @JoinColumn(name = "medical_history_id")
    private MedicalHistory medicalHistory;

}