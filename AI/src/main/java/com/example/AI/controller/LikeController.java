package com.example.AI.controller;

import com.example.AI.model.Like;
import com.example.AI.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/likes")
public class LikeController {

    @Autowired
    private LikeRepository likeRepository;

    private int calculateLikeCount(Long postId) {
        List<Like> likes = likeRepository.findByPostId(postId);
        return likes.stream().mapToInt(Like::getLikeCount).sum();
    }

    @GetMapping("/{imageId}")
    public int getLikeCountByImageId(@PathVariable Long imageId) {
        return calculateLikeCount(imageId);
    }

    @PostMapping
    public void updateLikeCount(@RequestBody LikeRequest likeRequest) {
        Long postIdLong = Long.valueOf(likeRequest.getPostId());
        List<Like> likes = likeRepository.findByPostId(postIdLong);
        Like like;
        if (!likes.isEmpty()) {
            like = likes.get(0);
            like.setLikeCount(likeRequest.getLikes());
        } else {
            like = new Like();
            like.setPostId(postIdLong);
            like.setLikeCount(likeRequest.getLikes());
        }
        likeRepository.save(like);
    }

    @PostMapping("/like")
    public ResponseEntity<?> addLike(@RequestParam Long userId, @RequestParam Long postId) {
        // ...existing code...
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/like")
    public ResponseEntity<?> removeLike(@RequestParam Long userId, @RequestParam Long postId) {
        // ...existing code...
        return ResponseEntity.ok().build();
    }

    @GetMapping("/like/count")
    public ResponseEntity<Integer> getLikeCount(@RequestParam Long postId) {
        int likeCount = calculateLikeCount(postId);
        return ResponseEntity.ok(likeCount);
    }

    @GetMapping("/like/status")
    public ResponseEntity<Boolean> hasUserLiked(@RequestParam Long userId, @RequestParam Long postId) {
        List<Like> likes = likeRepository.findByPostId(postId);
        boolean hasLiked = likes.stream().anyMatch(like -> like.getUserId().equals(userId));
        return ResponseEntity.ok(hasLiked);
    }

    public static class LikeRequest {
        private String postId;
        private int likes;

        // Getters and Setters
        public String getPostId() {
            return postId;
        }

        public void setPostId(String postId) {
            this.postId = postId;
        }

        public int getLikes() {
            return likes;
        }

        public void setLikes(int likes) {
            this.likes = likes;
        }
    }
}
