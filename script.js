// ============================================
// PREDICT - Corporate Premium Website Scripts
// ============================================

// === DOM Elements ===
const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.querySelector('.nav-links');
const particlesContainer = document.getElementById('particles');

// === Navbar Scroll Effect ===
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// === Mobile Menu Toggle ===
if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translateY(8px)' : 'none';
        spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translateY(-8px)' : 'none';
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// === Smooth Scroll ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// === Particles Animation in Hero ===
function createParticles() {
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            animation: float ${duration}s ease-in-out ${delay}s infinite;
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
        }
        25% {
            transform: translate(20px, -30px) scale(1.2);
            opacity: 0.6;
        }
        50% {
            transform: translate(-15px, -60px) scale(0.8);
            opacity: 0.4;
        }
        75% {
            transform: translate(30px, -40px) scale(1.1);
            opacity: 0.5;
        }
    }
`;
document.head.appendChild(style);

// === Intersection Observer for Scroll Animations ===
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all sections and cards
const observeElements = () => {
    const elementsToObserve = [
        '.step',
        '.expertise-card',
        '.presence-item',
        '.about-content',
        '.approach-content',
        '.group-content'
    ];
    
    elementsToObserve.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.classList.add('reveal');
            observer.observe(element);
        });
    });
};

// === Stats Counter Animation ===
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const finalValue = stat.textContent;
        const isPlus = finalValue.includes('+');
        const numericValue = parseInt(finalValue.replace('+', ''));
        let currentValue = 0;
        const increment = numericValue / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= numericValue) {
                stat.textContent = isPlus ? `${numericValue}+` : numericValue;
                clearInterval(timer);
            } else {
                stat.textContent = isPlus ? `${Math.floor(currentValue)}+` : Math.floor(currentValue);
            }
        }, stepTime);
    });
}

// === Parallax Effect for Hero ===
let ticking = false;
function updateParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    const heroBackground = document.querySelector('.hero-background');
    
    if (hero && window.innerWidth > 768) {
        hero.style.transform = `translateY(${scrolled * 0.4}px)`;
        hero.style.opacity = 1 - (scrolled / 800);
    }
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking && window.pageYOffset < 1000) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// === Tech Orbit Animation Enhancement ===
function enhanceTechOrbit() {
    const centerNode = document.querySelector('.center-node');
    if (centerNode) {
        // Add connecting lines
        const orbits = document.querySelectorAll('.orbit');
        orbits.forEach((orbit, index) => {
            orbit.style.animationDelay = `${index * 0.5}s`;
        });
    }
}

// === Value Chain Step Hover Effects ===
function initValueChainEffects() {
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        step.style.animationDelay = `${index * 0.1}s`;
        
        step.addEventListener('mouseenter', () => {
            steps.forEach(s => {
                if (s !== step) {
                    s.style.opacity = '0.5';
                }
            });
        });
        
        step.addEventListener('mouseleave', () => {
            steps.forEach(s => {
                s.style.opacity = '1';
            });
        });
    });
}

// === Expertise Card Interactions ===
function initExpertiseCards() {
    const cards = document.querySelectorAll('.expertise-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
        
        card.addEventListener('click', () => {
            // Future: could open modal or navigate to detail page
            console.log('Card clicked:', card.querySelector('h3').textContent);
        });
    });
}

// === Entity Tags Interactive Effects ===
function initEntityTags() {
    const entities = document.querySelectorAll('.entity');
    entities.forEach((entity, index) => {
        entity.style.animationDelay = `${index * 0.05}s`;
        entity.style.opacity = '0';
        entity.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            entity.style.transition = 'all 0.5s ease';
            entity.style.opacity = '1';
            entity.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

// === Loading Animation ===
function initLoadingAnimation() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
}

// === Performance Monitoring ===
function logPerformance() {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time:', pageLoadTime + 'ms');
    }
}

// === Initialize All Functions ===
document.addEventListener('DOMContentLoaded', () => {
    initLoadingAnimation();
    createParticles();
    observeElements();
    enhanceTechOrbit();
    initValueChainEffects();
    initExpertiseCards();
    
    // Animate stats when they come into view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
    
    // Initialize entity tags with delay
    setTimeout(initEntityTags, 500);
    
    // Log performance
    window.addEventListener('load', logPerformance);
});

// === Resize Handler ===
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalculate positions if needed
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
        }
    }, 250);
});

// === Keyboard Navigation ===
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
});

// === Prefetch Resources ===
function prefetchResources() {
    const links = ['#vision', '#expertise', '#approche', '#groupe'];
    links.forEach(link => {
        const element = document.querySelector(link);
        if (element) {
            // Trigger browser to prefetch section content
            const rect = element.getBoundingClientRect();
        }
    });
}

setTimeout(prefetchResources, 2000);

// === Console Branding ===
console.log('%c PREDICT ', 'background: linear-gradient(135deg, #0A2463 0%, #3E5CDB 100%); color: white; font-size: 20px; padding: 10px; font-weight: bold;');
console.log('%c Anticiper aujourd\'hui. Transformer durablement. ', 'color: #0A2463; font-size: 14px; font-weight: bold;');
