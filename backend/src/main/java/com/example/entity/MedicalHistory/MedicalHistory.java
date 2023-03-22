package com.example.entity.MedicalHistory;

import com.example.entity.Thread;
import com.example.entity.pet.Pet;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;

@Setter
@Getter
@RequiredArgsConstructor
@Entity
@Table(name = "medical_history")
public class MedicalHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "pet_id")
    private Pet pet;

    private Date date;

    private String description;

    private String diagnosis;

    @OneToMany(mappedBy = "medicalHistory", fetch = FetchType.LAZY)
    private List<Results> bloodResults;

    @OneToMany(mappedBy = "medicalHistory", fetch = FetchType.LAZY)
    private List<Thread> threads;

    @ManyToMany
    private List<Tag> tags;


}