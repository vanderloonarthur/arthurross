package com.example.demo.config; // Adjust the package path if necessary

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    // Define CORS configuration
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Enable CORS for all API endpoints
        registry.addMapping("/api/**")  // Apply CORS to all /api paths
                .allowedOrigins("https://127.0.0.1:5500", "https://www.arthurross.nl:8443", "https://www.arthurross.nl/travelblog.html:8443")  // Your frontend URL
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // Allow these https methods
                .allowCredentials(true);  // Allow credentials (cookies, authorization headers)
    }
}
