package com.example.blog.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.blog.Entity.Post;
import com.example.blog.Service.PostService;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping("/create")
    public ResponseEntity<?> createPost(@RequestBody Post post, Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()
                || authentication instanceof AnonymousAuthenticationToken) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login required");
        }

        return ResponseEntity.ok(postService.createPost(post, authentication.getName()));
    }

    @GetMapping("/all")
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/category/{category}")
    public List<Post> getPostsByCategory(@PathVariable String category) {
        return postService.getPostsByCategory(category);
    }

    @DeleteMapping("/delete/{id}")
    public void deletePost(@PathVariable Long id) {
        postService.deletePost(id);
    }
}