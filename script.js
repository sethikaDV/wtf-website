/* ==========================================================================
   WHAT THE FUCK CLAN - INTERACTIVE GLASS ANIMATION ENGINE
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initInteractiveCanvas();
    initGlassBubbles();
    init3DTiltEffect();
    initCounterAnimation();
    initHeaderScrollEffect();
    initMobileNav();
});

/* --------------------------------------------------------------------------
   1. Interactive Canvas Glass Particle Field
   -------------------------------------------------------------------------- */
function initInteractiveCanvas() {
    const canvas = document.getElementById("glassParticleCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.5 + 0.1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 70; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p) => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
}

/* --------------------------------------------------------------------------
   2. Floating Glass Bubbles Engine
   -------------------------------------------------------------------------- */
function initGlassBubbles() {
    const container = document.getElementById("bubbleContainer");
    if (!container) return;

    const totalBubbles = 22;

    for (let i = 0; i < totalBubbles; i++) {
        spawnBubble(container);
    }
}

function spawnBubble(container) {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    const size = Math.floor(Math.random() * 75) + 25;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    const posX = Math.random() * 100;
    bubble.style.left = `${posX}vw`;

    const duration = Math.random() * 14 + 8;
    const delay = Math.random() * 10;

    bubble.style.animationDuration = `${duration}s`;
    bubble.style.animationDelay = `${delay}s`;

    container.appendChild(bubble);
}

/* --------------------------------------------------------------------------
   3. Interactive 3D Perspective Tilt on Mouse Hover
   -------------------------------------------------------------------------- */
function init3DTiltEffect() {
    const tiltCards = document.querySelectorAll("[data-tilt]");

    tiltCards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
        });
    });
}

/* --------------------------------------------------------------------------
   4. Live Stat Counter Animation Engine
   -------------------------------------------------------------------------- */
function initCounterAnimation() {
    const statValues = document.querySelectorAll(".stat-value");
    let animated = false;

    const animateCounters = () => {
        statValues.forEach((counter) => {
            const target = +counter.getAttribute("data-target");
            const speed = 45;

            const updateCount = () => {
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target;
                }
            };

            updateCount();
        });
    };

    window.addEventListener("scroll", () => {
        const hero = document.getElementById("hero");
        if (!hero) return;

        const pos = hero.getBoundingClientRect().top;
        if (pos < window.innerHeight && !animated) {
            animateCounters();
            animated = true;
        }
    });

    animateCounters();
}

/* --------------------------------------------------------------------------
   5. Dynamic Header Glass Blur on Scroll
   -------------------------------------------------------------------------- */
function initHeaderScrollEffect() {
    const header = document.getElementById("mainHeader");
    if (!header) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
}

/* --------------------------------------------------------------------------
   6. Mobile Navigation Menu Toggle
   -------------------------------------------------------------------------- */
function initMobileNav() {
    const toggleBtn = document.getElementById("mobileToggle");
    const navLinks = document.getElementById("navLinks");

    if (toggleBtn && navLinks) {
        toggleBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });

        document.querySelectorAll(".nav-link").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
            });
        });
    }
}