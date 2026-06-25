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
const scrollProgress = document.getElementById('scrollProgress');

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

    // Scroll Progress Bar Update
    if (scrollProgress) {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + "%";
    }
});

// Glow Card Hover Effect
document.querySelectorAll('.glass').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Floating Orbs / Fireflies Background Canvas
const pCanvas = document.getElementById('particlesCanvas');
if (pCanvas) {
    const pCtx = pCanvas.getContext('2d');
    let particles = [];
    
    function resizeParticles() {
        pCanvas.width = window.innerWidth;
        pCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeParticles);
    resizeParticles();

    class Particle {
        constructor() {
            this.x = Math.random() * pCanvas.width;
            this.y = Math.random() * pCanvas.height;
            this.size = Math.random() * 2 + 0.5; // Ukuran kecil seperti debu bintang
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > pCanvas.width) this.x = 0;
            else if (this.x < 0) this.x = pCanvas.width;
            if (this.y > pCanvas.height) this.y = 0;
            else if (this.y < 0) this.y = pCanvas.height;
        }
        draw() {
            pCtx.fillStyle = `rgba(139, 92, 246, ${this.opacity})`; // Warna ungu bercahaya
            pCtx.beginPath();
            pCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            pCtx.fill();
        }
    }
    
    for (let i = 0; i < 70; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}

// Cursor Speedboat Wake Effect (V-Wake & Engine Foam)
const colors = ['#ea4335', '#fbbc05', '#4285f4', '#34a853']; // Google colors
let throttleTimer;
let prevX = 0;
let prevY = 0;
let lastAngle = 0;
let lastSpeed = 0;
let stopTimer; // Timer untuk mendeteksi kapan kursor berhenti

function handlePointerMove(e) {
    clearTimeout(stopTimer);
    
    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else {
        clientX = e.clientX;
        clientY = e.clientY;
    }

    stopTimer = setTimeout(() => {
        handleCursorStop(clientX, clientY);
    }, 60);

    if (throttleTimer) return;
    throttleTimer = setTimeout(() => { throttleTimer = null; }, 15);

    const x = clientX;
    const y = clientY;

    let dx = x - prevX;
    let dy = y - prevY;
    let speed = Math.sqrt(dx * dx + dy * dy);
    let angle = Math.atan2(dy, dx);
    
    // Supaya saat baru disentuh pertama kali, tidak langsung terpental jauh karena jarak prevX dan X jauh
    if (speed > 300) {
        prevX = x;
        prevY = y;
        return;
    }
    
    if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
        angle = lastAngle;
    } else {
        lastAngle = angle;
    }
    
    lastSpeed = speed; 

    const distance = Math.min(speed * 2 + 20, 100); 

    spawnWaterSplash(x, y, angle + Math.PI, speed * 0.5, 1500, 'engine-wake');

    for (let i = 0; i < 2; i++) {
        spawnWaterSplash(x, y, angle + Math.PI * 0.8, distance * (0.8 + Math.random()*0.4), 1200 + Math.random()*500, 'v-wake');
        spawnWaterSplash(x, y, angle - Math.PI * 0.8, distance * (0.8 + Math.random()*0.4), 1200 + Math.random()*500, 'v-wake');
    }

    prevX = x;
    prevY = y;
}

document.addEventListener('mousemove', handlePointerMove);
document.addEventListener('touchmove', handlePointerMove, {passive: true});

// Efek cipratan saat layar ditap/disentuh pertama kali
document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY;
        prevX = x;
        prevY = y;
        
        // Spawn beberapa cipratan melingkar
        for(let i = 0; i < 5; i++) {
            const randomAngle = Math.random() * Math.PI * 2;
            spawnWaterSplash(x, y, randomAngle, 40 + Math.random()*40, 1000, 'bow');
        }
    }
}, {passive: true});

function handleCursorStop(x, y) {
    if (lastSpeed > 3) {
        const distance = Math.min(lastSpeed * 5 + 50, 180);
        
        // Semburan air ke depan saat berhenti mendadak (seperti cipratan haluan)
        for(let i=0; i<4; i++) {
            setTimeout(() => {
                spawnWaterSplash(x, y, lastAngle + (Math.random()-0.5)*0.2, distance * (0.4 + Math.random()*0.6), 800, 'bow');
            }, i * 20);
        }
        
        lastSpeed = 0; 
    }
}

