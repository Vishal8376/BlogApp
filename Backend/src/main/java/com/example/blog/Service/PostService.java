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
        post.setUsername(user.getName());
        post.setAuthor(user.getName());
        
        return postRepository.save(post);
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public List<Post> getPostsByCategory(String category) {
        return postRepository.findByCategory(category);
    }

    public void deletePost(Long id) {
        if (id != null) {
            postRepository.deleteById(id);
        }
    }
}
