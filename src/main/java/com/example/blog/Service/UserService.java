package com.example.blog.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.blog.Entity.User;
import com.example.blog.Repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepo;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @SuppressWarnings("null")
    public Optional<User> getUserById(Long id) {
        return userRepo.findById(id);
    }

    @SuppressWarnings("null")
    public Optional<User> getUserByEmail(String email) {
        return userRepo.findByEmailId(email);
    }

    @SuppressWarnings("null")
    public User updateUserProfile(Long userId, User updatedUser) {
        Optional<User> existingUser = userRepo.findById(userId);
        
        if (!existingUser.isPresent()) {
            throw new RuntimeException("User not found");
        }
        
        User user = existingUser.get();
        
        // Update name if provided
        if (updatedUser.getName() != null && !updatedUser.getName().isEmpty()) {
            user.setName(updatedUser.getName());
        }
        
        // Update bio if provided
        if (updatedUser.getBio() != null && !updatedUser.getBio().isEmpty()) {
            user.setBio(updatedUser.getBio());
        }
        
        // Update profile picture if provided
        if (updatedUser.getProfilePicUrl() != null && !updatedUser.getProfilePicUrl().isEmpty()) {
            user.setProfilePicUrl(updatedUser.getProfilePicUrl());
        }
        
        User savedUser = userRepo.save(user);
        return savedUser != null ? savedUser : user;
    }

    @SuppressWarnings("null")
    public User updatePassword(Long userId, String oldPassword, String newPassword) {
        Optional<User> existingUser = userRepo.findById(userId);
        
        if (!existingUser.isPresent()) {
            throw new RuntimeException("User not found");
        }
        
        User user = existingUser.get();
        
        // Verify old password
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }
        
        // Encode and set new password
        user.setPassword(passwordEncoder.encode(newPassword));
        
        return userRepo.save(user);
    }

    @SuppressWarnings("null")
    public User updateEmail(Long userId, String newEmail) {
        Optional<User> existingUser = userRepo.findById(userId);
        
        if (!existingUser.isPresent()) {
            throw new RuntimeException("User not found");
        }
        
        // Check if email already exists
        Optional<User> emailExists = userRepo.findByEmailId(newEmail);
        if (emailExists.isPresent() && emailExists.get().getId() != userId) {
            throw new RuntimeException("Email already in use");
        }
        
        User user = existingUser.get();
        user.setEmailId(newEmail);
        
        return userRepo.save(user);
    }
    public void deleteUser(Long id) {
    User user = userRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));

    userRepo.delete(user);
}

}