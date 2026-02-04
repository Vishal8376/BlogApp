package com.example.blog.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class SignUp {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;

    @Column(nullable=false, length = 100)
    private String name;
    
    @Column(nullable=false, length = 100)
    private String password;
    
    @Column(nullable=false, length = 100)
    private String emailId;
} 
