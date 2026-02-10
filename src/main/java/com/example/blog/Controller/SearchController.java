package com.example.blog.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;    
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.blog.Entity.Post;
import com.example.blog.Service.SearchService;

@RestController
@RequestMapping("api/search")
public class SearchController {
    
    @Autowired
    private SearchService searchService;

    @GetMapping
    public ResponseEntity<?> search(@RequestParam("q") String query){
        try {
            if (query == null || query.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Search query cannot be empty");
            }
            List<Post> results = searchService.search(query);
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Search failed: " + e.getMessage());
        }
    }
}