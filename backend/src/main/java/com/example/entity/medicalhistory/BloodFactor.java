package com.example.entity.medicalhistory;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "blood_factors")
public class BloodFactor {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Enumerated(EnumType.STRING)
    private BloodFactorType bloodFactorType;

    private Double value;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "result_id")
    private Result result;

    public boolean isHigh() {
        if (bloodFactorType.getMaxValue() == null) {
            return false;
        }
        return value > bloodFactorType.getMaxValue();
    }

    public boolean isLow() {
        if (bloodFactorType.getMinValue() == null) {
            return false;
        }
        return value < bloodFactorType.getMinValue();
    }
}