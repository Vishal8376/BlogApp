package com.example.blog.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.blog.Entity.SignUp;
import com.example.blog.Service.SignUpService; 


@RestController
@RequestMapping("/api")
public class SignUpController {
    @Autowired
    private SignUpService signupService;

    @PostMapping("/signup")
    public void signup(@RequestBody SignUp body) {        
        this.signupService.registerUser(body);
    }
    
} 
