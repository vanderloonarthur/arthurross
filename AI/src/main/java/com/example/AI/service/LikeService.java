package com.example.AI.service;

import com.example.AI.model.Like;
import com.example.AI.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LikeService {

    private final LikeRepository likeRepository;

    @Autowired
    public LikeService(LikeRepository likeRepository) {
        this.likeRepository = likeRepository;
    }

    public void updateLikeCount(String imageId, int likeCount) {
        Like like = likeRepository.findById(imageId).orElse(new Like(imageId, 0));
        like.setLikeCount(likeCount);
        likeRepository.save(like);
    }

    public int getLikeCount(String imageId) {
        return likeRepository.findById(imageId)
                             .map(Like::getLikeCount)
                             .orElse(0);
    }

    public int getGlobalLikes() {
        return likeRepository.findAll()
                             .stream()
                             .mapToInt(Like::getLikeCount)
                             .sum();
    }
}
