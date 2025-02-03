function openModal() {
    document.getElementById("feedback-modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("feedback-modal").style.display = "none";
    document.getElementById('selectedFeedback').value = ''; // Clear feedback selection
    document.getElementById('additionalComments').value = ''; // Clear additional comments
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function submitFeedback() {
    const selectedFeedback = document.getElementById('selectedFeedback').value;
    const additionalComments = document.getElementById('additionalComments').value;

    const formData = new FormData();
    formData.append('selectedFeedback', selectedFeedback);
    formData.append('additionalComments', additionalComments);

    fetch('https://127.0.0.1/api/handle_feedback.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Feedback submitted successfully:', data);
        alert('Feedback submitted successfully!');
        closeModal();
    })
    .catch(error => {
        console.error('Error submitting feedback:', error);
        alert('Error submitting feedback. Please try again later.');
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById('feedback-modal');
    const scrollUpBtn = document.getElementById('scrollUpBtn');

    window.openModal = function () {
        modal.style.display = 'flex';
        modal.classList.add('fade-in');
        modal.style.pointerEvents = 'auto';
    };

    window.closeModal = function () {
        modal.classList.remove('fade-in');
        modal.classList.add('fade-out');
        setTimeout(() => {
            modal.style.display = 'none';
            modal.classList.remove('fade-out');
            modal.style.pointerEvents = 'none';
        }, 1000);
    };

    window.scrollToTop = function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.onscroll = function () {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollUpBtn.style.display = "block";
        } else {
            scrollUpBtn.style.display = "none";
        }
    };
});
