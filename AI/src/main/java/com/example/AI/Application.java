package com.example.AI;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.example.AI")
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
