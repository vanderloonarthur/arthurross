@CrossOrigin(origins = "http://127.0.0.1:5500") // Adjust to your frontend
@RestController
@RequestMapping("/api")
public class LikeController {
    
    @GetMapping("/likes")
    public ResponseEntity<String> getLikes() {
        return ResponseEntity.ok("Likes data");
    }
}
@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .cors(withDefaults())  // Enable CORS
        .authorizeHttpRequests(auth -> auth.anyRequest().permitAll())
        .csrf(csrf -> csrf.disable()); // Disable CSRF if not needed
    return http.build();
}


const express = require('express');
const cors = require('cors');
const app = express();

const allowedOrigins = ['http://127.0.0.1:5500', 'http://localhost:4000']; // Your frontend URLs

app.use(cors({  
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.get('/api/data', (req, res) => {
  res.json({ message: 'This is some data' });
});

app.listen(8080, () => {
  console.log('Server is running on http://127.0.0.1:8080');
});
