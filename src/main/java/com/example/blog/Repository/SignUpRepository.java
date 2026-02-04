package com.example.blog.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.blog.Entity.SignUp;

public interface SignUpRepository extends JpaRepository<SignUp, Long> {
    SignUp findByEmailId(String emailId);
}
