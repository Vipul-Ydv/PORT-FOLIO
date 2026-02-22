/* ==========================================
   VIPUL YADAV - PORTFOLIO SCRIPTS
   Animations & Interactions
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavigation();
    initScrollReveal();
    initSmoothScroll();
    initNavbarScroll();
    initTabs();
    // initGithubGraph(); // Removed feature
    initContactFlyer();
    animateCounters();
});
/* ==========================================
   GITHUB ACTIVITY GRAPH
   ========================================== */
async function initGithubGraph() {
    const grid = document.getElementById('github-grid');
    if (!grid) return;

    // CONFIGURATION: Enter your GitHub Username here
    const USERNAME = 'VIPUL-YDV'; // Default placeholder, replace with yours if different

    // Fallback generator (Sketchy random data)
    const generateRandomData = () => {
        grid.innerHTML = '';
        const totalDays = 52 * 7;
        for (let i = 0; i < totalDays; i++) {
            const cell = document.createElement('div');
            cell.className = 'graph-cell';
            const rand = Math.random();
            let level = 0;
            if (rand > 0.9) level = 4;
            else if (rand > 0.75) level = 3;
            else if (rand > 0.5) level = 2;
            else if (rand > 0.25) level = 1;

            if (level > 0) {
                cell.classList.add(`level-${level}`);
                cell.title = `Activity level: ${level}`;
            }
            grid.appendChild(cell);
        }
    };

    try {
        console.log(`Fetching GitHub data for ${USERNAME}...`);

        // Use local JSON file to avoid CORS/Network issues
        // To update this data, fetch: https://github-contributions-api.jogruber.de/v4/VIPUL-YDV?y=last
        // and save it to js/github-data.json
        const response = await fetch('js/github-data.json');

        if (!response.ok) throw new Error('Failed to fetch local data');

        const data = await response.json();

        if (!data.contributions || data.contributions.length === 0) throw new Error('No data');

        grid.innerHTML = '';

        // We need the last 52 weeks (approx 364 days)
        const contributions = data.contributions;
        const startIndex = Math.max(0, contributions.length - (52 * 7));
        const displayData = contributions.slice(startIndex);

        displayData.forEach(day => {
            const cell = document.createElement('div');
            cell.className = 'graph-cell';

            // Map count/level to our CSS classes
            // The API returns level 0-4 matching GitHub's colors
            if (day.level > 0) {
                cell.classList.add(`level-${day.level}`);
            }

            cell.title = `${day.count} contributions on ${day.date}`;
            grid.appendChild(cell);
        });

        // Calculate total contributions manually from the array
        const totalContributions = displayData.reduce((sum, day) => sum + day.count, 0);

        // Update stats
        const totalStat = document.getElementById('contrib-count');
        if (totalStat) {
            totalStat.setAttribute('data-count', totalContributions);
            totalStat.textContent = totalContributions;
        }

    } catch (error) {
        console.warn('GitHub Graph Error (using fallback):', error);
        generateRandomData();
    }
}


/* ==========================================
   TABS FUNCTIONALITY
   ========================================== */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    if (tabButtons.length === 0) return;

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to clicked button and corresponding panel
            button.classList.add('active');
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.add('active');

                // Trigger reveal animations for cards in the new panel
                const cards = targetPanel.querySelectorAll('.cert-card-new');
                cards.forEach((card, index) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    });
}

/* ==========================================
   NAVIGATION
   ========================================== */
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');

            // Animate hamburger
            if (hamburger) {
                hamburger.classList.toggle('open');
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                if (hamburger) {
                    hamburger.classList.remove('open');
                }
            });
        });
    }
}

/* ==========================================
   SCROLL REVEAL ANIMATIONS
   ========================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.section-header, .about-content, .timeline-item, .project-card, ' +
        '.skill-category, .cert-card, .contrib-card, .contact-card'
    );

    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');

                // Add staggered animation for grid items
                const parent = entry.target.parentElement;
                if (parent) {
                    const siblings = parent.querySelectorAll('.skill-category, .project-card, .contact-card');
                    siblings.forEach((sibling, index) => {
                        sibling.style.transitionDelay = `${index * 0.1}s`;
                    });
                }

                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(element => {
        element.classList.add('reveal-element');
        revealObserver.observe(element);
    });

    // Add CSS for reveal animations
    const style = document.createElement('style');
    style.textContent = `
        .reveal-element {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .reveal-element.revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

/* ==========================================
   SMOOTH SCROLL
   ========================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ==========================================
   NAVBAR SCROLL EFFECT
   ========================================== */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add shadow when scrolled
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(45, 35, 25, 0.08)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();

        lastScroll = currentScroll;
    });
}

/* ==========================================
   ACTIVE NAV LINK HIGHLIGHTER
   ========================================== */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navHeight = document.querySelector('.navbar').offsetHeight;

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.offsetHeight;

        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

/* ==========================================
   TYPING EFFECT (Optional Enhancement)
   ========================================== */
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const text = typingElement.textContent;
    typingElement.textContent = '';

    let charIndex = 0;

    function type() {
        if (charIndex < text.length) {
            typingElement.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        }
    }

    // Start typing after initial animations complete
    setTimeout(type, 1500);
}

/* ==========================================
   PARALLAX SHAPES (Subtle Effect)
   ========================================== */
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 10;
        const xOffset = mouseX * speed;
        const yOffset = mouseY * speed;

        shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
});

/* ==========================================
   PROJECT CARD TILT EFFECT
   ========================================== */
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
});

/* ==========================================
   SKILL CARDS COUNTER ANIMATION
   ========================================== */
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

/* ==========================================
   PRELOADER (Optional)
   ========================================== */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

/* ==========================================
   TEAR-OFF CONTACT FLYER
   ========================================== */
function initContactFlyer() {
    const tabs = document.querySelectorAll('.tear-off-tab');

    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = 'flyer-message';
    document.body.appendChild(messageEl);

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            if (tab.classList.contains('torn')) return;

            e.preventDefault();

            // 1. Trigger tear animation
            tab.classList.add('torn');

            // 2. Get contact info
            const contactInfo = tab.getAttribute('data-contact');
            let copyText = contactInfo;

            // Allow opening links after delay? Or just copy?
            // User requested: "click tab -> tear -> copy clipboard"

            // If it's a link (http), we might want to open it too, but let's prioritize copying 
            // text or justcopying the value.

            // Copy to clipboard
            navigator.clipboard.writeText(copyText).then(() => {
                showFlyerMessage(`Copied: ${copyText}`);
            }).catch(err => {
                showFlyerMessage('Copied to clipboard!'); // Fallback
            });
        });
    });

    function showFlyerMessage(text) {
        messageEl.textContent = text;
        messageEl.classList.add('show');
        setTimeout(() => {
            messageEl.classList.remove('show');
        }, 3000);
    }
}

/* ==========================================
   CERTIFICATE LIGHTBOX
   ========================================== */
function openCertLightbox(cardEl) {
    const img = cardEl.querySelector('.cert-img-wrapper img');
    if (!img) return;

    const lightbox = document.getElementById('cert-lightbox');
    const lightboxImg = document.getElementById('cert-lightbox-img');

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCertLightbox(event) {
    // Only close if clicking the backdrop or the close button, not the image itself
    if (event && event.target && event.target.tagName === 'IMG') return;

    const lightbox = document.getElementById('cert-lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const lightbox = document.getElementById('cert-lightbox');
        if (lightbox && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});
