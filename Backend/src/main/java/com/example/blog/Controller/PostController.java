package com.example.blog.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.blog.Entity.Post;
import com.example.blog.Service.PostService;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping("/create")
    public ResponseEntity<?> createPost(@RequestBody Post post, Authentication authentication,
            HttpServletRequest request) {
        String userEmail = null;

        // Try session-based authentication first
        if (authentication != null && authentication.isAuthenticated()
                && !(authentication instanceof AnonymousAuthenticationToken)) {
            userEmail = authentication.getName();
        }

        // Fallback: read user email from header (for cross-port localhost dev)
        if (userEmail == null) {
            userEmail = request.getHeader("X-User-Email");
        }

        if (userEmail == null || userEmail.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login required");
        }

        try {
            return ResponseEntity.ok(postService.createPost(post, userEmail));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating post: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/category/{category}")
    public List<Post> getPostsByCategory(@PathVariable String category) {
        return postService.getPostsByCategory(category);
    }

    @GetMapping("/user/{userId}")
    public List<Post> getPostsByUserId(@PathVariable Long userId) {
        return postService.getPostsByUserId(userId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPostById(@PathVariable Long id) {
        try {
            Post post = postService.getPostById(id);
            if (post != null) {
                return ResponseEntity.ok(post);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Post not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error retrieving post: " + e.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updatePost(@PathVariable Long id, @RequestBody Post post, Authentication authentication,
            HttpServletRequest request) {
        String userEmail = null;

        if (authentication != null && authentication.isAuthenticated()
                && !(authentication instanceof AnonymousAuthenticationToken)) {
            userEmail = authentication.getName();
        }

        if (userEmail == null) {
            userEmail = request.getHeader("X-User-Email");
        }

        if (userEmail == null || userEmail.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login required to update post");
        }

        try {
            return ResponseEntity.ok(postService.updatePost(id, post, userEmail));
        } catch (IllegalStateException e) {
             return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Not authorized: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating post: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public void deletePost(@PathVariable Long id) {
        postService.deletePost(id);
    }
}