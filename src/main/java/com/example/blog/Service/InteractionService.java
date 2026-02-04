package com.example.blog.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.blog.Entity.InteractionEntity;
import com.example.blog.Entity.Post;
import com.example.blog.Entity.SignUp;
import com.example.blog.Repository.InteractionRepository;
import com.example.blog.Repository.PostRepository;
import com.example.blog.Repository.SignUpRepository;

@Service
public class InteractionService {

    @Autowired
    private InteractionRepository repo;
    
    @Autowired
    private PostRepository postRepository;
    
    @Autowired
    private SignUpRepository signUpRepository;

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
        if (postId != null && userId != null) {
            Optional<Post> post = postRepository.findById(postId);
            Optional<SignUp> user = signUpRepository.findById(userId);
            
            if (post.isPresent() && user.isPresent()) {
                i.setPost(post.get());
                i.setUser(user.get());
                i.setLike(true);
                i.setTime(LocalDateTime.now());
                repo.save(i);
            }
        }
    }

    public void addComment(Long postId, Long userId, String comment) {

        InteractionEntity i = new InteractionEntity();
        if (postId != null && userId != null) {
            Optional<Post> post = postRepository.findById(postId);
            Optional<SignUp> user = signUpRepository.findById(userId);
            
            if (post.isPresent() && user.isPresent()) {
                i.setPost(post.get());
                i.setUser(user.get());
                i.setComment(comment);
                i.setLike(false);
                i.setTime(LocalDateTime.now());
                repo.save(i);
            }
        }
    }
}
