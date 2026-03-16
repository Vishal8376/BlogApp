package com.example.blog.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.blog.Entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    // Find user by email
    Optional<User> findByEmailId(String emailId);
    
    // Find user by name
    Optional<User> findByName(String name);

    @org.springframework.data.jpa.repository.Query("SELECT u FROM User u WHERE LOWER(u.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(u.emailId) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    java.util.List<User> searchUsers(@org.springframework.data.repository.query.Param("keyword") String keyword);
}