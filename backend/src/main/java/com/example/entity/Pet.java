package com.example.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
@SuperBuilder
@Entity
@Table(name = "pet")
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(discriminatorType = DiscriminatorType.STRING, name = "species")
public abstract class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", updatable = false, nullable = false)
    private Integer id;

    @Column(nullable = false)
    private String name;

    //TODO: add sex

    private Date birthDate;

    @ManyToOne
    @JoinColumn(name = "breed_id")
    private Breed breed;

    @ManyToOne
    @JoinColumn(name = "image_id")
    private Image image;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User owner;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "pet")
    private List<MedicalHistory> medicalHistories = new java.util.ArrayList<>();

}
