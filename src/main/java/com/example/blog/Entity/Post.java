package com.example.blog.Entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String category;

    @Column(columnDefinition = "LONGTEXT", nullable = false)
    private String description;

    private String image;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    private String username;

    @CreationTimestamp
    private LocalDateTime time;

    private String hashtags;
}