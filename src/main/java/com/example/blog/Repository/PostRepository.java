package com.example.blog.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.blog.Entity.Post;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByCategory(String category);
    List<Post> findByUserId(Long userId);

    //Search Functionality
    List<Post> findByDescriptionContainingIgnoreCase(String keyword);

    List<Post> findByHashtagsContainingIgnoreCase(String keyword);

    List<Post> findByUsernameContainingIgnoreCase(String keyword);

    List<Post> findByCategoryContainingIgnoreCase(String keyword);

    @Query("""
            SELECT p FROM Post p
            WHERE LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(p.hashtags) LIKE LOWER(CONCAT('%', :keyword,'%'))
            OR LOWER(p.username) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(p.category) LIKE LOWER(CONCAT('%', :keyword, '%'))
            """)

    List<Post> globalSearch(@Param("keyword")String keyword);

    @Query("""
        SELECT DISTINCT p.username 
        FROM Post p 
        WHERE LOWER(p.username) LIKE LOWER(CONCAT('%',:prefix, '%'))
    """)
    List<String> suggestUsernames(@Param("prefix") String prefix);

    @Query("""
        SELECT DISTINCT p.hashtags 
        FROM Post p 
        WHERE LOWER(p.hashtags) LIKE LOWER(CONCAT('%',:prefix, '%'))
    """)
    List<String> suggestHashtags(@Param("prefix") String prefix);

    @Query("""
        SELECT DISTINCT p.category 
        FROM Post p 
        WHERE LOWER(p.category) LIKE LOWER(CONCAT('%',:prefix, '%'))
    """)
    List<String> suggestCategories(@Param("prefix") String prefix);
}