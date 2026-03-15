package com.example.blog;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class GenerateBCrypt {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String password = "password";
        String hash = encoder.encode(password);
        System.out.println("Password: " + password);
        System.out.println("BCrypt Hash: " + hash);
        
        // Verify it works
        boolean matches = encoder.matches(password, hash);
        System.out.println("Verification: " + matches);
    }
}
