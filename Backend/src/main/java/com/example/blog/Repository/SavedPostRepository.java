package com.example.blog.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.blog.Entity.SavedPost;
import java.util.List;

public interface SavedPostRepository extends JpaRepository<SavedPost, Long> {
    List<SavedPost> findByUserId(Long userId);
    
    SavedPost findByUserIdAndPostId(Long userId, Long postId);
}
