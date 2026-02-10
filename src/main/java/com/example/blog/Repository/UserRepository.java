package com.example.blog.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.blog.Entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    // Find user by email
    Optional<User> findByEmailId(String emailId);
    
    // Find user by name
    Optional<User> findByName(String name);
}