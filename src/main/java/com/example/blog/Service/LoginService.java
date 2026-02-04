package com.example.blog.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.blog.Entity.SignUp;
import com.example.blog.Repository.SignUpRepository;

@Service
public class LoginService {
    @Autowired
    private SignUpRepository signUpRepo;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean authenticate(String emailId, String password) {
        SignUp user = signUpRepo.findByEmailId(emailId);
        
        if (user == null) {
            return false;
        }
        
        return passwordEncoder.matches(password, user.getPassword());
    }
}  
