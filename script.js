<html lang="en"><head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Reis door Europa met Arthur Ross! Ontdek de schoonheid van Europa met deze boeiende reisverhalen.">
    <meta name="keywords" content="Europa, reizen, Arthur Ross, reisverhalen, Milaan, Madrid, Stuttgart, Edinburgh">
    <meta property="og:title" content="Gallery - Reis door Europa met Arthur Ross!">
    <meta property="og:description" content="Ontdek de schoonheid van Europa met deze boeiende reisverhalen van Arthur Ross.">
    <meta property="og:image" content="https://www.arthurross.nl/assets/images/madride.png">
    <meta property="og:url" content="https://www.arthurross.nl/travelblog.html">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Gallery - Reis door Europa met Arthur Ross!">
    <meta name="twitter:description" content="Ontdek de schoonheid van Europa met deze boeiende reisverhalen van Arthur Ross.">
    <meta name="twitter:image" content="https://www.arthurross.nl/assets/images/madride.png">
    <title>Travel Blog</title>
    <link rel="icon" href="/assets/images/europa.png" type="image/x-icon">
    <script>
        let loggedInUserId = null; // This should be populated after successful login

        // Example function for liking an image
        async function likeImage(imageId) {
            if (loggedInUserId === null) {
                alert("You must be logged in to like images.");
                return;
            }

            const likeCountElem = document.getElementById(`${imageId}-like-count`);
            if (!likeCountElem) {
                console.error(`Element with ID ${imageId}-like-count not found`);
                return;
            }

            let currentLikes = parseInt(likeCountElem.innerText) || 0;

            if (localStorage.getItem(`${imageId}-liked`)) {
                currentLikes--;
                localStorage.removeItem(`${imageId}-liked`);
                alert('You unliked this image.');
                likeCountElem.innerText = `${currentLikes} Likes`;
                const likeButton = document.querySelector(`#${imageId} .like-button`);
                likeButton.innerText = '❤️ Like';
                likeCountElem.style.color = '#e0e0e0';
            } else {
                currentLikes++;
                localStorage.setItem(`${imageId}-liked`, 'true');
                alert('You liked this image.');
                likeCountElem.innerText = `${currentLikes} Likes`;
                const likeButton = document.querySelector(`#${imageId} .like-button`);
                likeButton.innerText = 'Unlike';
                likeCountElem.style.color = '#ffeb3b';
            }

            // Make API call to sync like with backend
            try {
                const response = await fetch(`/like`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: loggedInUserId, // assuming loggedInUserId is available
                        imageId: imageId,
                        isLiked: localStorage.getItem(`${imageId}-liked`) === 'true',
                        likeCount: currentLikes
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to update like count');
                }
                console.log(`Like/unlike for ${imageId} updated successfully`);
            } catch (error) {
                console.error('Error updating like count:', error);
            }

            localStorage.setItem(imageId, currentLikes);
        }

        // Update the like count displayed on the page
        function updateLikeCount(imageId, newLikeCount) {
            const likeCountElement = document.getElementById(`${imageId}-like-count`);
            likeCountElement.innerText = `${newLikeCount} Likes`;
        }

        // Example Facebook login handling
        function loginWithFacebook() {
            FB.login(function(response) {
                if (response.authResponse) {
                    loggedInUserId = response.authResponse.userID; // Get the user ID after login
                    alert("Logged in with Facebook");
                } else {
                    alert("User cancelled login or did not fully authorize.");
                }
            });
        }

        // Example Google login callback
        function handleCredentialResponse(response) {
            loggedInUserId = response.credential; // Use the credential for logged-in user
            alert("Logged in with Google");
        }

        // Modal handling functions
        function openModal() { document.getElementById("feedback-modal").style.display = "block"; }
        function closeModal() { document.getElementById("feedback-modal").style.display = "none"; }

        function openSignupModal() { document.getElementById("signup-modal").style.display = "block"; }
        function closeSignupModal() { document.getElementById("signup-modal").style.display = "none"; }

        function openLoginModal() { document.getElementById("login-modal").style.display = "block"; }
        function closeLoginModal() { document.getElementById("login-modal").style.display = "none"; }

        document.addEventListener('DOMContentLoaded', function() {
            console.log("JavaScript is working!");

            const API_URL = "https://www.arthurross.nl:8443/api/likes";

            function openModal() {
                try {
                    const modal = document.getElementById("feedback-modal");
                    modal.style.display = "block";
                    modal.classList.add("show");
                    modal.setAttribute("aria-hidden", "false");
                } catch (error) {
                    console.error('Error:', error);
                }
            }

            function closeModal() {
                try {
                    const modal = document.getElementById("feedback-modal");
                    modal.classList.remove("show");
                    modal.setAttribute("aria-hidden", "true");
                    setTimeout(() => {
                        modal.style.display = "none";
                    }, 300);
                } catch (error) {
                    console.error('Error:', error);
                }
            }

            window.onclick = function(event) {
                const modal = document.getElementById("feedback-modal");
                if (event.target === modal) closeModal();
            };

            const scrollUpBtn = document.getElementById("scrollUpBtn");
            window.onscroll = function() {
                scrollUpBtn.style.display = (window.scrollY > 100) ? "block" : "none";
            };

            scrollUpBtn.addEventListener("click", () => {
                try {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                } catch (error) {
                    console.error('Error:', error);
                }
            });

            document.getElementById("feedbackForm").addEventListener("submit", async function(event) {
                event.preventDefault();
                const status = document.getElementById("feedback-status");
                const thankYouScreen = document.getElementById("thankYouScreen");
                const data = new FormData(event.target);

                try {
                    const response = await fetch(event.target.action, {
                        method: event.target.method,
                        body: data,
                        headers: { 'Accept': 'application/json' }
                    });

                    if (response.ok) {
                        status.innerHTML = "Bedankt voor uw inzending!";
                        event.target.reset();
                        thankYouScreen.classList.remove("hidden");
                        setTimeout(() => closeModal(), 2000);
                    } else {
                        const result = await response.json();
                        status.innerHTML = result.errors ? result.errors.map(error => error.message).join(", ") : 
                            "Oeps! Er was een probleem bij het verzenden van uw formulier.";
                    }
                } catch (error) {
                    status.innerHTML = "Oeps! Er was een probleem bij het verzenden van uw formulier.";
                }
            });

            document.getElementById("closeThankYouBtn").addEventListener("click", function() {
                document.getElementById("thankYouScreen").classList.add("hidden");
            });

            function isLoggedIn() {
                // Placeholder function to check if the user is logged in
                // Replace with actual login check logic
                return !!localStorage.getItem('loggedIn');
            }

            window.likeImage = async function(imageId) {
                if (!isLoggedIn()) {
                    openLoginModal();
                    return;
                }
                try {
                    const likeCountElem = document.getElementById(`${imageId}-like-count`);
                    if (!likeCountElem) {
                        console.error(`Element with ID ${imageId}-like-count not found`);
                        return;
                    }
                    let currentLikes = parseInt(likeCountElem.innerText) || 0;

                    if (localStorage.getItem(`${imageId}-liked`)) {
                        currentLikes--;
                        localStorage.removeItem(`${imageId}-liked`);
                        alert('You unliked this image.');

                        likeCountElem.innerText = `${currentLikes} Likes`;
                        const likeButton = document.querySelector(`#${imageId} .like-button`);
                        likeButton.innerText = '❤️ Like';
                        likeCountElem.style.color = '#e0e0e0';

                    } else {
                        currentLikes++;
                        localStorage.setItem(`${imageId}-liked`, 'true');
                        alert('You liked this image.');

                        likeCountElem.innerText = `${currentLikes} Likes`;
                        const likeButton = document.querySelector(`#${imageId} .like-button`);
                        likeButton.innerText = 'Unlike';
                        likeCountElem.style.color = '#ffeb3b';
                    }

                    try {
                        const response = await fetch(`${API_URL}/${imageId}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ isLiked: localStorage.getItem(`${imageId}-liked`) === 'true', likeCount: currentLikes }),
                        });

                        if (!response.ok) {
                            throw new Error('Failed to update like count');
                        }

                        console.log(`Like/unlike for ${imageId} updated successfully`);
                    } catch (error) {
                        console.error('Error updating like count:', error);
                    }

                    localStorage.setItem(imageId, currentLikes);
                } catch (error) {
                    console.error('Error:', error);
                }
            }

            async function fetchLikeCount(imageId) {
                try {
                    const url = `${API_URL}/${imageId}`;
                    console.log(`Fetching like count for ${imageId} from ${url}`);
                    const response = await fetch(url);
                    if (response.ok) {
                        const likes = await response.json();
                        const likeCountElem = document.getElementById(`${imageId}-like-count`);
                        if (likeCountElem) {
                            likeCountElem.innerText = `${likes.likeCount} Likes`;
                        } else {
                            console.error(`Element with ID ${imageId}-like-count not found`);
                        }
                    } else {
                        console.error(`Failed to fetch like count for ${imageId}: ${response.statusText}`);
                    }
                } catch (error) {
                    console.error(`Error fetching like count for ${imageId}:`, error);
                }
            }

            const imageIds = ['milaan', 'madrid', 'stuttgart', 'edinburgh'];

            imageIds.forEach(imageId => {
                const likeCountElem = document.getElementById(`${imageId}-like-count`);
                if (likeCountElem) {
                    if (localStorage.getItem(`${imageId}-liked`)) {
                        let currentLikes = parseInt(likeCountElem.innerText) || 0;
                        likeCountElem.style.color = '#ffeb3b';
                        likeCountElem.innerText = `${currentLikes + 1} Likes`;
                        const likeButton = document.querySelector(`#${imageId} .like-button`);
                        likeButton.innerText = 'Unlike';
                    }

                    fetchLikeCount(imageId);
                } else {
                    console.error(`Element with ID ${imageId}-like-count not found`);
                }
            });

            fetch(API_URL)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`https error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => console.log(data))
                .catch(error => console.error('Error:', error));

            const images = document.querySelectorAll('.image-item img');

            images.forEach(image => {
                const imageId = image.getAttribute('data-image-id');
                let clickCount = parseInt(localStorage.getItem(`${imageId}-clicks`) || '0', 10);
                const checkMark = image.nextElementSibling;

                if (clickCount === 1) {
                    image.classList.add('pressed');
                } else if (clickCount >= 2) {
                    image.classList.add('second-pressed');
                    checkMark.classList.remove('hidden');
                }

                image.addEventListener('click', function() {
                    clickCount++;
                    localStorage.setItem(`${imageId}-clicks`, clickCount);

                    if (clickCount === 1) {
                        image.classList.add('pressed');
                        checkMark.classList.add('hidden');
                    } else if (clickCount >= 2) {
                        image.classList.remove('pressed');
                        image.classList.add('second-pressed');
                        checkMark.classList.remove('hidden');
                    }
                });
            });
        });

        function openLoginModal() {
            document.getElementById('login-modal').style.display = 'block';
            document.getElementById('login-modal').setAttribute('aria-hidden', 'false');
        }

        function closeLoginModal() {
            document.getElementById('login-modal').style.display = 'none';
            document.getElementById('login-modal').setAttribute('aria-hidden', 'true');
        }

        function openSignupModal() {
            document.getElementById('signup-modal').style.display = 'block';
            document.getElementById('signup-modal').setAttribute('aria-hidden', 'false');
        }

        function closeSignupModal() {
            document.getElementById('signup-modal').style.display = 'none';
            document.getElementById('signup-modal').setAttribute('aria-hidden', 'true');
        }

        document.getElementById('signupForm').addEventListener('submit', async function(event) {
            event.preventDefault();
            const username = document.getElementById('signup-username').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const signupStatus = document.getElementById('signup-status');

            try {
                const response = await fetch("https://www.arthurross.nl/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    credentials: "include", // Important for cookies/auth headers
                    body: JSON.stringify({ username, email, password }),
                });

                if (response.ok) {
                    signupStatus.textContent = "Sign up successful!";
                    event.target.reset();
                    setTimeout(() => closeSignupModal(), 2000);
                } else {
                    const result = await response.json();
                    signupStatus.textContent = result.errors ? 
                        result.errors.map(error => error.message).join(", ") : 
                        "Oops! There was a problem with your sign up.";
                }
            } catch (error) {
                signupStatus.textContent = "Oops! There was a problem with your sign up.";
            }
        });

        document.getElementById('loginForm').addEventListener('submit', async function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const usernameError = document.getElementById('username-error');
            const passwordError = document.getElementById('password-error');
            const loginStatus = document.getElementById('login-status');
            let valid = true;

            if (username.trim() === '') {
                usernameError.textContent = 'Username is required.';
                valid = false;
            } else {
                usernameError.textContent = '';
            }

            if (password.trim() === '') {
                passwordError.textContent = 'Password is required.';
                valid = false;
            } else {
                passwordError.textContent = '';
            }

            if (valid) {
                try {
                    const response = await fetch(event.target.action, {
                        method: event.target.method,
                        body: new FormData(event.target),
                        headers: { 'Accept': 'application/json' }
                    });

                    if (response.ok) {
                        loginStatus.textContent = 'Login successful!';
                        event.target.reset();
                        alert('Login successful!');
                    } else {
                        const result = await response.json();
                        loginStatus.textContent = result.errors ? result.errors.map(error => error.message).join(", ") : 
                            'Oops! There was a problem with your login.';
                        alert('Oops! There was a problem with your login.');
                    }
                } catch (error) {
                    loginStatus.textContent = 'Oops! There was a problem with your login.';
                    alert('Oops! There was a problem with your login.');
                }
            }
        });

        // Facebook SDK initialization
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '626159790032742',
                xfbml      : true,
                version    : 'v22.0'
            });
            FB.AppEvents.logPageView();
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        document.addEventListener("DOMContentLoaded", function () {
            loadLikes();
        });

        function loadLikes() {
            const likedImages = JSON.parse(localStorage.getItem("likedImages")) || {};
            for (const [id, count] of Object.entries(likedImages)) {
                document.getElementById(`${id}-like-count`).textContent = `${count} Likes`;
            }
        }

        function likeImage(imageId) {
            let likedImages = JSON.parse(localStorage.getItem("likedImages")) || {};
            if (!likedImages[imageId]) {
                likedImages[imageId] = 1;
            } else {
                likedImages[imageId] += 1;
            }
            localStorage.setItem("likedImages", JSON.stringify(likedImages));
            document.getElementById(`${imageId}-like-count`).textContent = `${likedImages[imageId]} Likes`;
        }

        function likeImage(imageId) {
            fetch("like.php", {
                method: "POST",
                body: new URLSearchParams({ imageId }),
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById(`${imageId}-like-count`).textContent = `${data.likes} Likes`;
            });
        }
    </script>    
</head>
<body>
    <header>
        <nav>
            <h1>Reis door Europa met Arthur Ross!</h1>
        </nav>
    </header>
    <main>
        <section class="image-gallery">
            <!-- Blog Items -->
            <div class="image-item" id="milaan">
                <a href="/posts/milaan.html" class="golden-link">
                    <img src="/assets/images/skyline.jpg" alt="Milaan">
                    <div class="image-caption"><p>Bedevaart naar Milaan [mei/ juni 2016]</p></div>
                </a>
                <div class="like-container">
                    <button class="like-button" onclick="likeImage('milaan')">❤️ Like</button>
                    <span id="milaan-like-count">0 Likes</span>
                </div>
            </div>
        </section>
        <div class="fb-like" data-share="true" data-width="450" data-show-faces="true"></div>

        <!-- Google Sign-Up Button -->
        <div class="centered-button">
            <div id="g_id_onload" data-client_id="1066413110213-5qld3jtgiaarh31havq0l2372gdlt9l4.apps.googleusercontent.com" data-login_uri="https://arthurross.nl/auth/google" data-callback="handleCredentialResponse"></div>
            <div class="g_id_signin" data-type="standard" data-theme="outline" data-text="Sign up with Google" data-shape="rectangular" data-size="large"></div>
        </div>

        <!-- Facebook Login Button -->
        <div class="centered-button">
            <button id="facebook-login-btn" class="facebook-login-btn" onclick="loginWithFacebook()">Login with Facebook</button>
        </div>

        <!-- Feedback Button -->
        <div class="centered-button">
            <button id="openFeedbackBtn" class="feedback-btn" onclick="openModal()">Geef Feedback</button>
        </div>

        <!-- Feedback Modal -->
        <div id="feedback-modal" class="modal">
            <div class="modal-content">
                <span class="close" onclick="closeModal()">&times;</span>
                <h2>Hoe blij bent u met de website?</h2>
                <form id="feedbackForm" action="https://formspree.io/f/xblrooaq" method="POST">
                    <label for="selectedFeedback">Selecteer Feedback:</label>
                    <select id="selectedFeedback" name="selectedFeedback" required>
                        <option value="Zeer gelukkig">😀 Zeer gelukkig</option>
                        <option value="Gelukkig">🙂 Gelukkig</option>
                        <option value="Neutraal">😐 Neutraal</option>
                    </select>
                    <label for="message">Bericht:</label>
                    <textarea id="message" name="message" required></textarea>
                    <label for="name">Naam:</label>
                    <input type="text" id="name" name="name" required>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                    <button type="submit">Verstuur Feedback</button>
                </form>
                <div id="feedback-status"></div>
                <div id="thankYouScreen" class="hidden">
                    <p>Bedankt voor uw feedback!</p>
                    <button id="closeThankYouBtn">Sluiten</button>
                </div>
            </div>
        </div>

        <!-- Sign Up Button -->
        <div class="centered-button">
            <button id="openSignupBtn" class="signup-btn" onclick="openSignupModal()">Sign Up</button>
        </div>

        <!-- Sign Up Modal -->
        <div id="signup-modal" class="modal">
            <div class="modal-content">
                <span class="close" onclick="closeSignupModal()">&times;</span>
                <form id="signupForm" action="https://www.arthurross.nl/signup" method="POST">
                    <label for="signup-username">Username:</label>
                    <input type="text" id="signup-username" name="username" required>
                    <label for="signup-email">Email:</label>
                    <input type="email" id="signup-email" name="email" required>
                    <label for="signup-password">Password:</label>
                    <input type="password" id="signup-password" name="password" required>
                    <button type="submit">Sign Up</button>
                </form>
                <div id="signup-status"></div>
            </div>
        </div>

        <!-- Login Button -->
        <div class="centered-button">
            <button id="openLoginBtn" class="login-btn" onclick="openLoginModal()">Login</button>
        </div>

        <!-- Login Modal -->
        <div id="login-modal" class="modal">
            <div class="modal-content">
                <span class="close" onclick="closeLoginModal()">&times;</span>
                <form id="loginForm" action="https://www.arthurross.nl/login" method="POST">
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" required>
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required>
                    <button type="submit">Login</button>
                </form>
                <div id="login-status"></div>
            </div>
        </div>
    </main>
    <footer>
    </footer>        <p>&copy; 2023 Arthur Ross. All rights reserved. <a href="/privacy.html">Privacy Policy</a></p>
</body>    </footer>
</html></body>
