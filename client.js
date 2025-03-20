document.addEventListener('DOMContentLoaded', function () {
    // Select the image, text, button, and audio elements
    var image = document.querySelector('.fullscreen-image');
    var introText = document.querySelector('.intro-text');
    var button = document.getElementById('enter-button');
    var audio = document.getElementById('intro-tune');

    // Ensure the elements exist before proceeding
    if (!image || !introText || !button || !audio) {
        console.error('Missing required DOM elements.');
        return;
    }

    // Function to handle the button click
    var enterWebsite = function () {
        // Play the audio on click (handling autoplay issues)
        audio.play().catch(function (error) {
            console.log('Autoplay failed:', error);
        });

        // Fade out the image over 2 seconds
        image.style.transition = 'opacity 2s'; // Add transition for smooth fade
        image.style.opacity = 0;

        // Fade in the intro text after a 2-second delay to match image fade-out
        setTimeout(function () {
            introText.style.transition = 'opacity 2s'; // Add transition for smooth fade
            introText.style.opacity = 1;
        }, 2000); // Delay in milliseconds (2000ms = 2 seconds)

        // Hide the button after it is clicked
        button.style.display = 'none';
    };

    // Add event listener to the button
    button.addEventListener('click', enterWebsite);

    // Function to handle the tune end event
    audio.addEventListener('ended', function () {
        // Redirect to the travelblog URL after the audio finishes
        window.location.href = '{{ site.baseurl }}/travelblog.html';
    });

    // Ensure button is focusable and accessible
    button.focus();

    // Optionally, add accessibility hint for screen readers
    button.setAttribute('aria-label', 'Enter website');
});
