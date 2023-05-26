package com.wkulesza.entity.pet;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.wkulesza.entity.Breed;
import com.wkulesza.entity.Image;
import com.wkulesza.entity.Sex;
import com.wkulesza.entity.User;
import com.wkulesza.entity.medicalhistory.MedicalHistory;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.sql.Date;
import java.util.Iterator;
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

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private Sex sex;

    private Date birthDate;

    @ManyToOne
    @JoinColumn(name = "breed_id")
    private Breed breed;

    @OneToOne(orphanRemoval = true)
    @JoinColumn(name = "image_id")
    private Image image;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonBackReference(value = "user-pet")
    private User owner;

    @JsonManagedReference(value = "pet-medical-history")
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "pet", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MedicalHistory> medicalHistories = new java.util.ArrayList<>();

    public void removeMedicalHistories() {
        for (Iterator<MedicalHistory> iterator = medicalHistories.iterator(); iterator.hasNext(); ) {
            MedicalHistory medicalHistory = iterator.next();
            medicalHistory.removeAllTags();
            medicalHistory.setPet(null);
            iterator.remove();
        }
    }
}
