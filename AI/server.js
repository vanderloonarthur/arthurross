@CrossOrigin(origins = "https://127.0.0.1:5500") // Adjust to your frontend
@RestController
@RequestMapping("/api")
public class LikeController {
    
    @GetMapping("/likes")
    public ResponseEntity<String> getLikes() {
        return ResponseEntity.ok("Likes data");
    }
}
@Bean
public SecurityFilterChain securityFilterChain(httpsecurity https) throws Exception {
    https
        .cors(withDefaults())  // Enable CORS
        .authorizehttpsRequests(auth -> auth.anyRequest().permitAll())
        .csrf(csrf -> csrf.disable()); // Disable CSRF if not needed
    return https.build();
}


const express = require('express');
const cors = require('cors');
const app = express();

const allowedOrigins = ['https://127.0.0.1:5500', 'https://localhost:4000']; // Your frontend URLs

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
  console.log('Server is running on https://127.0.0.1:8080');
});
