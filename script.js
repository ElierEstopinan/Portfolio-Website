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
        emailjs.init("oot9xAy6I8e6pMeqw"); // Replace with your Public Key
    })();

    // Handle form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent the default form submission

            // Collect form data
            const formData = {
                full_name: document.getElementById('full-name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
            };

            console.log("Form Data Collected:", formData); // Debugging log

            // Send email using EmailJS
            emailjs.send("portfoliosite_7nlmka8", "template_gf75cnl", formData)
                .then(function (response) {
                    alert('Message sent successfully!');
                    console.log("SUCCESS:", response);
                })
                .catch(function (error) {
                    alert('Failed to send message. Please try again later.');
                    console.error("ERROR:", error);
                });
        });
    } else {
        console.error("Contact form not found in the DOM.");
    }
});