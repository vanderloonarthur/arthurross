let loggedInUserId = null; // This should be populated after successful login
const API_URL = "https://www.arthurross.nl:8443/api/likes";  // Ensure it's declared once!

// Function to like/unlike an image
async function likeImage(imageId) {
    if (!loggedInUserId) {
        alert("You need to log in first.");
        openLoginModal();
        return;
    }

    const likeCountElem = document.getElementById(`${imageId}-like-count`);
    if (!likeCountElem) {
        console.error(`Element with ID ${imageId}-like-count not found`);
        return;
    }

    let currentLikes = parseInt(likeCountElem.innerText) || 0;
    const isLiked = localStorage.getItem(`${imageId}-liked`) === 'true';

    if (isLiked) {
        currentLikes--;
        localStorage.removeItem(`${imageId}-liked`);
    } else {
        currentLikes++;
        localStorage.setItem(`${imageId}-liked`, 'true');
    }

    likeCountElem.innerText = `${currentLikes} Likes`;

    // Update button UI
    const likeButton = document.querySelector(`#${imageId} .like-button`);
    if (likeButton) {
        likeButton.innerText = isLiked ? '❤️ Like' : 'Unlike';
        likeCountElem.style.color = isLiked ? '#e0e0e0' : '#ffeb3b';
    }

    try {
        const response = await fetch(`${API_URL}/${imageId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: loggedInUserId,
                imageId: imageId,
                isLiked: !isLiked,
                likeCount: currentLikes
            }),
        });

        if (!response.ok) throw new Error('Failed to update like status');
        console.log(`Like status updated for ${imageId}`);
    } catch (error) {
        console.error('Error updating like:', error);
    }
}

// Function to fetch like counts
async function fetchLikeCount(imageId) {
    try {
        const response = await fetch(`${API_URL}/${imageId}`);
        if (!response.ok) throw new Error('Failed to fetch like count');

        const likes = await response.json();
        const likeCountElem = document.getElementById(`${imageId}-like-count`);
        if (likeCountElem) likeCountElem.innerText = `${likes.likeCount} Likes`;
    } catch (error) {
        console.error(`Error fetching like count for ${imageId}:`, error);
    }
}

// Function to handle Facebook login
function loginWithFacebook() {
    if (typeof FB !== 'undefined') {
        FB.login(response => {
            if (response.authResponse) {
                loggedInUserId = response.authResponse.userID;
                alert("Logged in with Facebook");
                saveLikes(loggedInUserId, response.authResponse.accessToken);
            } else {
                alert("User cancelled login.");
            }
        }, { scope: 'public_profile,email' });
    } else {
        console.error('Facebook SDK not loaded');
    }
}

// Function to handle Google login
function handleCredentialResponse(response) {
    loggedInUserId = response.credential;
    alert("Logged in with Google");
}

// Function to save Facebook likes
async function saveLikes(userId, accessToken) {
    try {
        const response = await axios.get(`https://graph.facebook.com/me/likes?access_token=${accessToken}`);
        if (!response.data || !response.data.data) throw new Error("Invalid response from Facebook API");

        for (let page of response.data.data) {
            await fetch('http://localhost:8443/save-like', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    likedPageId: page.id,
                    likedPageName: page.name,
                    likedPageCategory: page.category,
                }),
            });
        }

        console.log('Facebook likes saved successfully');
    } catch (error) {
        console.error('Error saving likes:', error);
    }
}

// Modal functions
function openLoginModal() { document.getElementById("login-modal").style.display = "block"; }
function closeLoginModal() { document.getElementById("login-modal").style.display = "none"; }
function openSignupModal() { document.getElementById("signup-modal").style.display = "block"; }
function closeSignupModal() { document.getElementById("signup-modal").style.display = "none"; }

// Event listeners for modals and form submissions
document.addEventListener('DOMContentLoaded', function () {
    console.log("JavaScript loaded successfully!");

    const imageIds = ['milaan', 'madrid', 'stuttgart', 'edinburgh'];
    imageIds.forEach(imageId => {
        fetchLikeCount(imageId);  // Fetch the like count for each image
    });

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            const loginStatus = document.getElementById('login-status');

            if (!username || !password) {
                loginStatus.textContent = 'Username and password are required.';
                return;
            }

            try {
                const response = await fetch(event.target.action, {
                    method: 'POST',
                    body: new FormData(event.target),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    loginStatus.textContent = 'Login successful!';
                    loggedInUserId = username; // Assuming user ID is the username for now
                    setTimeout(() => closeLoginModal(), 2000);
                } else {
                    loginStatus.textContent = 'Login failed. Please try again.';
                }
            } catch (error) {
                loginStatus.textContent = 'An error occurred during login.';
                console.error(error);
            }
        });
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async function(event) {
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
    }
});

// Initialize Facebook SDK
window.fbAsyncInit = function () {
    FB.init({
        appId: '626159790032742',
        xfbml: true,
        version: 'v22.0'
    });
    FB.AppEvents.logPageView();
};

// Load Facebook SDK asynchronously
(function (d, s, id) {
    let js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
