package com.example.blog.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.blog.Entity.SavedPost;
import com.example.blog.Entity.SignUp;
import com.example.blog.Entity.Post;
import com.example.blog.Repository.SavedPostRepository;
import com.example.blog.Repository.SignUpRepository;
import com.example.blog.Repository.PostRepository;

import java.util.List;
import java.util.Optional;

@Service
public class SavedPostService {

    @Autowired
    private SavedPostRepository savedPostRepository;
    
    @Autowired
    private SignUpRepository signUpRepository;
    
    @Autowired
    private PostRepository postRepository;

    public SavedPost savePost(Long userId, Long postId) {
        if (userId != null && postId != null) {
            Optional<SignUp> user = Optional.ofNullable(signUpRepository.findById(userId).orElse(null));
            Optional<Post> post = postRepository.findById(postId);
            
            if (user.isPresent() && post.isPresent()) {
                SavedPost savedPost = new SavedPost();
                savedPost.setUser(user.get());
                savedPost.setPost(post.get());
                return savedPostRepository.save(savedPost);
            }
        }
        return null;
    }

    public List<SavedPost> getAllSavedPostsByUser(Long userId) {
        if (userId != null) {
            return savedPostRepository.findByUserId(userId);
        }
        return null;
    }

    public void deleteSavedPost(Long savedPostId) {
        if (savedPostId != null) {
            savedPostRepository.deleteById(savedPostId);
        }
    }
}
