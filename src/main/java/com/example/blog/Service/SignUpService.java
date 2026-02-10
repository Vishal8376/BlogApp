package com.example.blog.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.blog.Entity.SignUp;
import com.example.blog.Entity.User;
import com.example.blog.Repository.SignUpRepository;
import com.example.blog.Repository.UserRepository;

@Service
public class SignUpService {
    @Autowired
    private SignUpRepository signUpRepo;
    
    @Autowired
    private UserRepository userRepo;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    public SignUp registerUser(SignUp signUpData) {
        if (signUpData.getPassword() != null && !signUpData.getPassword().isEmpty()) {
            signUpData.setPassword(passwordEncoder.encode(signUpData.getPassword()));
        }
        
        // Save to SignUp table
        signUpRepo.save(signUpData);
        
        // Also create User record
        User user = new User();
        user.setName(signUpData.getName());
        user.setEmail(signUpData.getEmailId());
        user.setPassword(signUpData.getPassword());
        user.setBio(signUpData.getBio());
        user.setProfilePicUrl(signUpData.getProfilePicUrl());
        
        userRepo.save(user);
        
        return signUpData;
    }
} 