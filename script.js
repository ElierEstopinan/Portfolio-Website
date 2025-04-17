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
    // Initialize EmailJS with your public key
    // IMPORTANT: Replace 'YOUR_PUBLIC_KEY' with your actual public key from EmailJS dashboard
    // You can find this at https://dashboard.emailjs.com/admin/account
    (function() {
        // Add a small delay to ensure EmailJS is fully loaded
        setTimeout(function() {
            if (typeof emailjs !== 'undefined') {
                emailjs.init("YOUR_PUBLIC_KEY");
                console.log("EmailJS initialized successfully");
            } else {
                console.error("EmailJS failed to load");
            }
        }, 1000);
    })();
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Show loading state
            const submitButton = this.querySelector('input[type="submit"]');
            submitButton.value = 'Sending...';
            submitButton.disabled = true;

            // Create a simple object with form data
            const formData = {
                from_name: document.getElementById('full-name').value,
                reply_to: document.getElementById('email').value,
                phone_number: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                to_name: "Elier"
            };

            // Check if EmailJS is loaded
            if (typeof emailjs === 'undefined') {
                console.error("EmailJS is not loaded. Please check your internet connection and try again.");
                alert("Unable to send message. Email service is not available. Please try again later or contact directly via email.");
                submitButton.value = 'Send Message';
                submitButton.disabled = false;
                return;
            }

            // IMPORTANT: Replace these with your actual service ID and template ID
            // You can find these at https://dashboard.emailjs.com/admin
            const serviceID = "service_id";  // Replace with your actual service ID
            const templateID = "template_id"; // Replace with your actual template ID

            // Send the email
            emailjs.send(serviceID, templateID, formData)
                .then(function(response) {
                    console.log("SUCCESS:", response);
                    alert('Message sent successfully!');
                    contactForm.reset();
                })
                .catch(function(error) {
                    console.error("ERROR:", error);
                    alert('Failed to send message. Please try again later or contact directly via email.');
                })
                .finally(function() {
                    submitButton.value = 'Send Message';
                    submitButton.disabled = false;
                });
        });
    }
});