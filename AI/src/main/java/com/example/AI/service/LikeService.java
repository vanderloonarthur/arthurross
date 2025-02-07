package com.example.AI.service;

import com.example.AI.model.Like;
import com.example.AI.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

import com.example.AI.service.UserService; // Corrected package name

@Service
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private UserService userService; // Assuming you have a UserService to manage user sessions

    public int getGlobalLikes() {
        return likeRepository.findAll()
                             .stream()
                             .mapToInt(Like::getLikeCount)
                             .sum();
    }

    public long countByPostId(Long postId) {
        return likeRepository.countByPostId(postId);
    }

    public void updateLikeCount(Long postId, int count) {
        Optional<Like> likeOptional = likeRepository.findByPostId(postId)
                                                    .stream()
                                                    .findFirst(); // Ensures we modify an existing Like

        Like like = likeOptional.orElseGet(() -> {
            Like newLike = new Like();
            newLike.setPostId(postId);
            newLike.setLikeCount(count);
            return newLike;
        }); // Create if not exists
        like.setLikeCount(count);

        likeRepository.save(like);
    }

    public void addLike(Long userId, Long postId) {
        // Implement the logic to add a like
    }

    public void removeLike(Long userId, Long postId) {
        // Implement the logic to remove a like
    }

    public int getLikeCount(Long postId) {
        // Implement the logic to get the like count
        return 0;
    }

    public boolean hasUserLiked(Long userId, Long postId) {
        return likeRepository.existsByUserIdAndPostId(userId, postId);
    }
}
