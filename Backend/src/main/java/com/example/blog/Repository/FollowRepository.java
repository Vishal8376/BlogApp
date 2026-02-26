package com.example.blog.Repository;

import com.example.blog.Entity.Followers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowRepository extends JpaRepository<Followers, Long> {

    // Check if a follow relationship exists
    boolean existsByFollowerIdAndFollowedId(Long followerId, Long followedId);
    
    // Get all users that a user is following
    List<Followers> findByFollowerId(Long followerId);
    
    // Get all followers of a user
    List<Followers> findByFollowedId(Long followedId);
    
    // Count how many users a user is following
    long countByFollowerId(Long followerId);
    
    // Count how many followers a user has
    long countByFollowedId(Long followedId);
    
    // Delete a follow relationship
    void deleteByFollowerIdAndFollowedId(Long followerId, Long followedId);
}