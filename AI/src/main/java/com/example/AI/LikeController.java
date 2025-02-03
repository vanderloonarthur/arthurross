package com.example.AI; // Ensure the package is consistent with your project structure

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import com.example.AI.service.LikeService;

@CrossOrigin(origins = "http://127.0.0.1:5500") // Adjust to your frontend URL
@RestController
@RequestMapping("/api/likes")
public class LikeController {

    private final Map<String, Integer> imageLikes = new HashMap<>();

    @Autowired
    private LikeService likeService;

    // ✅ Endpoint to update likes for an image
    @PostMapping
    public ResponseEntity<?> updateLikeCount(@RequestBody LikeRequest likeRequest) {
        String imageId = likeRequest.getImageId();
        int currentLikes = likeRequest.getLikes();

        imageLikes.put(imageId, currentLikes);
        System.out.println("Updated likes: " + imageLikes);

        return ResponseEntity.ok().build();
    }

    // ✅ Endpoint to get the global like count
    @GetMapping("/global")
    public ResponseEntity<Integer> getGlobalLikeCount() {
        int globalLikes = likeService.getGlobalLikes();
        return ResponseEntity.ok(globalLikes);
    }

    // ✅ Endpoint to fetch the like count for a specific image
    @GetMapping("/{imageId}")
    public ResponseEntity<Integer> getLikeCount(@PathVariable String imageId) {
        Integer likes = imageLikes.getOrDefault(imageId, 0);
        return ResponseEntity.ok(likes);
    }

    // ✅ Fix: Add the missing `/api/data` route
    @GetMapping("/data")
    public ResponseEntity<Map<String, String>> getData() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "This is some data");
        return ResponseEntity.ok(response);
    }

    // Request body class for JSON mapping
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
