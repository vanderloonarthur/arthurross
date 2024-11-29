---
layout: default
permalink: /posts/madrid.md/
---
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Een spannend verslag van mijn avontuurlijke reis naar Madrid, inclusief onverwachte ontmoetingen, uitdagingen en hoogtepunten. Lees over mijn ervaringen van Leiden naar Madrid en alles daartussenin.">
  <meta name="keywords" content="reisverslag, Madrid, avontuur, liften, Vincent van Gogh, kunst, Europa">
  <meta name="author" content="Arthur Ross">
  <title>Reis naar Madrid</title>
  <link rel="stylesheet" href="{{ '/assets/css/main.css' | relative_url }}">

  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-25QWYDWGEP"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-25QWYDWGEP');
  </script>

  <!-- Favicon -->
  <link rel="icon" href="{{ site.baseurl }}/assets/images/europa.png" type="image/x-icon">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article">
  <meta property="og:title" content="Reis naar Madrid">
  <meta property="og:description" content="Een spannend verslag van mijn avontuurlijke reis naar Madrid, inclusief onverwachte ontmoetingen, uitdagingen en hoogtepunten.">
  <meta property="og:image" content="{{ site.baseurl }}/assets/images/starry_night.jpeg">
  <meta property="og:url" content="{{ site.baseurl }}/posts/madrid.md/">
  <meta property="og:site_name" content="Arthur Ross Travel Blog">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Reis naar Madrid">
  <meta name="twitter:description" content="Een spannend verslag van mijn avontuurlijke reis naar Madrid, inclusief onverwachte ontmoetingen, uitdagingen en hoogtepunten.">
  <meta name="twitter:image" content="{{ site.baseurl }}/assets/images/starry_night.jpeg">
  <meta name="twitter:site" content="@ArthurRossBlog">

  <style>
    body, html {
      height: 100%;
      margin: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: black; /* Set the background color to black */
      color: white; /* Set text color to white */
    }
    body, p {
      color: white;
    }
    h1 {
      color: green;
    }
    .back-to-gallery {
      display: inline-block;
      margin-top: 20px;
      padding: 10px 20px;
      background-color: red;
      color: white; /* Set the font color to black */
      text-decoration: none;
      font-weight: bold;
      border-radius: 5px;
      transition: background-color 0.3s, color 0.3s;
    }
    .back-to-gallery:hover {
      background-color: green;
      color: white;
    }
    .center-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      min-height: 100vh;
      overflow: hidden;
      max-width: 100%; /* Added max-width for better responsiveness */
      margin: 0 auto; /* Center the content horizontally */
    }
    .fullscreen-container {
      position: relative;
      width: 100%;
      max-height: 70vh;
      overflow: hidden;
    }
    .fullscreen-image {
      width: 100%;
      height: auto;
      object-fit: cover;
      opacity: 0;
      transition: opacity 1s ease-in-out;
    }
    .fullscreen-image.show {
      opacity: 1;
    }
    .center-text {
      font-size: 1.5vw;
      color: #FF2400;
      max-width: 80%;
      margin: 15px auto;
    }
    .small-image {
      cursor: pointer;
      max-width: 100%;
      height: auto;
      transition: transform 0.5s ease-in-out, opacity 1s ease-in-out, border 0.3s ease-in-out;
      opacity: 0;
      margin-top: 15px;
    }
    .small-image.show {
      opacity: 1;
      border: 3px solid #FF2400;
    }
    .modal {
      display: none;
      position: fixed;
      top: auto;
      right: 0; /* Stick to the right */
      bottom: 0;
      left: auto; /* Unset left */
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      overflow: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: opacity 1s ease-in-out;
      pointer-events: none; /* Clicks on the modal won't trigger events */
    }
    .modal-content {
      width: 100%;
      height: auto;
      max-width: 100%; /* Adjusted max-width */
      max-height: 100%; /* Adjusted max-height */
      object-fit: contain;
      box-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
    }
    .modal-image {
      width: 100%;
      height: auto;
      max-width: 100vw; /* Adjusted max-width to fit the viewport width */
      max-height: 100vh; /* Adjusted max-height to fit the viewport height */
      object-fit: contain;
    }
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    .modal.fade-in {
      animation: fadeIn 2s ease-in-out; /* Increased duration to 2 seconds */
      opacity: 1;
    }
    .modal.fade-out {
      opacity: 0;
    }
    /* Add a transition for the fade-out effect */
    .modal.fade-out .modal-content {
      transition: opacity 1s ease-in-out;
    }
    .modal:hover .modal-content {
      box-shadow: 0 0 30px rgba(255, 215, 0, 1);
    }
    .comment-section {
    margin: 20px auto;
    padding: 20px;
    max-width: 600px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.comment-section h2 {
    margin-bottom: 10px;
    font-size: 1.5em;
    color: #333;
}

.comment-input {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}

#commentInput {
    width: 100%;
    padding: 10px;
    font-size: 1em;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 10px;
}

