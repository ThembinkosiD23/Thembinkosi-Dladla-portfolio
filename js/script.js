// ============================================
// NAVBAR - Mobile Menu Toggle
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar scroll effect
    const navbar = document.getElementById('pb-navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Mobile menu toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('open');
        });
        
        // Close menu when clicking a link
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('open');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navbar && !navbar.contains(e.target) && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
            }
        });
    }

    // ============================================
    // ACTIVE NAV LINK ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 200;
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
    }

    // ============================================
    // TOGGLE SECTIONS - Card Style
    // ============================================
    window.toggleSection = function(contentId, headerElement) {
        const content = document.getElementById(contentId);
        if (!content) return;
        
        const isOpen = content.classList.contains('open');
        
        // Close all other sections
        document.querySelectorAll('.toggle-card-content').forEach(el => {
            if (el.id !== contentId && el.classList.contains('open')) {
                el.classList.remove('open');
                const parentHeader = el.closest('.toggle-card').querySelector('.toggle-card-header');
                if (parentHeader) {
                    parentHeader.classList.remove('active');
                    const statusSpan = parentHeader.querySelector('.toggle-status');
                    if (statusSpan) {
                        statusSpan.textContent = statusSpan.textContent.replace('Hide', 'Show');
                    }
                }
            }
        });
        
        if (isOpen) {
            // Close
            content.classList.remove('open');
            if (headerElement) {
                headerElement.classList.remove('active');
                const statusSpan = headerElement.querySelector('.toggle-status');
                if (statusSpan) {
                    statusSpan.textContent = statusSpan.textContent.replace('Hide', 'Show');
                }
            }
        } else {
            // Open
            content.classList.add('open');
            if (headerElement) {
                headerElement.classList.add('active');
                const statusSpan = headerElement.querySelector('.toggle-status');
                if (statusSpan) {
                    statusSpan.textContent = statusSpan.textContent.replace('Show', 'Hide');
                }
            }
        }
    };

    // ============================================
    // COPY TO CLIPBOARD FUNCTION
    // ============================================
    window.copyToClipboard = function(text, label) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text)
                .then(() => {
                    showToast(`${label} copied to clipboard! ✅`);
                })
                .catch(() => {
                    fallbackCopy(text, label);
                });
        } else {
            fallbackCopy(text, label);
        }
    };

    function fallbackCopy(text, label) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            document.execCommand('copy');
            showToast(`${label} copied to clipboard! ✅`);
        } catch (err) {
            showToast(`Failed to copy ${label}. Please try again.`);
        }
        
        document.body.removeChild(textarea);
    }

    // ============================================
    // TOAST NOTIFICATION
    // ============================================
    function showToast(message) {
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }
        
        const toast = document.createElement('div');
        toast.className = 'toast show';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    // ============================================
    // CONTACT MODAL
    // ============================================
    const contactBtn = document.getElementById('contactBtn');
    const contactModal = document.getElementById('contactModal');
    const modalClose = document.getElementById('modalClose');
    const modalBack = document.getElementById('modalBack');

    function openModal() {
        if (contactModal) {
            contactModal.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        if (contactModal) {
            contactModal.classList.remove('open');
            document.body.style.overflow = 'auto';
        }
    }

    if (contactBtn) {
        contactBtn.addEventListener('click', openModal);
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalBack) {
        modalBack.addEventListener('click', closeModal);
    }

    if (contactModal) {
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) {
                closeModal();
            }
        });
    }

    // ============================================
    // CONTACT FORM
    // ============================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.btn-send');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    showToast('Message sent successfully! ✅');
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    closeModal();
                }, 1500);
            }
        });
    }

    // ============================================
    // SMOOTH SCROLL FOR NAV LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = navbar ? navbar.offsetHeight : 70;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

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

    document.querySelectorAll('.about-item').forEach(item => {
        aboutObserver.observe(item);
    });

    // ============================================
    // INTERSECTION OBSERVER - Experience Section
    // ============================================
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.skill-item').forEach(item => {
        skillObserver.observe(item);
    });

    // ============================================
    // AUTO-SCROLL FOR EXPERIENCE TIMELINE
    // ============================================
    const timeline = document.querySelector('.experience-timeline');
    let scrollInterval = null;
    let isPaused = false;

    function startAutoScroll() {
        if (scrollInterval) return;
        if (!timeline) return;
        
        let direction = 1;
        scrollInterval = setInterval(() => {
            if (!isPaused && timeline) {
                const maxScroll = timeline.scrollHeight - timeline.clientHeight;
                if (maxScroll <= 0) return;
                
                let newScroll = timeline.scrollTop + (direction * 0.3);
                
                if (newScroll >= maxScroll) {
                    direction = -1;
                    newScroll = maxScroll;
                } else if (newScroll <= 0) {
                    direction = 1;
                    newScroll = 0;
                }
                
                timeline.scrollTop = newScroll;
            }
        }, 30);
    }

    function stopAutoScroll() {
        if (scrollInterval) {
            clearInterval(scrollInterval);
            scrollInterval = null;
        }
    }

    if (timeline) {
        startAutoScroll();
        
        timeline.addEventListener('mouseenter', () => {
            isPaused = true;
        });
        
        timeline.addEventListener('mouseleave', () => {
            isPaused = false;
        });
        
        timeline.addEventListener('touchstart', () => {
            isPaused = true;
            stopAutoScroll();
        });
        
        timeline.addEventListener('touchend', () => {
            setTimeout(() => {
                isPaused = false;
                startAutoScroll();
            }, 3000);
        });
    }

    // ============================================
    // PROFILE PHOTO ROTATION
    // ============================================
    const photos = document.querySelectorAll('.photo');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevPhoto');
    const nextBtn = document.getElementById('nextPhoto');
    const photoStack = document.getElementById('photoStack');
    
    let currentIndex = 0;
    let intervalId = null;
    const ROTATION_INTERVAL = 900;
    let isTransitioning = false;
    let touchStartX = 0;
    let touchEndX = 0;

    function showPhoto(index) {
        if (isTransitioning) return;
        if (!photos.length) return;
        if (index < 0) index = photos.length - 1;
        if (index >= photos.length) index = 0;
        
        isTransitioning = true;
        
        photos.forEach(photo => photo.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        if (photos[index]) photos[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
        
        currentIndex = index;
        
        setTimeout(() => {
            isTransitioning = false;
        }, 600);
    }

    function nextPhoto() {
        if (photos.length) {
            showPhoto((currentIndex + 1) % photos.length);
        }
    }

    function prevPhoto() {
        if (photos.length) {
            showPhoto((currentIndex - 1 + photos.length) % photos.length);
        }
    }

    function startRotation() {
        if (intervalId) clearInterval(intervalId);
        if (photos.length <= 1) return;
        intervalId = setInterval(nextPhoto, ROTATION_INTERVAL);
    }

    function stopRotation() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    if (photos.length > 0) {
        // Click on dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                stopRotation();
                showPhoto(index);
                setTimeout(startRotation, 3000);
            });
        });

        // Next/Prev buttons
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

        // Swipe support
        if (photoStack) {
            photoStack.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
                stopRotation();
            }, { passive: true });

            photoStack.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                const diff = touchStartX - touchEndX;
                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        nextPhoto();
                    } else {
                        prevPhoto();
                    }
                }
                setTimeout(startRotation, 3000);
            }, { passive: true });

            // Mouse drag support
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

            // Hover pause
            photoStack.addEventListener('mouseenter', stopRotation);
            photoStack.addEventListener('mouseleave', startRotation);
        }

        // Keyboard navigation
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

        // Start rotation
        startRotation();
    }

    console.log('🚀 Portfolio loaded successfully!');
});