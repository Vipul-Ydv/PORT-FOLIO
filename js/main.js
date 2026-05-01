/* ==========================================
   VIPUL YADAV - PORTFOLIO SCRIPTS
   Animations & Interactions
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initScrollReveal();
    initSmoothScroll();
    initNavbarScroll();
    initScrollProgress();
    initBackToTop();
    initTabs();
    initGithubStats();
    initLeetCodeStats();
    initContactFlyer();
    initProjectFilter();
});

/* ==========================================
   DARK MODE
   ========================================== */
function initTheme() {
    const saved = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', saved);

    const btn = document.getElementById('theme-toggle');
    btn?.addEventListener('click', () => {
        const current = document.body.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });
}
/* ==========================================
   SCROLL PROGRESS BAR
   ========================================== */
function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = docHeight > 0 ? `${(scrollTop / docHeight) * 100}%` : '0%';
    }, { passive: true });
}

/* ==========================================
   BACK TO TOP
   ========================================== */
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ==========================================
   PROJECT FILTER
   ========================================== */
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card[data-category]');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            cards.forEach(card => {
                const match = filter === 'all' || card.getAttribute('data-category') === filter;
                card.classList.toggle('hidden', !match);
            });
        });
    });
}

/* ==========================================
   LEETCODE STATS
   ========================================== */
