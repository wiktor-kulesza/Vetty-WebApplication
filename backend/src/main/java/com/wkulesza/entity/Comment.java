package com.wkulesza.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
@Builder
@AllArgsConstructor
@Entity
@Table(name = "comment")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(nullable = false, length = 4000)
    private String text;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "comment")
    private List<Like> likes = new java.util.ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "thread_id")
    private Thread thread;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}