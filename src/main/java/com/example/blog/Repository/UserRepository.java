package com.example.blog.Repository;

import com.example.blog.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    
    // Find user by ID
    Optional<User> findById(Long id);
    
    // Find user by email
    Optional<User> findByEmail(String email);
    
    // Find user by name
    Optional<User> findByName(String name);
}