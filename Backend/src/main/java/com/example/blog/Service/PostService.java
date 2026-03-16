package com.example.blog.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.blog.Entity.Post;
import com.example.blog.Entity.User;
import com.example.blog.Repository.PostRepository;
import com.example.blog.Repository.UserRepository;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    public Post createPost(Post post, String emailId) {
        if (post == null) {
            return null;
        }

        User user = userRepository.findByEmailId(emailId).orElse(null);
        if (user == null) {
            throw new IllegalStateException("Authenticated user not found");
        }

        post.setUser(user);
        post.setAuthor(user.getName());
        
        return postRepository.save(post);
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public List<Post> getPostsByCategory(String category) {
        return postRepository.findByCategory(category);
    }

    public List<Post> getPostsByUserId(Long userId) {
        return postRepository.findByUserId(userId);
    }

    public Post getPostById(Long id) {
        return postRepository.findById(id).orElse(null);
    }

    public Post updatePost(Long id, Post updatedPost, String emailId) {
        Post existingPost = postRepository.findById(id).orElse(null);
        if (existingPost == null) {
            throw new IllegalStateException("Post not found");
        }

        User user = userRepository.findByEmailId(emailId).orElse(null);
        if (user == null || existingPost.getUser().getId() != user.getId()) {
            throw new IllegalStateException("User not authorized to update this post");
        }

        existingPost.setDescription(updatedPost.getDescription());
        existingPost.setCategory(updatedPost.getCategory());
        existingPost.setHashtags(updatedPost.getHashtags());
        if (updatedPost.getImage() != null) {
            existingPost.setImage(updatedPost.getImage());
        }

        return postRepository.save(existingPost);
    }

    public void deletePost(Long id) {
        if (id != null) {
            postRepository.deleteById(id);
        }
    }
}
