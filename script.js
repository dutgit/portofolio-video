// Toggle Mobile Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    if(navLinks.classList.contains('active')){
        hamburger.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Typing effect for the hero section
const typingText = document.querySelector('.typing-text');
const words = ['Video Editor', 'Content Creator', 'Visual Storyteller'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    if (!typingText) return;
    
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pause before new word
    }

    setTimeout(type, typeSpeed);
}

// Start typing effect on load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1000);
});

// Scroll Animation with Intersection Observer
const fadeElements = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        }
    });
}, appearOptions);

fadeElements.forEach(element => {
    appearOnScroll.observe(element);
});

// Highlight Active Nav Link on Scroll & Navbar Background
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
    
    // Navbar background on scroll
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(11, 17, 33, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
    } else {
        navbar.style.background = 'rgba(11, 17, 33, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// Form Submission via Formspree (Dihapus karena sekarang menggunakan WhatsApp)

// Cursor Sprinkle Effect
const colors = ['#ea4335', '#fbbc05', '#4285f4', '#34a853']; // Google colors
let throttleTimer;

document.addEventListener('mousemove', (e) => {
    if (throttleTimer) return;
    throttleTimer = setTimeout(() => { throttleTimer = null; }, 20);

    createSprinkle(e.clientX, e.clientY);
});

function createSprinkle(x, y) {
    const sprinkle = document.createElement('div');
    sprinkle.classList.add('sprinkle');
    
    // Random size between 4px and 10px
    const size = Math.random() * 6 + 4;
    sprinkle.style.width = `${size}px`;
    sprinkle.style.height = `${size}px`;
    
    // Random color
    const color = colors[Math.floor(Math.random() * colors.length)];
    sprinkle.style.backgroundColor = color;
    sprinkle.style.color = color;
    
    // Position
    sprinkle.style.left = `${x}px`;
    sprinkle.style.top = `${y}px`;
    
    // Random movement direction
    const tx = (Math.random() - 0.5) * 100;
    const ty = (Math.random() - 0.5) * 100;
    sprinkle.style.setProperty('--tx', `${tx}px`);
    sprinkle.style.setProperty('--ty', `${ty}px`);
    
    // Random duration
    const duration = Math.random() * 0.5 + 0.5;
    sprinkle.style.setProperty('--duration', `${duration}s`);
    
    document.body.appendChild(sprinkle);
    
    setTimeout(() => {
        sprinkle.remove();
    }, duration * 1000);
}

// 3D Tilt Effect Initialization
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".stat-box, .skill-category"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2
    });
}
