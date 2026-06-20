/* =================================
   KAVIYA A - PORTFOLIO JAVASCRIPT
   ================================= */

// ---- Typed Text Effect ----
const typedEl = document.getElementById('typed');
const roles = [
    'AI & ML Developer',
    'Cybersecurity Enthusiast',
    'Full Stack Developer',
    'Competitive Programmer',
    'B.Tech IT Student'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout;

function typeText() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typedEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 50 : 90;

    if (!isDeleting && charIndex === currentRole.length) {
        speed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400;
    }

    typingTimeout = setTimeout(typeText, speed);
}

// Start typing after a small delay
setTimeout(typeText, 800);


// ---- Sticky Navbar ----
const navbar = document.getElementById('navbar');

function handleNavScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleNavScroll, { passive: true });


// ---- Active Nav Link Highlight ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
        if (scrollPos >= section.offsetTop) {
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

window.addEventListener('scroll', updateActiveLink, { passive: true });


// ---- Hamburger Menu ----
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinksEl.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (navLinksEl.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
});

// Close nav on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinksEl.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(s => {
            s.style.transform = '';
            s.style.opacity = '';
        });
    });
});


// ---- Scroll Reveal Animation ----
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));


// ---- Animated Counters (for stat numbers) ----
const statNumbers = document.querySelectorAll('.stat-number');
let countersStarted = false;

function animateCounter(el) {
    const target = parseFloat(el.textContent.replace('+', '').replace('k', ''));
    const isFloat = el.textContent.includes('.');
    const suffix = el.textContent.includes('+') ? '+' : '';
    const duration = 1800;
    const start = performance.now();

    function update(timestamp) {
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * target;

        el.textContent = (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = (isFloat ? target.toFixed(1) : target) + suffix;
        }
    }

    requestAnimationFrame(update);
}

const aboutSection = document.getElementById('about');
if (aboutSection) {
    const counterObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !countersStarted) {
            countersStarted = true;
            statNumbers.forEach(el => animateCounter(el));
        }
    }, { threshold: 0.5 });
    counterObserver.observe(aboutSection);
}


// ---- Smooth hover tilt on Project Cards ----
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotateX = ((y - cy) / cy) * -5;
        const rotateY = ((x - cx) / cx) * 5;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});


// ---- Particle Background Effect ----
function createParticles() {
    const hero = document.getElementById('hero');
    if (!hero) return;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(99, 102, 241, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particle-float ${Math.random() * 10 + 8}s ease-in-out infinite;
            animation-delay: ${Math.random() * -10}s;
            pointer-events: none;
            z-index: 0;
        `;
        hero.appendChild(particle);
    }

    // Inject keyframes for particle animation
    if (!document.getElementById('particle-style')) {
        const style = document.createElement('style');
        style.id = 'particle-style';
        style.textContent = `
            @keyframes particle-float {
                0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
                25% { transform: translate(${Math.random() * 60 - 30}px, -${Math.random() * 60 + 20}px) scale(1.2); opacity: 0.8; }
                50% { transform: translate(${Math.random() * 60 - 30}px, -${Math.random() * 30}px) scale(0.8); opacity: 0.3; }
                75% { transform: translate(${Math.random() * 60 - 30}px, -${Math.random() * 60 + 10}px) scale(1.1); opacity: 0.6; }
            }
        `;
        document.head.appendChild(style);
    }
}

createParticles();


// ---- Chip hover sparkle effect ----
const chips = document.querySelectorAll('.chip');
chips.forEach(chip => {
    chip.addEventListener('mouseenter', () => {
        chip.style.boxShadow = '0 0 15px rgba(99, 102, 241, 0.4)';
    });
    chip.addEventListener('mouseleave', () => {
        chip.style.boxShadow = '';
    });
});

// ---- Console easter egg ----
console.log('%c👋 Hey there, developer!', 'color: #6366f1; font-size: 1.2rem; font-weight: bold;');
console.log('%cYou found the portfolio source. Feel free to reach out at kaviya2006.official@gmail.com', 'color: #94a3b8;');
