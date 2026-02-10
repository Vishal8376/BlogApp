package com.example.blog.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.blog.Entity.User;
import com.example.blog.Repository.UserRepository;
import java.util.Optional;

@Service
public class LoginService {
    @Autowired
    private UserRepository userRepo;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean authenticate(String email, String password) {
        Optional<User> userOptional = userRepo.findByEmail(email);
        
        if (!userOptional.isPresent()) {
            return false;
        }
        
        User user = userOptional.get();
        return passwordEncoder.matches(password, user.getPassword());
    }
}  
