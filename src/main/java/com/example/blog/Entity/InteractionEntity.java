package com.example.blog.Entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
public class InteractionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long postid;
    private Long userid;
    private String comment;
    private boolean is_like;
    private LocalDateTime time;
}
