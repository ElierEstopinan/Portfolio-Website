// Projects Swiper
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    slidesPerGroup: 3,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

// Scrolling effect for Navbar
document.querySelectorAll('.navbar a, .contact').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Responsive Navbar
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav-list');
if (mobileMenu && navList) {
    mobileMenu.addEventListener('click', () => {
        navList.classList.toggle('active');
    });
}

// EmailJS Integration
document.addEventListener('DOMContentLoaded', function () {
    // Check if EmailJS is loaded and initialize it
    function initializeEmailJS() {
        if (typeof emailjs !== 'undefined') {
            try {
                emailjs.init({
                    publicKey: "oot9xAy6I8e6pMeqw"
                });
                console.log("EmailJS initialized successfully");
                return true;
            } catch (error) {
                console.error("Error initializing EmailJS:", error);
                return false;
            }
        } else {
            console.log("EmailJS not loaded yet, will retry in 500ms");
            setTimeout(initializeEmailJS, 500);
            return false;
        }
    }

    // Try to initialize EmailJS
    initializeEmailJS();
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Show loading state
            const submitButton = this.querySelector('input[type="submit"]');
            submitButton.value = 'Sending...';
            submitButton.disabled = true;

            // Collect form data
            const templateParams = {
                to_name: "Elier",
                from_name: document.getElementById('full-name').value,
                reply_to: document.getElementById('email').value,
                phone_number: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Send email using EmailJS with updated syntax
            try {
                console.log("Attempting to send email with EmailJS...");

                // Make sure EmailJS is available
                if (typeof emailjs === 'undefined') {
                    throw new Error("EmailJS is not defined. The library may not be loaded properly.");
                }

                // Use the simpler send method that doesn't require the publicKey parameter again
                emailjs.send("portfoliosite_7nlmka8", "template_gf75cnl", templateParams)
                .then(function(response) {
                    console.log("SUCCESS:", response);
                    alert('Message sent successfully!');
                    contactForm.reset();
                })
                .catch(function(error) {
                    console.error("ERROR:", error);
                    alert('Failed to send message. Please try again later.');
                })
                .finally(function() {
                    submitButton.value = 'Send Message';
                    submitButton.disabled = false;
                });
            } catch (error) {
                console.error("Error sending email:", error);
                alert('Failed to send message: ' + error.message);
                submitButton.value = 'Send Message';
                submitButton.disabled = false;
            }
        });
    }
});