function spawnWaterSplash(x, y, driftAngle, distance, duration, type) {
    const splash = document.createElement('div');
    splash.classList.add('water-splash');
    
    if (type === 'bow') splash.classList.add('bow-splash');
    if (type === 'engine-wake') splash.classList.add('engine-wake');
    if (type === 'v-wake') splash.classList.add('v-wake');
    
    const color = colors[Math.floor(Math.random() * colors.length)];
    splash.style.setProperty('--color', color);
    
    let startX = x;
    let startY = y;
    
    if (type === 'bow') {
        startX += Math.cos(driftAngle) * 10;
        startY += Math.sin(driftAngle) * 10;
    }
    // Buih mesin berawal sedikit di belakang kursor
    if (type === 'engine-wake') {
        startX += Math.cos(driftAngle) * 5;
        startY += Math.sin(driftAngle) * 5;
    }
    
    splash.style.left = `${startX}px`;
    splash.style.top = `${startY}px`;
    
    const tx = Math.cos(driftAngle) * distance;
    const ty = Math.sin(driftAngle) * distance;
    
    splash.style.setProperty('--tx', `${tx}px`);
    splash.style.setProperty('--ty', `${ty}px`);
    splash.style.setProperty('--anim-duration', `${duration}ms`);
    
    document.body.appendChild(splash);
    
    setTimeout(() => {
        splash.remove();
    }, duration);
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

// Background Music Toggle
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
let isMusicPlaying = false;

if (musicToggle && bgMusic) {
    // Set initial volume
    bgMusic.volume = 0.8; // Diubah ke 80% agar terdengar di speaker HP

    const playMusic = () => {
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                isMusicPlaying = true;
                musicToggle.classList.add('playing');
            }).catch(error => {
                console.log("Autoplay dicegah oleh browser, menunggu interaksi user...");
            });
        }
    };

    // Coba putar otomatis
    playMusic();

    // Jika diblokir, putar saat interaksi pertama
    const initialPlay = () => {
        if (!isMusicPlaying) {
            playMusic();
        }
        document.removeEventListener('click', initialPlay);
        document.removeEventListener('touchstart', initialPlay);
        document.removeEventListener('touchend', initialPlay);
        document.removeEventListener('scroll', initialPlay);
    };
    
    document.addEventListener('click', initialPlay);
    document.addEventListener('touchstart', initialPlay, {passive: true});
    document.addEventListener('touchend', initialPlay, {passive: true});
    document.addEventListener('scroll', initialPlay, {passive: true});

    musicToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Cegah event trigger ke document
        if (isMusicPlaying) {
            bgMusic.pause();
            musicToggle.classList.remove('playing');
            isMusicPlaying = false;
        } else {
            playMusic();
        }
    });
}

