// ============================================
// NAVBAR - Mobile Menu Toggle
// ============================================
const menuBtn = document.getElementById('menuBtn');
const menuItems = document.getElementById('menuItems');

menuBtn.addEventListener('click', () => {
    menuItems.classList.toggle('open');
    // Toggle icon between menu and close
    const isOpen = menuItems.classList.contains('open');
    menuBtn.src = isOpen 
        ? 'assets/icons/close-icon.png' 
        : 'assets/icons/menu-icon.png';
});

// Close menu when clicking a link
document.querySelectorAll('.menu-items a').forEach(link => {
    link.addEventListener('click', () => {
        menuItems.classList.remove('open');
        menuBtn.src = 'assets/icons/menu-icon.png';
    });
});

// ============================================
// CONTACT MODAL
// ============================================
const contactBtn = document.getElementById('contactBtn');
const contactModal = document.getElementById('contactModal');
const modalClose = document.getElementById('modalClose');
const modalBack = document.getElementById('modalBack');

function openModal() {
    contactModal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    contactModal.classList.remove('open');
    document.body.style.overflow = 'auto';
}

contactBtn.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);
modalBack.addEventListener('click', closeModal);

// Close modal when clicking outside
contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) {
        closeModal();
    }
});

// ============================================
// CONTACT FORM - EmailJS Integration
// ============================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('.btn-send');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Using EmailJS (you'll need to sign up at emailjs.com)
    // For now, we'll simulate sending with a timeout
    setTimeout(() => {
        alert('Message sent successfully!');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        closeModal();
    }, 1500);
});

// ============================================
// SMOOTH SCROLL FOR NAV LINKS
// ============================================
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

// ============================================
// INTERSECTION OBSERVER - Animate on Scroll
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
        }
    });
}, observerOptions);

// Observe hero elements
document.querySelectorAll('.hero-content, .hero-image').forEach(el => {
    observer.observe(el);
});

console.log('Portfolio loaded successfully! 🚀');

// ============================================
// INTERSECTION OBSERVER - About Section
// ============================================
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe about items
document.querySelectorAll('.about-item').forEach(item => {
    aboutObserver.observe(item);
});