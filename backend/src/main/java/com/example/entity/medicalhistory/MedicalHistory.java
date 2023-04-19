package com.example.entity.medicalhistory;

import com.example.entity.Thread;
import com.example.entity.pet.Pet;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.sql.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    @JsonBackReference(value = "pet-medical-history")
    private Pet pet;

    private Date date;

    private String description;

    private String diagnosis;

    @OneToMany(mappedBy = "medicalHistory", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "medical-history-result")
    private List<Result> results;

    @JsonIgnore
    @OneToMany(mappedBy = "medicalHistory", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Thread> threads;

    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinTable(name = "medical_history_tags",
            joinColumns = @JoinColumn(name = "medical_history_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private Set<Tag> tags = new HashSet<>();


    public void removeAllTags() {
        tags.forEach(tag -> tag.getMedicalHistories().remove(this));
        tags.clear();
    }

    public void addTag(Tag tag) {
        tags.add(tag);
        tag.getMedicalHistories().add(this);
    }
}
