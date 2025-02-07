package com.example.AI.service;

import com.example.AI.model.User;
import com.example.AI.repository.UserRepository; // Corrected package name
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public Iterable<User> findAllUsers() {
        return userRepository.findAll();
    }

    public boolean isLoggedIn(Long userId) {
        // Implement your logic to check if the user is logged in
        // For example, check if the user exists in the session or database
        return userRepository.findById(userId).isPresent();
    }
}
