package com.example.blog.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.blog.Entity.User;
import java.util.Optional;

@Repository
public interface LoginRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmailId(String emailId);
}