#postComment {
    align-self: flex-end;
    padding: 10px 15px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

#postComment:hover {
    background-color: #0056b3;
}

#commentList {
    margin-top: 20px;
}

.comment {
    margin-bottom: 15px;
    padding: 10px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.comment p {
    margin: 0;
    font-size: 1em;
    color: #555;
}

    @media only screen and (max-width: 1200px) {
      .center-text {
        font-size: 2vw;
      }
    }
    @media only screen and (max-width: 768px) {
      .center-text {
        font-size: 3vw;
      }
    }
  </style>
</head>
<body>
  <div class="center-content">
    <div id="newText" style="display: block;">
      <h1>Vincent van Gogh achterna, 30 juni 2020</h1>
      <img src="{{ site.baseurl }}/assets/images/starry_night.jpeg" alt="Kaleidoscope" class="small-image" />
    </div>
    <div class="center-text">
      <h2>Reis naar Madrid</h2>
      <p>’ Waar is gvd mijn das..! Grote jongen die mij nu nog tegenhoudt.’ Ik werd binnengelaten in een van de studentenhuizen op de Vliet op zoek naar de
      ’hoofdverdachte madame X’ en heb haar gevraagd of zij mijn das heeft meegenomen, die avond. ’De politie is gebeld en is onderweg’ vertellen de jonge studenten woonachtig in het studentenhuis me. Ik moet maken dat ik weg ben! ’Waar kan ik nog heen?’ Dus ik pak mijn fiets en ongeveer 2 straten verder zet ik hem weer op slot, aan de voorkant van sociëteit Quintus. Ik bedenk een list, om het breekijzer uit de werkplaats te weg te gieren om vervolgens het Triumph (Leids dames dispuut) bordje van de muur te kunnen wrikken. Ik vraag aan lid TD of hij een ijzerzaag heeft, en hij begeleid me naar de werkplaats. Aangezien ik een Olympus polo draag, stelt er niemand vragen. Aldaar zoeken we naar een ijzerzaag en ik spot het breekijzer. De ijzerzaag vinden we niet maar het breekijzer verstop ik achter mijn rug. De jonge Quint ziet dit en probeert het van me af te pakken. Dit sta ik niet toe en stormram langs de student. Ik loop naar de Ravenzaal en pak een stoel. Vermoedelijk heeft lid TD de voorzitter al ingelicht. Ik zet de stoel onder het Triumph bordje, maar daar staat de voorzitter vereniging en probeert de stoel weg te trekken. Ik denk, ’ben ik nou Olymp of niet’ en net als hij de stoel wegtrekt, spring ik er bovenop, de stoel staat weer met vier poten op de grond, met mij hoog en droog er bovenop. Ik zet het breekijzer onder het Triumph bordje, maar dat blijkt nogal stevig vast te zitten.
      Zowel de voorzitter als lid TD pakken het breekijzer beet en er ontstaat een worsteling. Ik weet dat dit een moeizame strijd zal worden, dus laat uiteindelijk los en stap van de stoel. De politie blijkt wederom gebeld, dus ik haal mijn jas, en via de kelder word ik naar buiten begeleid, door de twee Quinten. De voorzitter verteld me voordat ik de vereniging uitloop dat de politie afgebeld is. Ik pak mijn fiets en ga naar huis. Mijn hechte vriend Johan heeft wat van de rumoerigheid opgevangen en stuurt me een bezorgd bericht, dus
      ik fiets langs zijn huis om het verhaal te vertellen. Na ongeveer een uur gepraat te hebben is Johan in tweestrijd en vindt dat ik verder geen aandacht moet besteden aan de das of de dame in kwestie. Ik stem hiermee in, maar Johan verteld me ook dat hij eventueel de politie belt. Zodra ik dit hoor trek ik mijn plan, wat behelst: een bliksembezoek aan de hoofdstad van Spanje, Madrid.
      Dus ik pak mijn tas (snel) en vertrek richting het tankstation Tango aan de Haagweg. Daar aangekomen blijkt dat al het verkeer de Stevenshof in gaat. Er is echter 1 man die bereid is me naar de Total aan de Lammenschansweg te nemen: Alex uit Curaçao. Ik vertel hem dat ik vind dat ’Black lives matter’ en ik krijg van hem een pen en 10 euro. Die had ik nodig, want ik had nog ongeveer 70 euro, om naar Madrid te komen. ’Thanks Rasta!’ Vervolgens word ik gauw opgepikt door Jochem, die me verteld dat hij soms wild rijdt. We hebben het over wetenschap, familie en reizen en ook al ben ik kotsmisselijk zodra ik uitstap in Rotterdam, ben ik blij met deze nieuwe gezel. In Rotterdam maak ik mijn enige meegenomen maaltijd klaar en steek twee vingers in mijn keel om de misselijkheid te bestrijden. Ik desinfecteer mijn handen met alcohol en krijg een lift van Goku. We vliegen naar Antwerpen. In eerste instantie zou hij me richting Utrecht brengen, maar hij is ontzettend geïnteresseerd in het verhaal, dus hij zegt ’ik rijd je zolang het verhaal duurt’ en hij houdt zich aan zijn woord. We belanden bij een ontzettend griezelig huis in ’the middle of nowhere’ en hij zegt ’je kan hier prima slapen.’ 
      <img src="{{ site.baseurl }}/assets/images/crows_vg.jpeg" alt="orenveld met kraaien, Vincent van Gogh" />
      <figcaption>Korenveld met kraaien, Vincent van Gogh</figcaption>
      <p>
      Ik wil echter niet te dicht bij het huis mijn tentje opzetten in verband met eventuele waakhonden, dus loop ik in de richting van het graanveld. Daar zet ik, naast de kant van de weg, mijn tentje op. Ik zou het opgezette tentje een 7 geven, maar het begint te regenen en ik ben blij om iets te hebben, dus ik wurm me de tent in. Al snel blijkt hij niet goed te staan, hij staat schuin en er komt enige regen de tent in.
      </p>
      <h2> (In de buurt van) Antwerpen</h2>
      <p>
      Ik heb niet geslapen, maar heb in een soort sluimer, tussen slapen en wakker, in het tentje gelegen. Het is half 6 in de ochtend en ik moet maken dat ik wegkom, dus ik pak snel mijn tas in en loop zoals mijn intuïtie me ingeeft. Ik blijk een goede intuïtie te hebben, want deze verteld me mijn hand op te steken en de eerste auto die langsrijd pikt me op. ’Thomas’ de Belg (uit Polen) belt zijn baas, dat hij later is en zet me af bij het tankstation langs de snelweg, in de juiste richting. Aldaar krijg ik een lift in de richting van Lille. Hier was ik al bang voor. Mensen in Lille zijn vrij stug, wat betreft lifters, en nemen haast nooit mensen mee. Toch krijg ik uiteindelijk een lift en rijd mee tot aan Parijs. De chauffeur vraagt ’apres ou d’avant Paris?’ Ik kies eieren voor mijn geld en vertel hem ’avant, sil vous plaît,’ dus zet hij me op het tankstation voor Parijs af. Op dit tankstation heb ik letterlijk 5 uur doorgebracht, omdat bijna iedereen Parijs zelf inging. Ik begon de hoop al te verliezen en was aan het kijken naar overnachtingsmogelijkheden tot Louis, met autopech, stopte. Ik verwachtte er niet veel van, maar hij zou rechtstreeks naar Bourdeax doorrijden ’Vive la France!’ Louis kon een klein beetje Engels, dus we konden een beetje praten, maar waren beiden moe. Hij stopte aan het tankstation van la Rochelle en daar zette ik mijn tentje op en heb heerlijk geslapen!</p>
      <h2>La Rochelle</h2><p>
      Om ongeveer half 8 stond ik op en pakte mijn tas weer in. Ik besefte me dat ik uiteindelijk veiliger was in de buurt van mensen, dan in het wild. De Ferrari zat helaas al vol maar er gingen meer auto’s naar Spanje, dus ik stapte in bij 2 mannen die me de grens over naar Pamplona brachten. Eenmaal in Spanje was ik een beetje huiverig voor de cultuurshock en iedereen droeg een mondmasker, wat ik ook een beetje griezelig vond. Ik at wat bij het restaurantje en besefte me dat ik nog maar zon 8 euro had. Ik moest zo snel mogelijk in Madrid geraken. Weer vertelde mijn intuïtie me te praten met, dit maal, twee Indiërs. Ze konden me niet meenemen, maar voordat ze wegreden riepen ze me naar hun auto en gaven me 20 euro. Ik was hier erg dankbaar voor en wenste ze een goede reis. Enige tijd later stopte Mario met zijn busje, hij verhandelde spullen, die hij uit Frankrijk haalde in Portugal en was bereid me tot Borges mee te nemen. Gelukkig had hij nog een hele fles bronwater en mocht ik naar hartenlust drinken. Ik vertelde hem, dat ik deze reis de rest mijn leven lang zou herinneren.
      In Borges namen we afscheid. Hij gaf me 3 mondmaskers. 2 voor in mijn EHBO kit en 1 om te dragen, hier heb ik letterlijk 1 iemand om een lift gevraagd en toen kwam Antonio op me af om me een lift te schenken in zijn witte Mercedes! Sonja gaf me een hand, terwijl Antonio plaats maakte in de auto, voor
      mij om te zitten. Antonio vroeg me waar ik vandaan kwam en toen ik zei: ’Hollanda’ maakte hij een vreugdekreet ’Hollanda.., Masters of Hardcore!’ Dus onder het genot van Masters of Hardcore reden we in een verticale lijn naar Madrid. Echter moest ik heel nodig plassen en waren we genoodzaakt om een sanitaire stop te maken op een idyllisch plekje langs de snelweg, met witte steentjes, als afscheiding van het parkeerterrein. Ik durfde de twee niet alleen bij de auto te laten, in het geval dat ze ervandoor zouden gaan met mijn tas, dus plaste ik, samen met Antonio, op de witte steentjes. Dit zou ik normaal nooit doen, maar nood breekt wetten.
      Toen we weg wilden rijden hield de ’Guardia Civil’ ons tegen. We waren verdacht van drugshandel, dus eerst mocht Antonio zijn kofferbak leegmaken, en toen was ik aan de beurt. Ik had natuurlijk geen drugs, maar ik moest mijn tas leegmaken en ze namen mijn survival mes in. We kwamen met de schrik vrij en konden onze weg vervolgen naar Madrid. Ik vergat mijn ’Bill Conner’ hoed uit Australië in de witte Mercedes, maar dat kon me niet veel meer bommen, ik was in Madrid! Sonja en Antonio dropte me in het centrum van Madrid en het was nog 2 kilometer lopen naar ’Puerto del Sol’, waar ik eventueel kon slapen. Ik moest door park ’el Retiro’ lopen en ik kan je vertellen: de Spanjaarden hebben het goed bekeken. Het is idyllisch: zwart, wit, man, vrouw, jong, oud. Allemaal door elkaar, in harmonie. 30 graden zon op weg naar ’Puerto del Sol!’ In het tweede hostel waar ik vroeg te verblijven, mocht ik de dag erna betalen.
      Uiteindelijk komt het hier op neer: ik doe mijn stinkende best en het is gelukt.</p>
      <p>
      Teken ik,
      Arthur Ross</p>
      <img src="{{ site.baseurl }}/assets/images/vangogh.jpeg" alt="Boerderij in het koren, Vincent van Gogh" />
      <figcaption>Boerderij in het koren, Vincent van Gogh</figcaption>
      <div id="like-container" style="text-align: center; margin-top: 20px;">
  <button id="like-button" style="padding: 10px 20px; background-color: green; color: white; border: none; border-radius: 5px; cursor: pointer;">
    ❤️ Like
  </button>
  <p id="like-counter" style="font-size: 1.5em; color: white;">Likes: 0</p>
</div>
<div class="comment-section">
    <h2>Comments</h2>
    <!-- Input Area -->
    <div class="comment-input">
        <textarea id="commentInput" placeholder="Write your comment here..." rows="4"></textarea>
        <button id="postComment" onclick="addComment()">Post Comment</button>
    </div>
    <!-- Display Comments -->
    <div id="commentList">
        <!-- Comments will be dynamically added here -->
    </div>
</div>
      <footer>
        <p>&copy; 2024 Arthur Ross. Alle rechten voorbehouden.</p>
      </footer>
      <!-- Back to Gallery button -->
      <div style="text-align: center;">
        <a href='{{ site.baseurl }}../../travelblog.html' class="back-to-gallery">Back to Gallery</a>
      </div>
      <div id="myModal" class="modal" onclick="toggleModal()">
        <div class="modal-content fullscreen-modal">
          <img src="{{ site.baseurl }}/assets/images/eiffel.jpeg" alt="Popup Image" class="modal-image" />
        </div>
      </div>
      <!-- ... Your existing HTML code ... -->
      <script>
        document.addEventListener("DOMContentLoaded", function () {
          const smallImage = document.querySelector("#newText .small-image");
          const modal = document.getElementById('myModal');
          const modalImage = document.querySelector(".modal-image");
          // Function to open modal and show image
          function openModal(event) {
            if (event.target.classList.contains('small-image')) {
              modalImage.src = event.target.src;
              modal.style.display = 'flex';
              modal.classList.add('fade-in');
              modal.style.pointerEvents = 'auto';
            }
          }
          // Event listener to open modal when clicking on small image
          smallImage.addEventListener("click", openModal);
          // Function to close modal
          function closeModal() {
            modal.classList.add('fade-out');
            setTimeout(() => {
              modal.style.display = 'none';
              modal.classList.remove('fade-out', 'fade-in');
              modal.style.pointerEvents = 'none';
            }, 1000);
          }
          // Event listener to close modal when clicking anywhere on it
          modal.addEventListener("click", function (event) {
            if (event.target === modal || event.target === modalImage) {
              closeModal();
            }
          });
          // Automatically show small image and fullscreen image on page load
          setTimeout(function () {
            smallImage.classList.add('show');
            const fullscreenImage = document.querySelector(".fullscreen-image");
            fullscreenImage.classList.add('show');
          }, 500);
          // Back to Gallery button functionality
          const backButton = document.querySelector(".back-to-gallery");
          backButton.addEventListener("click", function () {
            window.location.href = "{{ site.baseurl }}/index/";
          });
          // Close modal when clicking anywhere on fullscreen image
          modalImage.addEventListener("click", closeModal);
        });
        document.addEventListener("DOMContentLoaded", function () {
  const likeButton = document.getElementById("like-button");
  const likeCounter = document.getElementById("like-counter");
  // Generate a unique key for this page using the permalink
  const pageId = "{{ page.permalink }}";
  const likeStateKey = `isLiked_${pageId}`;
  const likeCountKey = `likeCount_${pageId}`;
  // Get the like state and counter from localStorage for this page
  let isLiked = JSON.parse(localStorage.getItem(likeStateKey)) || false;
  let likeCount = parseInt(localStorage.getItem(likeCountKey)) || 0;
  // Update the button and counter UI based on stored values
  updateLikeUI();
  // Add event listener to the like button
  likeButton.addEventListener("click", () => {
    // Toggle the like state
    isLiked = !isLiked;
    // Update the like count based on the new state
    likeCount += isLiked ? 1 : -1;
    // Store the updated state in localStorage
    localStorage.setItem(likeStateKey, JSON.stringify(isLiked));
    localStorage.setItem(likeCountKey, likeCount);
    // Update the UI
    updateLikeUI();
  });
  // Function to update UI elements
  function updateLikeUI() {
    likeButton.textContent = isLiked ? "❤️ Liked" : "❤️ Like";
    likeButton.style.backgroundColor = isLiked ? "red" : "green";
    likeCounter.textContent = `Likes: ${likeCount}`;
  }
});
function addComment() {
        // Get the comment text
        const commentInput = document.getElementById('commentInput');
        const commentText = commentInput.value.trim();
        // Ensure the comment isn't empty
        if (commentText === '') {
            alert('Please enter a comment before posting.');
            return;
        }
        // Create a new comment element
        const commentList = document.getElementById('commentList');
        const newComment = document.createElement('div');
        newComment.classList.add('comment');
        newComment.innerHTML = `<p>${commentText}</p>`;
        // Add the new comment to the list
        commentList.appendChild(newComment);
        // Clear the input field
        commentInput.value = '';
    }
      </script>