// --- Interactive Lanyard & ID Card Physics ---
const canvas = document.getElementById('lanyardCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;
const idCard = document.getElementById('idCard');

if (canvas && idCard) {
    // Canvas Resize
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Setup Physics
    const points = [];
    const numPoints = 10;
    const segmentLength = 20;
    const gravity = 0.6;
    const friction = 0.92;
    const bounce = 0.5;

    let anchorX = window.innerWidth - Math.min(250, window.innerWidth * 0.2); 
    let anchorY = -10; // Slightly above screen

    for (let i = 0; i < numPoints; i++) {
        points.push({
            x: anchorX,
            y: anchorY + i * segmentLength,
            oldX: anchorX,
            oldY: anchorY + i * segmentLength,
            pinned: i === 0
        });
    }

    // Interaction State
    let isDragging = false;
    let dragPoint = null;
    let mouseX = 0;
    let mouseY = 0;
    let mouseOffsetX = 0;
    let mouseOffsetY = 0;
    let currentCardAngle = 0; // Untuk smoothing rotasi kartu

    idCard.addEventListener('mousedown', (e) => {
        isDragging = true;
        dragPoint = points[numPoints - 1]; // Attach to the last point
        
        const rect = idCard.getBoundingClientRect();
        const attachX = rect.left + rect.width / 2;
        const attachY = rect.top;
        
        mouseOffsetX = e.clientX - attachX;
        mouseOffsetY = e.clientY - attachY;
    });

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
        dragPoint = null;
    });

    // Touch Support
    idCard.addEventListener('touchstart', (e) => {
        isDragging = true;
        dragPoint = points[numPoints - 1];
        
        const touch = e.touches[0];
        const rect = idCard.getBoundingClientRect();
        const attachX = rect.left + rect.width / 2;
        const attachY = rect.top;
        
        mouseOffsetX = touch.clientX - attachX;
        mouseOffsetY = touch.clientY - attachY;
    }, {passive: true});

    window.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        mouseX = touch.clientX;
        mouseY = touch.clientY;
    }, {passive: true});

    window.addEventListener('touchend', () => {
        isDragging = false;
        dragPoint = null;
    });

    function updatePhysics() {
        // Responsively update anchor position
        if (window.innerWidth <= 768) {
            anchorX = window.innerWidth - 40; // Di mobile, geser lebih ke kanan (menepi)
        } else {
            anchorX = window.innerWidth - Math.min(250, window.innerWidth * 0.2);
        }
        points[0].x = anchorX;
        points[0].y = anchorY;

        for (let i = 0; i < numPoints; i++) {
            const p = points[i];
            if (p.pinned) continue;

            const vx = (p.x - p.oldX) * friction;
            const vy = (p.y - p.oldY) * friction;

            p.oldX = p.x;
            p.oldY = p.y;

            p.x += vx;
            p.y += vy + gravity;

            // Follow mouse if dragging
            if (isDragging && dragPoint === p) {
                p.x = mouseX - mouseOffsetX;
                p.y = mouseY - mouseOffsetY;
            }

            // Screen Bounds (Optional, keeps rope from going out of bounds)
            if (p.x > window.innerWidth) {
                p.x = window.innerWidth;
                p.oldX = p.x + vx * bounce;
            } else if (p.x < 0) {
                p.x = 0;
                p.oldX = p.x + vx * bounce;
            }
        }

        // Verlet Constraints - Iterasi diperbanyak agar tali lebih kuat dan tidak nge-glitch/putus
        for (let i = 0; i < 35; i++) {
            for (let j = 0; j < numPoints - 1; j++) {
                const p1 = points[j];
                const p2 = points[j + 1];

                const dx = p2.x - p1.x;
                const dy = p2.y - p1.y;
                const distance = Math.max(Math.sqrt(dx * dx + dy * dy), 0.001); // Cegah pembagian dengan 0
                const difference = segmentLength - distance;
                const percent = difference / distance / 2;
                const offsetX = dx * percent;
                const offsetY = dy * percent;

                if (!p1.pinned) {
                    p1.x -= offsetX;
                    p1.y -= offsetY;
                }
                if (!p2.pinned && !(isDragging && dragPoint === p2)) {
                    p2.x += offsetX;
                    p2.y += offsetY;
                }
            }
        }
    }

    function drawLanyard() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Lanyard Rope
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < numPoints; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.strokeStyle = '#6366f1'; 
        ctx.lineWidth = 5;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.stroke();

        // Posisi DOM ID Card
        const lastPoint = points[numPoints - 1];
        const prevPoint = points[numPoints - 2];
        
        // Menghitung rotasi dari tali terakhir
        const dx = lastPoint.x - prevPoint.x;
        const dy = lastPoint.y - prevPoint.y;
        let targetAngle = Math.atan2(dy, dx) - Math.PI / 2; 
        
        // Batasi sudut ekstrem tapi tanpa hard snapping
        if (targetAngle > 1.2) targetAngle = 1.2;
        if (targetAngle < -1.2) targetAngle = -1.2;

        // Smoothly interpolate angle (Lerp) agar ayunan kartu terasa berbobot
        currentCardAngle += (targetAngle - currentCardAngle) * 0.15;

        // Skala kartu menjadi 60% jika di mobile agar tidak menutupi layar
        const scaleCard = window.innerWidth <= 768 ? 0.6 : 1;

        idCard.style.opacity = 1; 
        idCard.style.left = `${lastPoint.x - idCard.offsetWidth / 2}px`;
        idCard.style.top = `${lastPoint.y}px`;
        idCard.style.transform = `rotate(${currentCardAngle}rad) scale(${scaleCard})`;
    }

    function animateLanyard() {
        updatePhysics();
        drawLanyard();
        requestAnimationFrame(animateLanyard);
    }

    animateLanyard();
}
