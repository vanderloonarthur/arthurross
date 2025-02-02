package com.example.AI.service;

import com.example.AI.model.Like;
import com.example.AI.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LikeService {

    private final LikeRepository likeRepository;

    @Autowired
    public LikeService(LikeRepository likeRepository) {
        this.likeRepository = likeRepository;
    }

    public int getGlobalLikes() {
        return likeRepository.findAll().stream()
                              .mapToInt(Like::getLikeCount)
                              .sum(); // Calculate global like count
    }

    public void updateLikeCount(String imageId, int likeCount) {
        Like like = likeRepository.findById(imageId).orElse(new Like());
        like.setImageId(imageId);
        like.setLikeCount(likeCount);
        likeRepository.save(like);
    }
}
