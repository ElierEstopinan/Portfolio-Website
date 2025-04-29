// Projects Swiper - Optimized with responsive breakpoints and lazy loading
document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper(".mySwiper", {
        preloadImages: false,
        lazy: {
            loadPrevNext: true,
            loadPrevNextAmount: 2,
        },
        slidesPerView: 1,
        spaceBetween: 30,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        // Responsive breakpoints for better mobile experience
        breakpoints: {
            // when window width is >= 640px
            640: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 20
            },
            // when window width is >= 992px
            992: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 30
            }
        },
        // Improve performance
        observer: true,
        observeParents: true
    });
});

// Optimized scrolling effect for Navbar using event delegation
document.addEventListener('DOMContentLoaded', function() {
    // Use event delegation for better performance
    document.addEventListener('click', function(e) {
        const target = e.target.closest('.navbar a, .contact, .btn-2, .footer .list a, #scroll-to-top');
        if (target) {
            // Handle scroll to top button
            if (target.id === 'scroll-to-top') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            // Handle navigation links
            if (target.getAttribute('href') && target.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(target.getAttribute('href'));
                if (targetElement) {
                    // Use native smooth scrolling (supported by CSS)
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        }
    });

    // Scroll to top button visibility
    const scrollToTopButton = document.getElementById('scroll-to-top');
    if (scrollToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopButton.classList.add('visible');
            } else {
                scrollToTopButton.classList.remove('visible');
            }
        });
    }
});

// Responsive Navbar - Optimized
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');

    if (mobileMenu && navList) {
        mobileMenu.addEventListener('click', () => {
            navList.classList.toggle('active');
            // Toggle aria-expanded for accessibility
            const expanded = navList.classList.contains('active');
            mobileMenu.setAttribute('aria-expanded', expanded);
        });
    }

    // Add intersection observer for section highlighting
    const sections = document.querySelectorAll('section[id]');
    if (sections.length && 'IntersectionObserver' in window) {
        const navLinks = document.querySelectorAll('.navbar a');

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Remove active class from all links
                    navLinks.forEach(link => link.classList.remove('active'));

                    // Add active class to corresponding link
                    const activeLink = document.querySelector(`.navbar a[href="#${entry.target.id}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        sections.forEach(section => observer.observe(section));
    }

    // Add dark mode toggle functionality
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-theme');
    }

    // Create dark mode toggle button
    const themeToggle = document.createElement('button');
    themeToggle.id = 'theme-toggle';
    themeToggle.innerHTML = '<i class="bx bx-moon"></i>';
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    document.querySelector('.header').appendChild(themeToggle);

    // Update button icon based on current theme
    if (document.body.classList.contains('dark-theme')) {
        themeToggle.innerHTML = '<i class="bx bx-sun"></i>';
    }

    // Add event listener to toggle button
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');

        // Update localStorage
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="bx bx-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="bx bx-moon"></i>';
        }
    });
});

// Typing Title
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];

        // Check if deleting
        if(this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Initial Type Speed
        let typeSpeed = 100;

        if(this.isDeleting) {
            typeSpeed /= 2;
        }

        // If word is complete
        if(!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if(this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const txtElement = document.getElementById('typing-text');
    const words = [
        'IT Supervisor and Support Professional',
        'Aspiring Cloud Engineer',
        'AI & Software Development Enthusiast'
    ];
    const wait = 3000;

    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
}