package com.example.AI.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    // A simple test endpoint
    @GetMapping("/test")
    public String test() {
        return "Spring Boot is working!";
    }
}
