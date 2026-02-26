package com.example.blog.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.blog.Entity.SavedPost;
import com.example.blog.Service.SavedPostService;
import java.util.List;

@RestController
@RequestMapping("/api/saved-posts")
public class SavedPostController {

    @Autowired
    private SavedPostService savedPostService;

    @PostMapping("/user/{userId}/post/{postId}")
    public ResponseEntity<?> savePost(@PathVariable Long userId, @PathVariable Long postId) {
        try {
            if (userId == null || postId == null) {
                return ResponseEntity.badRequest().body("UserId and PostId are required");
            }
            
            SavedPost savedPost = savedPostService.savePost(userId, postId);
            
            if (savedPost != null) {
                return ResponseEntity.ok(savedPost);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or Post not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save post: " + e.getMessage());
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getAllSavedPostsByUser(@PathVariable Long userId) {
        try {
            if (userId == null) {
                return ResponseEntity.badRequest().body("UserId is required");
            }
            
            List<SavedPost> savedPosts = savedPostService.getAllSavedPostsByUser(userId);
            
            if (savedPosts != null) {
                return ResponseEntity.ok(savedPosts);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to retrieve saved posts: " + e.getMessage());
        }
    }
}
