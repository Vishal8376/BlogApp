package com.example.blog.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.servlet.http.HttpServletRequest;
import com.example.blog.Service.CustomUserDetails;

@RestController
@RequestMapping("/api")
public class LoginController {
    @Autowired
    private AuthenticationManager authenticationManager;
    
    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String emailId, @RequestParam String password,
            HttpServletRequest request) {
        try {
            if (emailId == null || emailId.isEmpty() || password == null || password.isEmpty()) {
                return ResponseEntity.badRequest().body(java.util.Map.of("message", "Email and password are required"));
            }
            
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(emailId, password)
            );

            if (authentication.isAuthenticated()) {
                SecurityContext context = SecurityContextHolder.createEmptyContext();
                context.setAuthentication(authentication);
                SecurityContextHolder.setContext(context);
                request.getSession(true).setAttribute(
                    HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
                    context
                );
                
                CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
                java.util.Map<String, Object> responseBody = new java.util.HashMap<>();
                responseBody.put("message", "Login successful");
                responseBody.put("user", userDetails.getUser());
                responseBody.put("token", request.getSession().getId());
                
                return ResponseEntity.ok(responseBody);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(java.util.Map.of("message", "Invalid email or password"));
            }
        } catch (AuthenticationException e) {
            logger.error("Authentication failed for email: {}, Error: {}", emailId, e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(java.util.Map.of("message", "Invalid email or password"));
        } catch (IllegalArgumentException e) {
            logger.error("Illegal argument error: {}", e.getMessage());
            return ResponseEntity.badRequest().body(java.util.Map.of("message", "Login failed: " + e.getMessage()));
        }
    }
} 
