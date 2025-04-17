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
    // Initialize EmailJS
    (function () {
        emailjs.init("oot9xAy6I8e6pMeqw");
    })();

    // Handle form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Show loading state
            const submitButton = this.querySelector('input[type="submit"]');
            const originalButtonText = submitButton.value;
            submitButton.value = 'Sending...';
            submitButton.disabled = true;

            // Collect form data
            const formData = {
                from_name: document.getElementById('full-name').value,
                reply_to: document.getElementById('email').value,
                phone_number: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
            };

            // Validate required fields
            if (!formData.from_name || !formData.reply_to || !formData.message) {
                alert("Please fill out all required fields (Name, Email, and Message).");
                submitButton.value = originalButtonText;
                submitButton.disabled = false;
                return;
            }

            // Send email using EmailJS
            emailjs.send("portfoliosite_7nlmka8", "template_gf75cnl", formData)
                .then(function (response) {
                    console.log("SUCCESS:", response);
                    alert('Message sent successfully!');
                    contactForm.reset(); // Reset form after successful submission
                })
                .catch(function (error) {
                    console.error("ERROR:", error);
                    alert('Failed to send message. Please try again later.');
                })
                .finally(function() {
                    // Reset button state
                    submitButton.value = originalButtonText;
                    submitButton.disabled = false;
                });
        });
    }
});