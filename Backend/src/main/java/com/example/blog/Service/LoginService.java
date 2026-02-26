package com.example.blog.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.blog.Entity.User;
import com.example.blog.Repository.UserRepository;

@Service
public class LoginService {
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean authenticate(String emailId, String password) {
        User user = userRepository.findByEmailId(emailId).orElse(null);
        
        if (user == null) {
            return false;
        }
        
        return passwordEncoder.matches(password, user.getPassword());
    }
}  
