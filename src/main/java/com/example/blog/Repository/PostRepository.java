package com.example.blog.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.blog.Entity.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByCategory(String category);
    List<Post> findByUserId(Long userId);

     List<Post> findByDescriptionContainingIgnoreCase(String keyword);

    List<Post> findByHashtagsContainingIgnoreCase(String keyword);

    List<Post> findByAuthorContainingIgnoreCase(String keyword);

    List<Post> findByCategoryContainingIgnoreCase(String keyword);

    @Query("""
            SELECT p FROM Post p
            WHERE LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR (p.hashtags IS NOT NULL AND LOWER(p.hashtags) LIKE LOWER(CONCAT('%', :keyword,'%')))
            OR LOWER(p.author) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(p.category) LIKE LOWER(CONCAT('%', :keyword, '%'))
            """)

    List<Post> globalSearch(@Param("keyword")String keyword);

    @Query("""
        SELECT DISTINCT p.author 
        FROM Post p 
        WHERE LOWER(p.author) LIKE LOWER(CONCAT('%',:prefix, '%'))
    """)
    List<String> suggestAuthors(@Param("prefix") String prefix);

    @Query("""
        SELECT DISTINCT p.hashtags 
        FROM Post p 
        WHERE p.hashtags IS NOT NULL AND LOWER(p.hashtags) LIKE LOWER(CONCAT('%',:prefix, '%'))
    """)
    List<String> suggestHashtags(@Param("prefix") String prefix);

    @Query("""
        SELECT DISTINCT p.category 
        FROM Post p 
        WHERE p.category IS NOT NULL AND LOWER(p.category) LIKE LOWER(CONCAT('%',:prefix, '%'))
    """)
    List<String> suggestCategories(@Param("prefix") String prefix);
}