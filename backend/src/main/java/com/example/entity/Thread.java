package com.example.entity;

import com.example.entity.medicalhistory.MedicalHistory;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Builder
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "thread")
public class Thread {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;

    @ManyToOne
    @JoinColumn(name = "medical_history_id")
    private MedicalHistory medicalHistory;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "thread")
    private List<Comment> comments = new java.util.ArrayList<>();

    private String title;

    private String content;
}