package com.example.entity;

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

    @OneToMany(mappedBy = "medicalHistory", fetch = FetchType.LAZY)
    private List<Results> results;

    @OneToMany(mappedBy = "medicalHistory", fetch = FetchType.LAZY)
    private List<Thread> threads;

    @ManyToMany
    private List<Tag> tags;


}