package com.example.blog.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Entity
@Data
@Getter
@Setter
@Table(name = "users")
public class SignUp {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;

    @Column(nullable=false, length = 100)
    private String name;
    
    @Column(nullable=false, length = 255)
    private String password;
    
    @Column(nullable=false, length = 100, unique = true)
    private String emailId;
    
    @Column(length = 500)
    private String bio;
    
    @Column(length = 255)
    private String profilePicUrl;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Post> posts;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<InteractionEntity> interactions;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SavedPost> savedPosts;
} 
