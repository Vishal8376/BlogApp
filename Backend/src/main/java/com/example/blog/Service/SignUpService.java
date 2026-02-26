package com.example.blog.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.blog.Entity.User;
import com.example.blog.Repository.UserRepository;

@Service
public class SignUpService {
    @Autowired
    private UserRepository repo;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(User user) {
        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return repo.save(user);
    }
}