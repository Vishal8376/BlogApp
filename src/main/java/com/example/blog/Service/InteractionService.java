package com.example.blog.Service;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.blog.Entity.InteractionEntity;
import com.example.blog.Repository.InteractionRepository;

@Service
public class InteractionService {

    @Autowired
    private InteractionRepository repo;

    public void toggleLike(Long postId, Long userId) {

        Optional<InteractionEntity> existing =
                repo.findByPostIdAndUserId(postId, userId);

        if (existing.isPresent()){
            InteractionEntity i = existing.get();
            i.set_like(!i.is_like());
            repo.save(i);

        } else {

            InteractionEntity i = new InteractionEntity();
            i.setPostid(postId);
            i.setUserid(userId);
            i.set_like(true);
            i.setTime(LocalDateTime.now());

            repo.save(i);
        }
    }

    public void addComment(Long postId, Long userId, String comment) {
        InteractionEntity i = new InteractionEntity();
        i.setPostid(postId);
        i.setUserid(userId);
        i.setComment(comment);
        i.set_like(false);
        i.setTime(LocalDateTime.now());

        repo.save(i);
    }
}
