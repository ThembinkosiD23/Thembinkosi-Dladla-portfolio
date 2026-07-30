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

// ============================================
// PROFILE PHOTO ROTATION with Swipe Support
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const photos = document.querySelectorAll('.photo');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevPhoto');
    const nextBtn = document.getElementById('nextPhoto');
    const photoStack = document.getElementById('photoStack');
    
    let currentIndex = 0;
    let intervalId = null;
    const ROTATION_INTERVAL = 900; // 0.9 seconds
    let isTransitioning = false;
    let touchStartX = 0;
    let touchEndX = 0;

    // Function to show a specific photo
    function showPhoto(index) {
        if (isTransitioning) return;
        if (index < 0) index = photos.length - 1;
        if (index >= photos.length) index = 0;
        
        isTransitioning = true;
        
        // Hide all photos
        photos.forEach(photo => photo.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show the selected photo
        if (photos[index]) {
            photos[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        currentIndex = index;
        
        setTimeout(() => {
            isTransitioning = false;
        }, 600);
    }

    // Function to go to the next photo
    function nextPhoto() {
        const nextIndex = (currentIndex + 1) % photos.length;
        showPhoto(nextIndex);
    }

    // Function to go to the previous photo
    function prevPhoto() {
        const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
        showPhoto(prevIndex);
    }

    // Start the rotation
    function startRotation() {
        if (intervalId) {
            clearInterval(intervalId);
        }
        intervalId = setInterval(nextPhoto, ROTATION_INTERVAL);
    }

    // Stop the rotation
    function stopRotation() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    // ===== Click on dots to navigate =====
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopRotation();
            showPhoto(index);
            setTimeout(startRotation, 3000);
        });
    });

    // ===== Next/Prev buttons =====
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            stopRotation();
            nextPhoto();
            setTimeout(startRotation, 3000);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            stopRotation();
            prevPhoto();
            setTimeout(startRotation, 3000);
        });
    }

    // ===== Swipe support =====
    if (photoStack) {
        // Touch events for swipe
        photoStack.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            stopRotation();
        }, { passive: true });

        photoStack.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            setTimeout(startRotation, 3000);
        }, { passive: true });

        // Mouse drag support for desktop
        let isDragging = false;
        let dragStartX = 0;

        photoStack.addEventListener('mousedown', function(e) {
            isDragging = true;
            dragStartX = e.screenX;
            stopRotation();
        });

        photoStack.addEventListener('mouseup', function(e) {
            if (isDragging) {
                const dragEndX = e.screenX;
                const diff = dragStartX - dragEndX;
                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        nextPhoto();
                    } else {
                        prevPhoto();
                    }
                }
                isDragging = false;
                setTimeout(startRotation, 3000);
            }
        });

        photoStack.addEventListener('mouseleave', function() {
            if (isDragging) {
                isDragging = false;
                setTimeout(startRotation, 3000);
            }
        });

        function handleSwipe() {
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextPhoto();
                } else {
                    prevPhoto();
                }
            }
        }
    }

    // ===== Hover pause/resume =====
    if (photoStack) {
        photoStack.addEventListener('mouseenter', stopRotation);
        photoStack.addEventListener('mouseleave', startRotation);
    }

    // ===== Keyboard navigation =====
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            stopRotation();
            nextPhoto();
            setTimeout(startRotation, 3000);
        } else if (e.key === 'ArrowLeft') {
            stopRotation();
            prevPhoto();
            setTimeout(startRotation, 3000);
        }
    });

    // ===== Start the rotation =====
    startRotation();

    // ===== Make functions globally accessible =====
    window.showPhoto = showPhoto;
    window.nextPhoto = nextPhoto;
    window.prevPhoto = prevPhoto;
});