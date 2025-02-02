package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import com.example.AI.service.LikeService;

@RestController
@RequestMapping("/api/likes")
public class LikeController {

    // In-memory storage for likes (for demonstration purposes, replace with a database in production)
    private final Map<String, Integer> imageLikes = new HashMap<>();

    // Inject LikeService via @Autowired
    @Autowired
    private LikeService likeService;

    // Endpoint to update likes for an image
    @PostMapping
    public ResponseEntity<?> updateLikeCount(@RequestBody LikeRequest likeRequest) {
        String imageId = likeRequest.getImageId();
        int currentLikes = likeRequest.getLikes();

        // Save or update the like count for the image
        imageLikes.put(imageId, currentLikes);

        // For demonstration, you can print out the likes map
        System.out.println("Updated likes: " + imageLikes);

        return ResponseEntity.ok().build();  // Return a successful response
    }

    // Endpoint to get the global like count (or aggregated from LikeService)
    @GetMapping("/global")
    public ResponseEntity<Integer> getGlobalLikeCount() {
        int globalLikes = likeService.getGlobalLikes(); // Use the new method from LikeService
        return ResponseEntity.ok(globalLikes);  // Return global like count
    }

    // Endpoint to fetch the like count for a specific image
    @GetMapping("/{imageId}")
    public ResponseEntity<Integer> getLikeCount(@PathVariable String imageId) {
        Integer likes = imageLikes.getOrDefault(imageId, 0);  // Return 0 if the image has no likes yet
        return ResponseEntity.ok(likes);
    }

    // Request body class to map the incoming JSON data
    public static class LikeRequest {
        private String imageId;
        private int likes;

        public String getImageId() {
            return imageId;
        }

        public void setImageId(String imageId) {
            this.imageId = imageId;
        }

        public int getLikes() {
            return likes;
        }

        public void setLikes(int likes) {
            this.likes = likes;
        }
    }
}
