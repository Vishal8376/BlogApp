package com.example.blog.Controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.blog.Service.AutoCompleteService;


@RestController
@RequestMapping("/api/search")
public class AutoCompleteController {

    @Autowired
    private AutoCompleteService autoCompleteService;

    @GetMapping("/suggest")
    public List<String> suggest(@RequestParam String prefix) {
        return autoCompleteService.suggest(prefix);
    }
}
