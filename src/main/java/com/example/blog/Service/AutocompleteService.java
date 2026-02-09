package com.example.blog.Service;

import java.util.List;
import java.util.Set;
import java.util.LinkedHashSet;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.blog.Repository.PostRepository;

import org.springframework.stereotype.Service;

@Service
public class AutocompleteService {

    @Autowired
    private PostRepository postRepository;

    public List<String> suggest(String prefix) {
        Set<String> suggestions = new LinkedHashSet<>();

        suggestions.addAll(postRepository.suggestUsernames(prefix));
        suggestions.addAll(postRepository.suggestHashtags(prefix));
        suggestions.addAll(postRepository.suggestCategories(prefix));

        // Limit to top 5 suggestions
        return suggestions.stream().limit(5).toList();
    }
}
