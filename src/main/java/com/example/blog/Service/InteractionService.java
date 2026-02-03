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

        if(existing.isPresent()) {
            InteractionEntity i = existing.get();
            i.setLike(!i.isLike());
            repo.save(i);
            return;
        }

        InteractionEntity i = new InteractionEntity();
        i.setPostId(postId);
        i.setUserId(userId);
        i.setLike(true);
        i.setTime(LocalDateTime.now());

        repo.save(i);
    }

    public void addComment(Long postId, Long userId, String comment) {

        InteractionEntity i = new InteractionEntity();
        i.setPostId(postId);
        i.setUserId(userId);
        i.setComment(comment);
        i.setLike(false);
        i.setTime(LocalDateTime.now());

        repo.save(i);
    }
}
