// Navigation Scroll Effect: Adds/removes 'scrolled' class to navbar on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle: Handles hamburger menu for mobile navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Smooth Scroll for Navigation Links
// Scrolls smoothly to section and closes mobile menu if open
const navAnchors = document.querySelectorAll('a[href^="#"]');
navAnchors.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Fade-in sections when they enter viewport using IntersectionObserver
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.1
});
// Observe all sections
const allSections = document.querySelectorAll('section');
allSections.forEach(section => {
    observer.observe(section);
});

// Update active navigation link based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Dark mode toggle accessibility and persistence
const darkModeToggle = document.querySelector('.dark-mode-toggle');
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        darkModeToggle.classList.toggle('active');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
    darkModeToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            darkModeToggle.click();
        }
    });
    // On load, set dark mode if previously chosen
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.classList.add('active');
    }
}

// Hide loader after page load
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('hide');
        setTimeout(() => loader.style.display = 'none', 600);
    }
});

// Contact form success message logic
const contactForm = document.querySelector('.contact-form');
const contactSuccess = document.getElementById('contactSuccess');
if (contactForm && contactSuccess) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        contactSuccess.classList.add('show');
        contactForm.reset();
        setTimeout(() => {
            contactSuccess.classList.remove('show');
        }, 4000);
    });
}
// Accessibility: Ensure all interactive elements are keyboard accessible and have visible focus
// (Focus-visible styles are handled in CSS)

// FAQ Accordion Logic
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(btn => {
    btn.addEventListener('click', function() {
        const expanded = this.getAttribute('aria-expanded') === 'true';
        // Close all
        faqQuestions.forEach(q => q.setAttribute('aria-expanded', 'false'));
        document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
        // Open if not already expanded
        if (!expanded) {
            this.setAttribute('aria-expanded', 'true');
            this.nextElementSibling.style.display = 'block';
        }
    });
});
