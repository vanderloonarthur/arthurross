package com.example.AI.controller;

import org.springframework.https.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;  // <-- Add this import

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import com.example.AI.service.LikeService;

@Controller("customLikeController")
public class LikeController {
    // your controller code here
    private final Map<String, Integer> imageLikes = new HashMap<>();

    @Autowired
    private LikeService likeService;

    @PostMapping
    public ResponseEntity<?> updateLikeCount(@RequestBody LikeRequest likeRequest) {
        String imageId = likeRequest.getImageId();
        int currentLikes = likeRequest.getLikes();

        imageLikes.put(imageId, currentLikes);
        System.out.println("Updated likes: " + imageLikes);

        return ResponseEntity.ok().build();  // Return a successful response
    }

    @GetMapping("/global")
    public ResponseEntity<Integer> getGlobalLikeCount() {
        int globalLikes = likeService.getGlobalLikes();
        return ResponseEntity.ok(globalLikes);
    }

    @GetMapping("/{imageId}")
    public ResponseEntity<Integer> getLikeCount(@PathVariable String imageId) {
        Integer likes = imageLikes.getOrDefault(imageId, 0);
        return ResponseEntity.ok(likes);
    }

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
