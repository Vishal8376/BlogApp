package com.example.blog.Service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.blog.Entity.InteractionEntity;
import com.example.blog.Entity.Post;
import com.example.blog.Entity.User;
import com.example.blog.Repository.InteractionRepository;
import com.example.blog.Repository.PostRepository;
import com.example.blog.Repository.UserRepository;

@Service
public class InteractionService {

    @Autowired
    private InteractionRepository repo;
    
    @Autowired
    private PostRepository postRepository;
    
    @Autowired
    private UserRepository userRepository;

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
            Optional<User> user = userRepository.findById(userId);
            
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
            Optional<User> user = userRepository.findById(userId);
            
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
