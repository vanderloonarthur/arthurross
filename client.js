document.addEventListener('DOMContentLoaded', function () {
    // The DOM is now fully loaded and we can safely manipulate it
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

    // Add a more specific accessibility hint for screen readers
    button.setAttribute('aria-label', 'Start the experience');
    button.setAttribute('role', 'button'); // Explicitly define role

    // Optionally, if the user presses "Enter" or "Space", trigger the button click for accessibility
    button.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            enterWebsite();
        }
    });
});
