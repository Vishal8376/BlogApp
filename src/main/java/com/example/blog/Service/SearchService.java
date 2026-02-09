package com.example.blog.Service;

import com.example.blog.Entity.Post;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.blog.Repository.PostRepository;

@Service
public class SearchService {
    
    @Autowired
    private PostRepository postRepository;

    public List<Post> search(String keyword){
        return postRepository.globalSearch(keyword);
    }
}
