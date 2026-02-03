package com.example.blog.Entity;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="interactions")
public class InteractionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="post_id")
    private Long postId;

    @Column(name="user_id")
    private Long userId;

    private String comment;

    @Column(name="is_like")
    private boolean isLike;

    private LocalDateTime time;
}
