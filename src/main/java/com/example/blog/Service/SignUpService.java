package com.example.blog.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.example.blog.Entity.SignUp;
import com.example.blog.Repository.SignUpRepository;

@Service
public class SignUpService {
    @Autowired
    private SignUpRepository repo;

    public void registerUser(SignUp user) {
        repo.save(user);
    }
} 