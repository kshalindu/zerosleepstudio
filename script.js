document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Dark/Light Mode Toggle Logic
    const body = document.getElementById('body');
    const moonIcon = document.getElementById('moonIcon');
    const sunIcon = document.getElementById('sunIcon');
    const logoImage = document.getElementById('logoImage');

    // Function to set the mode and update icons/logo
    function applyMode(isDarkMode) {
        if (isDarkMode) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'inline-block';
            logoImage.src = 'logo-dark.jpg'; // Assuming logo-light.jpg is for dark mode background
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            moonIcon.style.display = 'inline-block';
            sunIcon.style.display = 'none';
            logoImage.src = 'logo-light.jpg'; // Assuming logo-dark.jpg is for light mode background
        }
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light'); // Save preference
    }

    // Toggle mode function called by button
    window.toggleMode = function() {
        const isCurrentlyDarkMode = body.classList.contains('dark-mode');
        applyMode(!isCurrentlyDarkMode);
    };

    // Initialize mode on page load based on saved preference or default
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyMode(savedTheme === 'dark');
    } else {
        // Default to light mode if no preference saved
        applyMode(body.classList.contains('dark-mode')); // Ensure initial state matches HTML
    }

    // FAQ Section Toggle Logic
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.toggle('active');

            if (isActive) {
                answer.classList.add('show');
                answer.style.maxHeight = answer.scrollHeight + "px"; // Expand to content height
            } else {
                answer.classList.remove('show');
                answer.style.maxHeight = null; // Collapse
            }
        });
    });

    // Simple Form Submission (using Formspree)
    // Replace 'https://formspree.io/f/yourformid' in index.html with your actual Formspree endpoint
    // This is basic; for more complex validation or success messages, you'd expand this.
    // function handleSubmit(event) {
    //     event.preventDefault(); // Prevent default form submission
    //     const form = event.target;
    //     const formData = new FormData(form);

    //     fetch(form.action, {
    //         method: form.method,
    //         body: formData,
    //         headers: {
    //             'Accept': 'application/json'
    //         }
    //     }).then(response => {
    //         if (response.ok) {
    //             alert('Message sent successfully!');
    //             form.reset(); // Clear the form
    //         } else {
    //             response.json().then(data => {
    //                 if (Object.hasOwn(data, 'errors')) {
    //                     alert(data["errors"].map(error => error["message"]).join(", "));
    //                 } else {
    //                     alert('Oops! There was a problem sending your message.');
    //                 }
    //             })
    //         }
    //     }).catch(error => {
    //         console.error('Error:', error);
    //         alert('Oops! There was a network error.');
    //     });
    // }
    // // Attach handleSubmit to the form (if you uncomment the JS function)
    // // document.querySelector('#contact form').addEventListener('submit', handleSubmit);
    // // Note: Your HTML already has onsubmit="handleSubmit(event)" which might conflict if uncommented directly.
    // // For simplicity, keep action="https://formspree.io/f/yourformid" method="POST" on the form.
});
