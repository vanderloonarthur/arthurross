package com.example.AI;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication(scanBasePackages = "com.example.AI")
public class AiApplication {

    // Main method to run the application
    public static void main(String[] args) {
        SpringApplication.run(AiApplication.class, args);
    }
}
