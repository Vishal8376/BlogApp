package com.example.blog.Repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.blog.Entity.InteractionEntity;

public interface InteractionRepository 
        extends JpaRepository<InteractionEntity, Long> {

    Optional<InteractionEntity> findByPostIdAndUserId(
            Long postId, Long userId);
    
    List<InteractionEntity> findByPostId(Long postId);
    
    List<InteractionEntity> findByUserId(Long userId);
}