async function initLeetCodeStats() {
    const USERNAME = 'Vipul-Ydv';
    try {
        const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${USERNAME}`);
        if (!res.ok) throw new Error('fetch failed');
        const data = await res.json();

        const set = (id, val) => {
            const el = document.getElementById(id);
            if (el && val !== undefined) el.textContent = val;
        };
        set('lc-total', data.totalSolved);
        set('lc-easy', data.easySolved);
        set('lc-medium', data.mediumSolved);
        set('lc-hard', data.hardSolved);
    } catch {
        ['lc-total','lc-easy','lc-medium','lc-hard'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = 'N/A';
        });
    }
}

/* ==========================================
   GITHUB ACTIVITY - LIVE STATS
   ========================================== */
async function initGithubStats() {
    const USERNAME = 'Vipul-Ydv';
    const grid = document.getElementById('github-grid');
    if (!grid) return;

    // Fetch all data in parallel
    const [profileData, contribData, reposData] = await Promise.allSettled([
        fetch(`https://api.github.com/users/${USERNAME}`).then(r => r.ok ? r.json() : Promise.reject()),
        fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`).then(r => r.ok ? r.json() : Promise.reject()),
        fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=6`).then(r => r.ok ? r.json() : Promise.reject())
    ]);

    // --- 1. Profile Card ---
    if (profileData.status === 'fulfilled') {
        const p = profileData.value;
        const avatar = document.getElementById('gh-avatar');
        const name = document.getElementById('gh-name');
        const bio = document.getElementById('gh-bio');
        const link = document.getElementById('gh-link');
        if (avatar) avatar.src = p.avatar_url;
        if (name) name.textContent = p.name || p.login;
        if (bio) bio.textContent = p.bio || 'Full-Stack Developer';
        if (link) link.href = p.html_url;

        // Stats
        const repos = document.getElementById('gh-repos');
        const followers = document.getElementById('gh-followers');
        const following = document.getElementById('gh-following');
        if (repos) { repos.textContent = p.public_repos; repos.setAttribute('data-count', p.public_repos); }
        if (followers) { followers.textContent = p.followers; followers.setAttribute('data-count', p.followers); }
        if (following) { following.textContent = p.following; following.setAttribute('data-count', p.following); }
        animateCounters();
    }

    // --- 2. Contribution Graph ---
    if (contribData.status === 'fulfilled') {
        const data = contribData.value;
        const contributions = data.contributions || [];
        const totalContribs = data.total?.lastYear || contributions.reduce((s, d) => s + d.count, 0);

        // Update contribution counter
        const contribEl = document.getElementById('gh-contributions');
        if (contribEl) {
            contribEl.textContent = totalContribs;
            contribEl.setAttribute('data-count', totalContribs);
            animateCounters();
        }

        // Render months row
        const monthsRow = document.getElementById('graph-months');
        if (monthsRow && contributions.length > 0) {
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const startDate = new Date(contributions[0].date);
            let lastMonth = -1;
            const monthLabels = [];
            contributions.forEach((day, i) => {
                const d = new Date(day.date);
                if (d.getMonth() !== lastMonth) {
                    lastMonth = d.getMonth();
                    monthLabels.push(months[lastMonth]);
                }
            });
            // Show ~12 evenly spaced month labels
            const uniqueMonths = [...new Set(monthLabels)];
            monthsRow.innerHTML = uniqueMonths.map(m => `<span>${m}</span>`).join('');
        }

        // Render grid (last 52 weeks)
        grid.innerHTML = '';
        const startIndex = Math.max(0, contributions.length - (52 * 7));
        const displayData = contributions.slice(startIndex);
        displayData.forEach(day => {
            const cell = document.createElement('div');
            cell.className = 'graph-cell';
            if (day.level > 0) cell.classList.add(`level-${day.level}`);
            cell.title = `${day.count} contributions on ${day.date}`;
            grid.appendChild(cell);
        });
    } else {
        // Fallback: random data
        grid.innerHTML = '';
        for (let i = 0; i < 52 * 7; i++) {
            const cell = document.createElement('div');
            cell.className = 'graph-cell';
            const rand = Math.random();
            if (rand > 0.9) cell.classList.add('level-4');
            else if (rand > 0.75) cell.classList.add('level-3');
            else if (rand > 0.5) cell.classList.add('level-2');
            else if (rand > 0.25) cell.classList.add('level-1');
            grid.appendChild(cell);
        }
    }

    // --- 3. Top Repos ---
    const reposContainer = document.getElementById('github-repos');
    if (reposData.status === 'fulfilled' && reposContainer) {
        const repos = reposData.value
            .filter(r => !r.fork)
            .slice(0, 4);

        // Language colors
        const langColors = {
            'JavaScript': '#f1e05a', 'Python': '#3572A5', 'HTML': '#e34c26',
            'CSS': '#563d7c', 'TypeScript': '#3178c6', 'Java': '#b07219',
            'C++': '#f34b7d', 'C': '#555555', 'Shell': '#89e051'
        };

        reposContainer.innerHTML = repos.map(r => `
            <a href="${r.html_url}" target="_blank" class="github-repo-card">
                <div class="repo-header">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                    </svg>
                    <span class="repo-name">${r.name}</span>
                </div>
                <p class="repo-desc">${r.description || 'No description'}</p>
                <div class="repo-meta">
                    ${r.language ? `<span class="repo-lang"><span class="lang-dot" style="background:${langColors[r.language] || '#888'}"></span>${r.language}</span>` : ''}
                    <span class="repo-stat">⭐ ${r.stargazers_count}</span>
                    <span class="repo-stat">🍴 ${r.forks_count}</span>
                </div>
            </a>
        `).join('');
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

    // 3. Handle Contact Buttons (Hero & Flyer) via AI
    const contactTriggerBtns = ['hero-contact-btn', 'direct-contact-btn'];
    contactTriggerBtns.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', (e) => {
                // If it's the hero button, let the smooth scroll happen but ALSO trigger AI
                // If it's the direct button, prevent default to avoid jitter
                if (id === 'direct-contact-btn') e.preventDefault();

                if (typeof HIREN !== 'undefined') {
                    const jarvisWindow = document.getElementById('jarvis-window');
                    if (jarvisWindow && !jarvisWindow.classList.contains('active')) {
                        HIREN.toggleChat();
                    }
                    setTimeout(() => {
                        HIREN.startEmailFlow();
                    }, 300);
                }
            });
        }
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
