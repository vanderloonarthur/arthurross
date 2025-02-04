package com.example.AI.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Like {
    
    @Id
    private String imageId;
    private int likeCount;

    // Default constructor (required for JPA)
    public Like() {}

    // Constructor with parameters
    public Like(String imageId, int likeCount) {
        this.imageId = imageId;
        this.likeCount = likeCount;
    }

    // Getters and Setters
    public String getImageId() {
        return imageId;
    }

    public void setImageId(String imageId) {
        this.imageId = imageId;
    }

    public int getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(int likeCount) {
        this.likeCount = likeCount;
    }
}

