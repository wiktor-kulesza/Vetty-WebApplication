package com.example.entity.medicalhistory;

import com.example.entity.Thread;
import com.example.entity.pet.Pet;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;

@Setter
@Getter
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "medical_history")
public class MedicalHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pet_id")
    @JsonBackReference
    private Pet pet;

    private Date date;

    private String description;

    private String diagnosis;

    @OneToMany(mappedBy = "medicalHistory", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Result> bloodResults;

    @OneToMany(mappedBy = "medicalHistory", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Thread> threads;

    @ManyToMany(cascade = CascadeType.ALL)
    private List<Tag> tags;


}