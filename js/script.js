// Mobile Navigation Toggle
const menuBtn = document.querySelector('.menuBtn');
const menuItems = document.querySelector('.menuItems');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        menuItems.classList.toggle('open');
    });
}

// Close menu on link click (mobile)
document.querySelectorAll('.menuItems li a').forEach(link => {
    link.addEventListener('click', () => {
        menuItems.classList.remove('open');
    });
});

// Active link highlighting on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.menuItems li a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Language selector
const langSelect = document.querySelector('.langSelect');
if (langSelect) {
    langSelect.addEventListener('change', (e) => {
        console.log(`Language changed to: ${e.target.value}`);
        // Add language switching logic here
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});