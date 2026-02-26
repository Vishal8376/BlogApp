package com.example.blog.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.blog.Entity.User;
import com.example.blog.Service.SignUpService;

@RestController
@RequestMapping("/api")
public class SignUpController {
    @Autowired
    private SignUpService signupService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User body) {
        try {
            if (body.getEmailId() == null || body.getEmailId().isEmpty() || 
                body.getPassword() == null || body.getPassword().isEmpty() || 
                body.getName() == null || body.getName().isEmpty()) {
                return ResponseEntity.badRequest().body("Email, password and name are required");
            }
            
            signupService.registerUser(body);
            return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Registration failed: " + e.getMessage());
        }
    }
} 
