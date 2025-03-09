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
        let loggedInUserId = null; // This should be populated after successful logins://www.googletagmanager.com/gtag/js?id=G-25QWYDWGEP"></script>

        // Example function for liking an image
        async function likeImage(imageId) {dataLayer.push(arguments);}
            if (loggedInUserId === null) {
                alert("You must be logged in to like images.");fig', 'G-25QWYDWGEP');
                return;
            }
margin: 0; padding: 0; }
            const likeCountElem = document.getElementById(`${imageId}-like-count`);m; text-align: center; }
            if (!likeCountElem) {gallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; padding: 1rem; }
                console.error(`Element with ID ${imageId}-like-count not found`);image-item img { width: 100%; height: auto; display: block; }
                return;    .image-caption, .like-container, .centered-button { text-align: center; margin-top: 0.5rem; }
        .modal { display: none; position: fixed; z-index: 1; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); }
        .modal-content { background-color: #fff; margin: 15% auto; padding: 2rem; width: 80%; max-width: 500px; }
        .close { color: #aaa; float: right; font-size: 28px; font-weight: bold; }
        .close:hover, .close:focus { color: black; cursor: pointer; }
        footer { background-color: #333; color: #fff; text-align: center; padding: 1rem; position: fixed; bottom: 0; width: 100%; }   if (localStorage.getItem(`${imageId}-liked`)) {
        footer a { color: #fff; text-decoration: none; }            currentLikes--;
        footer a:hover { text-decoration: underline; }{imageId}-liked`);
    </style>s image.');
</head> `${currentLikes} Likes`;
<body>querySelector(`#${imageId} .like-button`);
    <header>
        <nav>;
            <h1>Reis door Europa met Arthur Ross!</h1>
        </nav>
    </header>ocalStorage.setItem(`${imageId}-liked`, 'true');
 alert('You liked this image.');
    <main>       likeCountElem.innerText = `${currentLikes} Likes`;
        <section class="image-gallery">            const likeButton = document.querySelector(`#${imageId} .like-button`);
            <!-- Blog Items -->Unlike';
            <div class="image-item" id="milaan">;
                <a href="/posts/milaan.html" class="golden-link">
                    <img src="/assets/images/skyline.jpg" alt="Milaan">
                    <div class="image-caption"><p>Bedevaart naar Milaan [mei/ juni 2016]</p></div>   // Make API call to sync like with backend
                </a>        try {
                <div class="like-container">onst response = await fetch(`/like`, {
                    <button class="like-button" onclick="likeImage('milaan')">❤️ Like</button>                    method: 'POST',
                    <span id="milaan-like-count">0 Likes</span>        headers: {
                </div>json',
            </div>
        </section>
        <div class="fb-like" data-share="true" data-width="450" data-show-faces="true"></div> loggedInUserId, // assuming loggedInUserId is available

        <!-- Google Sign-Up Button -->}-liked`) === 'true',
        <div class="centered-button">
            <div id="g_id_onload" data-client_id="1066413110213-5qld3jtgiaarh31havq0l2372gdlt9l4.apps.googleusercontent.com" data-login_uri="https://arthurross.nl/auth/google" data-callback="handleCredentialResponse"></div>
            <div class="g_id_signin" data-type="standard" data-theme="outline" data-text="Sign up with Google" data-shape="rectangular" data-size="large"></div>
        </div>
                if (!response.ok) {
        <!-- Facebook Login Button -->ailed to update like count');
        <div class="centered-button">
            <button id="facebook-login-btn" class="facebook-login-btn" onclick="loginWithFacebook()">Login with Facebook</button> ${imageId} updated successfully`);
        </div>
;
        <!-- Feedback Button -->
        <div class="centered-button">
            <button id="openFeedbackBtn" class="feedback-btn" onclick="openModal()">Geef Feedback</button>
        </div>

        <!-- Feedback Modal -->
        <div id="feedback-modal" class="modal">updateLikeCount(imageId, newLikeCount) {
            const likeCountElement = document.getElementById(`${imageId}-like-count`);
            likeCountElement.innerText = `${newLikeCount} Likes`;       <span class="close" onclick="closeModal()">&times;</span>
                <h2>Hoe blij bent u met de website?</h2>        }
                <form id="feedbackForm" action="https://formspree.io/f/xblrooaq" method="POST">
                    <label for="selectedFeedback">Selecteer Feedback:</label>
                    <select id="selectedFeedback" name="selectedFeedback" required>        function loginWithFacebook() {
                        <option value="Zeer gelukkig">😀 Zeer gelukkig</option>
                        <option value="Gelukkig">🙂 Gelukkig</option>
                    loggedInUserId = response.authResponse.userID; // Get the user ID after login                        <option value="Neutraal">😐 Neutraal</option>
                    alert("Logged in with Facebook");
                } else {
                    alert("User cancelled login or did not fully authorize.");                    </select>
                }
            });essage" required></textarea>
        }                    <label for="name">Naam:</label>

        // Example Google login callback                    <label for="email">Email:</label>
        function handleCredentialResponse(response) {mail" id="email" name="email" required>
            loggedInUserId = response.credential; // Use the credential for logged-in userbutton type="submit">Verstuur Feedback</button>
            alert("Logged in with Google");
        }

        // Modal handling functions
        function openModal() { document.getElementById("feedback-modal").style.display = "block"; }als -->
        function closeModal() { document.getElementById("feedback-modal").style.display = "none"; }
on id="openSignupBtn" class="signup-btn" onclick="openSignupModal()">Sign Up</button>
        function openSignupModal() { document.getElementById("signup-modal").style.display = "block"; }>
        function closeSignupModal() { document.getElementById("signup-modal").style.display = "none"; }
s="modal">
        function openLoginModal() { document.getElementById("login-modal").style.display = "block"; }s="modal-content">
        function closeLoginModal() { document.getElementById("login-modal").style.display = "none"; }an>

        document.addEventListener('DOMContentLoaded', function() {od="POST">
            console.log("JavaScript is working!");-username">Username:</label>
rname" name="username" required>
            const API_URL = "https://www.arthurross.nl:8443/api/likes";or="signup-email">Email:</label>
email" id="signup-email" name="email" required>
            function openModal() {ssword:</label>
                try {   <input type="password" id="signup-password" name="password" required>
                    const modal = document.getElementById("feedback-modal");       <button type="submit">Sign Up</button>
                    modal.style.display = "block";                </form>
                    modal.classList.add("show");
                    modal.setAttribute("aria-hidden", "false");
                } catch (error) {
                    console.error('Error:', error);gin-button scope="public_profile,email" onlogin="checkLoginState();"></fb:login-button>
                }      
            }
s="login-btn" onclick="openLoginModal()">Login</button>
            function closeModal() {
                try {
                    const modal = document.getElementById("feedback-modal");        <div id="login-modal" class="modal">
                    modal.classList.remove("show");
                    modal.setAttribute("aria-hidden", "true"); class="close" onclick="closeLoginModal()">&times;</span>
                    setTimeout(() => {
                        modal.style.display = "none";rm" action="https://www.arthurross.nl/login" method="POST">
                    }, 300);</label>
                } catch (error) {   <input type="text" id="username" name="username" required>
                    console.error('Error:', error);     <label for="password">Password:</label>
                }                    <input type="password" id="password" name="password" required>
            }

            window.onclick = function(event) {
                const modal = document.getElementById("feedback-modal");
                if (event.target === modal) closeModal();
            };

            const scrollUpBtn = document.getElementById("scrollUpBtn");
            window.onscroll = function() {cy</a></p>
                scrollUpBtn.style.display = (window.scrollY > 100) ? "block" : "none";
            };

            scrollUpBtn.addEventListener("click", () => {        let loggedInUserId = null; // This should be populated after successful login
                try {
        // Example function for liking an image
        function likeImage(imageId) {
            if (loggedInUserId === null) {
                alert("You must be logged in to like images.");
                return;
            }
    
            // Make an API call to store the like (you'll need to implement this in your backend)
            fetch('/like', { status = document.getElementById("feedback-status");
                method: 'POST',een = document.getElementById("thankYouScreen");
                headers: {
                    'Content-Type': 'application/json',
                }, try {
                body: JSON.stringify({ userId: loggedInUserId, imageId: imageId }),                    const response = await fetch(event.target.action, {
            })
            .then(response => response.json())
            .then(data => {         headers: { 'Accept': 'application/json' }
                if (data.success) {                    });
                    updateLikeCount(imageId, data.newLikeCount);
                } else {
                    alert("Error liking the image. Please try again."); uw inzending!";
                }
            })           thankYouScreen.classList.remove("hidden");
            .catch(error => {                        setTimeout(() => closeModal(), 2000);
                console.error("Error:", error);
                alert("There was an error processing your like."); = await response.json();
            });TML = result.errors ? result.errors.map(error => error.message).join(", ") : 
        } "Oeps! Er was een probleem bij het verzenden van uw formulier.";
       }
        // Update the like count displayed on the pagech (error) {
        function updateLikeCount(imageId, newLikeCount) {formulier.";
            const likeCountElement = document.getElementById(`${imageId}-like-count`);
            likeCountElement.innerText = `${newLikeCount} Likes`;
        }
    getElementById("closeThankYouBtn").addEventListener("click", function() {
        // Example Facebook login handlingn");
        function loginWithFacebook() {            });
            FB.login(function(response) {
                if (response.authResponse) {
                    loggedInUserId = response.authResponse.userID; // Get the user ID after logined in
                    alert("Logged in with Facebook");
                } else {                return !!localStorage.getItem('loggedIn');
                    alert("User cancelled login or did not fully authorize.");
                }
            });
        }
                        openLoginModal();
        // Example Google login callback
        function handleCredentialResponse(response) {
            loggedInUserId = response.credential; // Use the credential for logged-in user
            alert("Logged in with Google");lementById(`${imageId}-like-count`);
        }                    if (!likeCountElem) {
    nt not found`);
    </script>    

    <script>innerText) || 0;
        function handleCredentialResponse(response) {
            console.log("Google sign-in successful: ", response);                    if (localStorage.getItem(`${imageId}-liked`)) {
            fetch('https://arthurross.nl/auth/google', {urrentLikes--;
                method: 'POST',
                body: JSON.stringify({ credential: response.credential }),this image.');
                headers: { 'Content-Type': 'application/json' },
            }).then(response => response.json())Likes`;
              .then(data => { console.log('User authenticated:', data); })likeButton = document.querySelector(`#${imageId} .like-button`);
              .catch((error) => { console.error('Error during authentication:', error); });
        }eCountElem.style.color = '#e0e0e0';

        function loginWithFacebook() {
            FB.login(function(response) {
                if (response.authResponse) {ocalStorage.setItem(`${imageId}-liked`, 'true');
                    console.log('User logged in with Facebook:', response);                        alert('You liked this image.');
                    fetch('https://arthurross.nl/auth/facebook', {
                        method: 'POST',.innerText = `${currentLikes} Likes`;
                        body: JSON.stringify({ accessToken: response.authResponse.accessToken }),Id} .like-button`);
                        headers: { 'Content-Type': 'application/json' },   likeButton.innerText = 'Unlike';
                    }).then(response => response.json())                        likeCountElem.style.color = '#ffeb3b';
                      .then(data => { console.log('User authenticated:', data); })
                      .catch((error) => { console.error('Error during authentication:', error); });
                }
            }, {scope: 'email,public_profile'});       const response = await fetch(`${API_URL}/${imageId}`, {
        }               method: 'POST',
                            headers: {
        function openModal() { document.getElementById("feedback-modal").style.display = "block"; }lication/json',
        function closeModal() { document.getElementById("feedback-modal").style.display = "none"; }       },
ed: localStorage.getItem(`${imageId}-liked`) === 'true', likeCount: currentLikes }),
        function openSignupModal() { document.getElementById("signup-modal").style.display = "block"; }
        function closeSignupModal() { document.getElementById("signup-modal").style.display = "none"; }
ok) {
        function openLoginModal() { document.getElementById("login-modal").style.display = "block"; }e like count');
        function closeLoginModal() { document.getElementById("login-modal").style.display = "none"; }

        document.addEventListener('DOMContentLoaded', function() {lly`);
            console.log("JavaScript is working!");or) {

            const API_URL = "https://www.arthurross.nl:8443/api/likes";

            function openModal() {
                try {ch (error) {
                    const modal = document.getElementById("feedback-modal");('Error:', error);
                    modal.style.display = "block";
                    modal.classList.add("show");
                    modal.setAttribute("aria-hidden", "false");
                } catch (error) {            async function fetchLikeCount(imageId) {
                    console.error('Error:', error);
                }                    const url = `${API_URL}/${imageId}`;
            } like count for ${imageId} from ${url}`);

            function closeModal() { {
                try {
                    const modal = document.getElementById("feedback-modal");like-count`);
                    modal.classList.remove("show");
                    modal.setAttribute("aria-hidden", "true");s`;
                    setTimeout(() => {
                        modal.style.display = "none";ID ${imageId}-like-count not found`);
                    }, 300);   }
                } catch (error) {                    } else {
                    console.error('Error:', error);d to fetch like count for ${imageId}: ${response.statusText}`);
                }
            }
   console.error(`Error fetching like count for ${imageId}:`, error);
            window.onclick = function(event) { }
                const modal = document.getElementById("feedback-modal");            }
                if (event.target === modal) closeModal();
            };an', 'madrid', 'stuttgart', 'edinburgh'];

            const scrollUpBtn = document.getElementById("scrollUpBtn");
            window.onscroll = function() { likeCountElem = document.getElementById(`${imageId}-like-count`);
                scrollUpBtn.style.display = (window.scrollY > 100) ? "block" : "none";
            };  if (localStorage.getItem(`${imageId}-liked`)) {
Int(likeCountElem.innerText) || 0;
            scrollUpBtn.addEventListener("click", () => {
                try {                        likeCountElem.innerText = `${currentLikes + 1} Likes`;
                    window.scrollTo({ top: 0, behavior: "smooth" });ageId} .like-button`);
                } catch (error) {                        likeButton.innerText = 'Unlike';
                    console.error('Error:', error);
                }
            });

            document.getElementById("feedbackForm").addEventListener("submit", async function(event) {                    console.error(`Element with ID ${imageId}-like-count not found`);
                event.preventDefault();
                const status = document.getElementById("feedback-status");
                const thankYouScreen = document.getElementById("thankYouScreen");
                const data = new FormData(event.target);

                try {   if (!response.ok) {
                    const response = await fetch(event.target.action, {                        throw new Error(`https error! Status: ${response.status}`);
                        method: event.target.method,
                        body: data,se.json();
                        headers: { 'Accept': 'application/json' }
                    });                .then(data => console.log(data))
or('Error:', error));
                    if (response.ok) {
                        status.innerHTML = "Bedankt voor uw inzending!";ge-item img');
                        event.target.reset();
                        thankYouScreen.classList.remove("hidden");
                        setTimeout(() => closeModal(), 2000);-id');
                    } else {m(`${imageId}-clicks`) || '0', 10);
                        const result = await response.json(); checkMark = image.nextElementSibling;
                        status.innerHTML = result.errors ? result.errors.map(error => error.message).join(", ") : 
                            "Oeps! Er was een probleem bij het verzenden van uw formulier."; if (clickCount === 1) {
                    }         image.classList.add('pressed');
                } catch (error) {                } else if (clickCount >= 2) {
                    status.innerHTML = "Oeps! Er was een probleem bij het verzenden van uw formulier.";.add('second-pressed');
                }
            });

            document.getElementById("closeThankYouBtn").addEventListener("click", function() {                image.addEventListener('click', function() {
                document.getElementById("thankYouScreen").classList.add("hidden");
            });

            function isLoggedIn() {           if (clickCount === 1) {
                // Placeholder function to check if the user is logged in                        image.classList.add('pressed');
                // Replace with actual login check logicassList.add('hidden');
                return !!localStorage.getItem('loggedIn');
            }
               image.classList.add('second-pressed');
            window.likeImage = async function(imageId) {                        checkMark.classList.remove('hidden');
                if (!isLoggedIn()) {
                    openLoginModal();
                    return;
                });
                try {
                    const likeCountElem = document.getElementById(`${imageId}-like-count`);
                    if (!likeCountElem) {('login-modal').style.display = 'block';
                        console.error(`Element with ID ${imageId}-like-count not found`); 'false');
                        return;
                    }
                    let currentLikes = parseInt(likeCountElem.innerText) || 0;
            document.getElementById('login-modal').style.display = 'none';
                    if (localStorage.getItem(`${imageId}-liked`)) {ent.getElementById('login-modal').setAttribute('aria-hidden', 'true');
                        currentLikes--;
                        localStorage.removeItem(`${imageId}-liked`);
                        alert('You unliked this image.');al() {
isplay = 'block';
                        likeCountElem.innerText = `${currentLikes} Likes`;etAttribute('aria-hidden', 'false');
                        const likeButton = document.querySelector(`#${imageId} .like-button`);
                        likeButton.innerText = '❤️ Like';
                        likeCountElem.style.color = '#e0e0e0';
t.getElementById('signup-modal').style.display = 'none';
                    } else {            document.getElementById('signup-modal').setAttribute('aria-hidden', 'true');
                        currentLikes++;
                        localStorage.setItem(`${imageId}-liked`, 'true');
                        alert('You liked this image.');rm').addEventListener('submit', async function(event) {

                        likeCountElem.innerText = `${currentLikes} Likes`;me = document.getElementById('signup-username').value;
                        const likeButton = document.querySelector(`#${imageId} .like-button`);-email').value;
                        likeButton.innerText = 'Unlike';ssword').value;
                        likeCountElem.style.color = '#ffeb3b';
                    }

                    try {e = await fetch("https://www.arthurross.nl/signup", {
                        const response = await fetch(`${API_URL}/${imageId}`, {
                            method: 'POST',       headers: {
                            headers: {             "Content-Type": "application/json",
                                'Content-Type': 'application/json',                        "Accept": "application/json",
                            },
                            body: JSON.stringify({ isLiked: localStorage.getItem(`${imageId}-liked`) === 'true', likeCount: currentLikes }),nclude", // Important for cookies/auth headers
                        });,

                        if (!response.ok) {
                            throw new Error('Failed to update like count');
                        }
get.reset();
                        console.log(`Like/unlike for ${imageId} updated successfully`);                    setTimeout(() => closeSignupModal(), 2000);
                    } catch (error) {
                        console.error('Error updating like count:', error);
                    }us.textContent = result.errors ? 
    result.errors.map(error => error.message).join(", ") : 
                    localStorage.setItem(imageId, currentLikes);lem with your sign up.";
                } catch (error) {   }
                    console.error('Error:', error);            } catch (error) {
                }= "Oops! There was a problem with your sign up.";
            }

            async function fetchLikeCount(imageId) {
                try {dEventListener('submit', async function(event) {
                    const url = `${API_URL}/${imageId}`;vent.preventDefault();
                    console.log(`Fetching like count for ${imageId} from ${url}`);            const username = document.getElementById('username').value;
                    const response = await fetch(url);rd = document.getElementById('password').value;
                    if (response.ok) {rnameError = document.getElementById('username-error');
                        const likes = await response.json();or');
                        const likeCountElem = document.getElementById(`${imageId}-like-count`);yId('login-status');
                        if (likeCountElem) {
                            likeCountElem.innerText = `${likes.likeCount} Likes`;
                        } else {e.trim() === '') {
                            console.error(`Element with ID ${imageId}-like-count not found`);                usernameError.textContent = 'Username is required.';
                        }
                    } else {
                        console.error(`Failed to fetch like count for ${imageId}: ${response.statusText}`);';
                    }
                } catch (error) {
                    console.error(`Error fetching like count for ${imageId}:`, error);
                }
            }

            const imageIds = ['milaan', 'madrid', 'stuttgart', 'edinburgh'];ordError.textContent = '';

            imageIds.forEach(imageId => {
                const likeCountElem = document.getElementById(`${imageId}-like-count`);
                if (likeCountElem) {ry {
                    if (localStorage.getItem(`${imageId}-liked`)) {       const response = await fetch(event.target.action, {
                        let currentLikes = parseInt(likeCountElem.innerText) || 0;             method: event.target.method,
                        likeCountElem.style.color = '#ffeb3b';                        body: new FormData(event.target),
                        likeCountElem.innerText = `${currentLikes + 1} Likes`;cept': 'application/json' }
                        const likeButton = document.querySelector(`#${imageId} .like-button`);
                        likeButton.innerText = 'Unlike';
                    }
s.textContent = 'Login successful!';
                    fetchLikeCount(imageId);.reset();
                } else {         alert('Login successful!');
                    console.error(`Element with ID ${imageId}-like-count not found`);
                }              const result = await response.json();
            });                        loginStatus.textContent = result.errors ? result.errors.map(error => error.message).join(", ") : 
'Oops! There was a problem with your login.';
            fetch(API_URL)m with your login.');
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`https error! Status: ${response.status}`);problem with your login.';
                    }lem with your login.');
                    return response.json();
                })            }
                .then(data => console.log(data))        });
                .catch(error => console.error('Error:', error));
initialization
            const images = document.querySelectorAll('.image-item img');dow.fbAsyncInit = function() {
            FB.init({
            images.forEach(image => {626159790032742',
                const imageId = image.getAttribute('data-image-id');
                let clickCount = parseInt(localStorage.getItem(`${imageId}-clicks`) || '0', 10);
                const checkMark = image.nextElementSibling;
B.AppEvents.logPageView();
                if (clickCount === 1) {;
                    image.classList.add('pressed');
                } else if (clickCount >= 2) {
                    image.classList.add('second-pressed');
                    checkMark.classList.remove('hidden');eturn;}
                }d = id;
 "https://connect.facebook.net/en_US/sdk.js";
                image.addEventListener('click', function() {, fjs);
                    clickCount++;ument, 'script', 'facebook-jssdk'));
                    localStorage.setItem(`${imageId}-clicks`, clickCount);

                    if (clickCount === 1) {ocument.addEventListener("DOMContentLoaded", function () {
                        image.classList.add('pressed');
                        checkMark.classList.add('hidden');
                    } else if (clickCount >= 2) {
                        image.classList.remove('pressed');
                        image.classList.add('second-pressed');|| {};
                        checkMark.classList.remove('hidden');r (const [id, count] of Object.entries(likedImages)) {
                    }-like-count`).textContent = `${count} Likes`;
                });
            });
        });
unction likeImage(imageId) {
        function openLoginModal() {et likedImages = JSON.parse(localStorage.getItem("likedImages")) || {};
            document.getElementById('login-modal').style.display = 'block';if (!likedImages[imageId]) {
            document.getElementById('login-modal').setAttribute('aria-hidden', 'false');
        }{

        function closeLoginModal() {
            document.getElementById('login-modal').style.display = 'none';("likedImages", JSON.stringify(likedImages));
            document.getElementById('login-modal').setAttribute('aria-hidden', 'true');ocument.getElementById(`${imageId}-like-count`).textContent = `${likedImages[imageId]} Likes`;
        }
nction likeImage(imageId) {
        function openSignupModal() {      fetch("like.php", {
            document.getElementById('signup-modal').style.display = 'block';T",
            document.getElementById('signup-modal').setAttribute('aria-hidden', 'false');,
        }plication/x-www-form-urlencoded" }

        function closeSignupModal() {
            document.getElementById('signup-modal').style.display = 'none';
            document.getElementById('signup-modal').setAttribute('aria-hidden', 'true');}-like-count`).textContent = `${data.likes} Likes`;
        }            });

        document.getElementById('signupForm').addEventListener('submit', async function(event) {
            event.preventDefault();
            const username = document.getElementById('signup-username').value; = function() {
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;32742',
            const signupStatus = document.getElementById('signup-status');   xfbml      : true,
    version    : 'v22.0'
            try {
                const response = await fetch("https://www.arthurross.nl/signup", {  FB.AppEvents.logPageView();
                    method: "POST",  };
                    headers: {    
                        "Content-Type": "application/json",id){
                        "Accept": "application/json",[0];
                    },rn;}
                    credentials: "include", // Important for cookies/auth headers id;
                    body: JSON.stringify({ username, email, password }),js";
                });js);
'));
                if (response.ok) {
                    signupStatus.textContent = "Sign up successful!";cInit = function() {
                    event.target.reset();({
                    setTimeout(() => closeSignupModal(), 2000);      appId      : '{your-app-id}',
                } else {        cookie     : true,
                    const result = await response.json();
                    signupStatus.textContent = result.errors ? pi-version}'
                        result.errors.map(error => error.message).join(", ") : 
                        "Oops! There was a problem with your sign up.";       
                } 
            } catch (error) {
                signupStatus.textContent = "Oops! There was a problem with your sign up.";
            }
        });function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
        document.getElementById('loginForm').addEventListener('submit', async function(event) {
            event.preventDefault();nt(s); js.id = id;
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;ntNode.insertBefore(js, fjs);
            const usernameError = document.getElementById('username-error');}(document, 'script', 'facebook-jssdk'));
            const passwordError = document.getElementById('password-error');
            const loginStatus = document.getElementById('login-status');
            let valid = true;    milaan: 0

            if (username.trim() === '') {
                usernameError.textContent = 'Username is required.';
                valid = false;
            } else {ntent = `${likeCount[postId]} Likes`;
                usernameError.textContent = '';
            }

            if (password.trim() === '') {LoginModal();
                passwordError.textContent = 'Password is required.';
                valid = false;
            } else {
                passwordError.textContent = '';Id}-like-count`);
            }
{imageId}-like-count not found`);
            if (valid) {
                try {
                    const response = await fetch(event.target.action, {
                        method: event.target.method,innerText) || 0;
                        body: new FormData(event.target),
                        headers: { 'Accept': 'application/json' })) {
                    });
emoveItem(`${imageId}-liked`);
                    if (response.ok) {
                        loginStatus.textContent = 'Login successful!';untElem.innerText = `${currentLikes} Likes`;
                        event.target.reset();t.querySelector(`#${imageId} .like-button`);
                        alert('Login successful!');
                    } else { = '#e0e0e0';
                        const result = await response.json();
                        loginStatus.textContent = result.errors ? result.errors.map(error => error.message).join(", ") : 
                            'Oops! There was a problem with your login.';orage.setItem(`${imageId}-liked`, 'true');
                        alert('Oops! There was a problem with your login.');rt('You liked this image.');
                    }        likeCountElem.innerText = `${currentLikes} Likes`;
                } catch (error) {document.querySelector(`#${imageId} .like-button`);
                    loginStatus.textContent = 'Oops! There was a problem with your login.';
                    alert('Oops! There was a problem with your login.');ikeCountElem.style.color = '#ffeb3b';
                }
            }
        });
ry {
        // Facebook SDK initialization        const response = await fetch(`/like`, {
        window.fbAsyncInit = function() {
            FB.init({           headers: {
                appId      : '626159790032742',                'Content-Type': 'application/json',
                xfbml      : true, },
                version    : 'v22.0'            body: JSON.stringify({
























































































































































  </script>}    localStorage.setItem(imageId, currentLikes);    }        console.error('Error updating like count:', error);    } catch (error) {        console.log(`Like/unlike for ${imageId} updated successfully`);        }            throw new Error('Failed to update like count');        if (!response.ok) {        });            }),                likeCount: currentLikes                isLiked: localStorage.getItem(`${imageId}-liked`) === 'true',                imageId: imageId,                userId: loggedInUserId, // assuming loggedInUserId is available            body: JSON.stringify({            },                'Content-Type': 'application/json',            headers: {            method: 'POST',        const response = await fetch(`/like`, {    try {    // Make API call to sync like with backend    }        likeCountElem.style.color = '#ffeb3b';        likeButton.innerText = 'Unlike';        const likeButton = document.querySelector(`#${imageId} .like-button`);        likeCountElem.innerText = `${currentLikes} Likes`;        alert('You liked this image.');        localStorage.setItem(`${imageId}-liked`, 'true');        currentLikes++;    } else {        likeCountElem.style.color = '#e0e0e0';        likeButton.innerText = '❤️ Like';        const likeButton = document.querySelector(`#${imageId} .like-button`);        likeCountElem.innerText = `${currentLikes} Likes`;        alert('You unliked this image.');        localStorage.removeItem(`${imageId}-liked`);        currentLikes--;    if (localStorage.getItem(`${imageId}-liked`)) {    let currentLikes = parseInt(likeCountElem.innerText) || 0;    }        return;        console.error(`Element with ID ${imageId}-like-count not found`);    if (!likeCountElem) {    const likeCountElem = document.getElementById(`${imageId}-like-count`);    }        return;        openLoginModal();    if (!isLoggedIn()) {async function likeImage(imageId) {}    document.getElementById(`${postId}-like-count`).textContent = `${likeCount[postId]} Likes`;    likeCount[postId]++;function likeImage(postId) {};    milaan: 0let likeCount = {     }(document, 'script', 'facebook-jssdk'));       fjs.parentNode.insertBefore(js, fjs);       js.src = "https://connect.facebook.net/en_US/sdk.js";       js = d.createElement(s); js.id = id;       if (d.getElementById(id)) {return;}       var js, fjs = d.getElementsByTagName(s)[0];    (function(d, s, id){      };              FB.AppEvents.logPageView();                 });        version    : '{api-version}'        xfbml      : true,        cookie     : true,        appId      : '{your-app-id}',      FB.init({    window.fbAsyncInit = function() {         }(document, 'script', 'facebook-jssdk'));           fjs.parentNode.insertBefore(js, fjs);           js.src = "https://connect.facebook.net/en_US/sdk.js";           js = d.createElement(s); js.id = id;           if (d.getElementById(id)) {return;}           var js, fjs = d.getElementsByTagName(s)[0];        (function(d, s, id){              };          FB.AppEvents.logPageView();          });            version    : 'v22.0'            xfbml      : true,            appId      : '626159790032742',          FB.init({        window.fbAsyncInit = function() {    <script>    </script>        }            });                document.getElementById(`${imageId}-like-count`).textContent = `${data.likes} Likes`;            .then(data => {            .then(response => response.json())            })                headers: { "Content-Type": "application/x-www-form-urlencoded" }                body: new URLSearchParams({ imageId }),                method: "POST",            fetch("like.php", {        function likeImage(imageId) {        }            document.getElementById(`${imageId}-like-count`).textContent = `${likedImages[imageId]} Likes`;            localStorage.setItem("likedImages", JSON.stringify(likedImages));            }                likedImages[imageId] += 1;            } else {                likedImages[imageId] = 1;            if (!likedImages[imageId]) {            let likedImages = JSON.parse(localStorage.getItem("likedImages")) || {};        function likeImage(imageId) {        }            }                document.getElementById(`${id}-like-count`).textContent = `${count} Likes`;            for (const [id, count] of Object.entries(likedImages)) {            const likedImages = JSON.parse(localStorage.getItem("likedImages")) || {};        function loadLikes() {        });            loadLikes();        document.addEventListener("DOMContentLoaded", function () {        }(document, 'script', 'facebook-jssdk'));            fjs.parentNode.insertBefore(js, fjs);            js.src = "https://connect.facebook.net/en_US/sdk.js";            js = d.createElement(s); js.id = id;            if (d.getElementById(id)) {return;}            var js, fjs = d.getElementsByTagName(s)[0];        (function(d, s, id){        };            FB.AppEvents.logPageView();            });                userId: loggedInUserId, // assuming loggedInUserId is available
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

  </script>
