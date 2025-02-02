package com.arthurross.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class DataController {

    public DataController() {
        System.out.println("DataController has been initialized!");
    }

    @GetMapping("/api/data")
    public Map<String, Object> getData() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Data fetched successfully");
        response.put("likes", 10);  // Example response data
        return response;
    }
}
