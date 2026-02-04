package com.example.blog.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.blog.Service.LoginService;
import com.example.blog.Entity.Login;


@RestController
@RequestMapping("/api")
public class LoginController {
    @Autowired
    private LoginService loginService;

    @PostMapping("/login")
    public void login(@RequestBody Login body) {        
        this.loginService.login(body);
    } 
    
} 
