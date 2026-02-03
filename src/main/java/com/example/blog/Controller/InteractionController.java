package com.example.blog.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.blog.Service.InteractionService;

@RestController
@RequestMapping("/api/interactions")
public class InteractionController {

    @Autowired
    private InteractionService service;

    @PostMapping("/like")
    public String like(@RequestParam Long postId,
                       @RequestParam Long userId) {
        service.toggleLike(postId, userId);
        return "Like updated";
    }

    @PostMapping("/comment")
    public String comment(@RequestParam Long postId,
                          @RequestParam Long userId,
                          @RequestParam String comment) {
        service.addComment(postId, userId, comment);
        return "Comment added";
    }
}
