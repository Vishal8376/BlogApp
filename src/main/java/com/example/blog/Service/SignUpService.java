package com.example.blog.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.blog.Entity.SignUp;
import com.example.blog.Repository.SignUpRepository;

@Service
public class SignUpService {
    @Autowired
    private SignUpRepository repo;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    public SignUp registerUser(SignUp user) {
        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return repo.save(user);
    }
} 