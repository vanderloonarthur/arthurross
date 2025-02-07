package com.example.AI.controller;

import com.example.AI.model.User;
import com.example.AI.repository.UserRepository;
import com.example.AI.security.JwtTokenProvider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class AuthController { // Renamed from LoginController

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        Optional<User> existingUserOpt = userRepository.findByUsername(user.getUsername());

        if (existingUserOpt.isEmpty() || !passwordEncoder.matches(user.getPassword(), existingUserOpt.get().getPassword())) {
            return ResponseEntity.badRequest().body("{\"error\": \"Invalid username or password\"}");
        }

        User existingUser = existingUserOpt.get();
        List<String> roles = existingUser.getRoles(); // Ensure `getRoles()` returns List<String>

        String token = jwtTokenProvider.createToken(existingUser.getUsername(), roles);

        return ResponseEntity.ok().body("{\"token\": \"" + token + "\"}");
    }
}
