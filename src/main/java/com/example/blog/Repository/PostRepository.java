package com.example.blog.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.blog.Entity.Post;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByCategory(String category);
}