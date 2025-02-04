import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Allow all endpoints
                .allowedOrigins("https://127.0.0.1:4000", "https://localhost:4000", "https://www.arthurross.nl:8443", "https://www.arthurross.nl/travelblog.html:8443") // Allow the frontend origin
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Allow the necessary https methods
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(true); // Allow credentials (cookies, authorization headers)
    }
}

