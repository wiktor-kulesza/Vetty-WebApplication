package com.example.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
@Entity
@Table(name = "comment")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    private String text;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "comment")
    private List<Like> likes = new java.util.ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "thread_id")
    private Thread thread;

}