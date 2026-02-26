package com.example.blog.Service;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.blog.Repository.PostRepository;

@Service
public class AutoCompleteService {

    @Autowired
    private PostRepository postRepository;

    public List<String> suggest(String prefix) {
        Set<String> suggestions = new LinkedHashSet<>();

        suggestions.addAll(postRepository.suggestAuthors(prefix));
        suggestions.addAll(postRepository.suggestHashtags(prefix));
        suggestions.addAll(postRepository.suggestCategories(prefix));

        // Limit to top 5 suggestions
        return suggestions.stream().limit(5).toList();
    }
}