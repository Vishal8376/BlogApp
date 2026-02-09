package com.example.blog.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;    
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.blog.Entity.Post;
import com.example.blog.Service.SearchService;

@RestController
@RequestMapping("api/search")
public class SearchController {
    
    @Autowired
    private SearchService searchService;

    @GetMapping
    public List<Post> search(@RequestParam("q") String query){
        return searchService.search(query);
    }
}
