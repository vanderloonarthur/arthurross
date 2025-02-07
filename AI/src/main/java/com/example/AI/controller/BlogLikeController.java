package com.example.AI.controller;

import com.example.AI.model.Like;
import com.example.AI.repository.LikeRepository;
import com.example.AI.service.LikeService; // Add this import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/blog/likes")
public class BlogLikeController {

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private LikeService likeService;

    @PostMapping
    public ResponseEntity<Long> likePost(@RequestBody LikeRequest likeRequest) {
        Optional<Like> likeOptional = likeRepository.findByPostId(likeRequest.getPostId())
                                                    .stream()
                                                    .findFirst(); // Adjust to handle List
        Like like;
        if (likeOptional.isPresent()) {
            like = likeOptional.get();
            like.setLikeCount(likeRequest.getLikes());
        } else {
            like = new Like();
            like.setPostId(likeRequest.getPostId());
            like.setLikeCount(likeRequest.getLikes());
        }
        likeRepository.save(like);
        return ResponseEntity.ok(likeRequest.getPostId());
    }

    @GetMapping("/{postId}")
    public ResponseEntity<Long> getLikes(@PathVariable Long postId) {
        long likeCount = likeRepository.countByPostId(postId);
        return ResponseEntity.ok(likeCount);
    }

    @PostMapping("/{postId}/like")
    public void addLike(@RequestParam Long userId, @PathVariable Long postId) {
        likeService.addLike(userId, postId);
    }

    @DeleteMapping("/{postId}/unlike")
    public void removeLike(@RequestParam Long userId, @PathVariable Long postId) {
        likeService.removeLike(userId, postId);
    }

    public static class LikeRequest {
        private Long postId;
        private int likes;

        // Getters and setters
        public Long getPostId() {
            return postId;
        }

        public void setPostId(Long postId) {
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
