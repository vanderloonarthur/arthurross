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
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ imageId: imageId, likes: currentLikes }),
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
                    likeCountElem.innerText = `${likes} Likes`;
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
    const usernameError = document.getElementById('signup-username-error');
    const emailError = document.getElementById('signup-email-error');
    const passwordError = document.getElementById('signup-password-error');
    const signupStatus = document.getElementById('signup-status');
    let valid = true;

    if (username.trim() === '') {
        usernameError.textContent = 'Username is required.';
        valid = false;
    } else {
        usernameError.textContent = '';
    }

    if (email.trim() === '') {
        emailError.textContent = 'Email is required.';
        valid = false;
    } else {
        emailError.textContent = '';
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
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            if (response.ok) {
                signupStatus.textContent = 'Sign up successful!';
                event.target.reset();
                setTimeout(() => closeSignupModal(), 2000);
            } else {
                const result = await response.json();
                signupStatus.textContent = result.errors ? result.errors.map(error => error.message).join(", ") : 
                    'Oops! There was a problem with your sign up.';
            }
        } catch (error) {
            signupStatus.textContent = 'Oops! There was a problem with your sign up.';
        }
    }
});

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const usernameError = document.getElementById('username-error');
    const passwordError = document.getElementById('password-error');
    const loginStatus = document.getElementById('login-status');
    let valid = true;

    if (username.value.trim() === '') {
        usernameError.textContent = 'Username is required.';
        valid = false;
    } else {
        usernameError.textContent = '';
    }

    if (password.value.trim() === '') {
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