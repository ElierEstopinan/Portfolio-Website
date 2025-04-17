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
                // IMPORTANT: You need to replace this with your ACTUAL public key from EmailJS dashboard
                // Go to https://dashboard.emailjs.com/admin/account
                // Look for "Public Key" - it should look something like "user_aBcDeFgHiJkLmNoPqR"
                // The key "oot9xAy6I8e6pMeqw" is not working because it's invalid
                emailjs.init("YOUR_ACTUAL_PUBLIC_KEY");
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

            // We'll use the form directly with emailjs.sendForm
            // Make sure your form fields have the correct name attributes that match your EmailJS template
            // For example, if your template uses {{from_name}}, the input should have name="from_name"

            // Send email using EmailJS with updated syntax
            try {
                console.log("Attempting to send email with EmailJS...");

                // Make sure EmailJS is available
                if (typeof emailjs === 'undefined') {
                    throw new Error("EmailJS is not defined. The library may not be loaded properly.");
                }

                // IMPORTANT: Replace these with your actual service ID and template ID from EmailJS dashboard
                // You can find these at https://dashboard.emailjs.com/admin
                // Your service ID should look like "service_xxxxxxx"
                // Your template ID should look like "template_xxxxxxx"
                emailjs.sendForm("portfoliosite_7nlmka8", "template_gf75cnl", contactForm)
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