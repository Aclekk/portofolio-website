// =================== ANIMATED BACKGROUND PARTICLES ===================
function createParticles() {
  const background = document.querySelector(".animated-background");
  const particleCount = 50; // Increased from 30

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // Random size between 1-6px (smaller, more elegant)
    const size = Math.random() * 5 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Random horizontal position
    particle.style.left = `${Math.random() * 100}%`;

    // Random animation duration between 20-40s (slower, more premium)
    const duration = Math.random() * 20 + 20;
    particle.style.animationDuration = `${duration}s`;

    // Random delay
    const delay = Math.random() * 15;
    particle.style.animationDelay = `${delay}s`;

    // Random horizontal drift
    const drift = (Math.random() - 0.5) * 300;
    particle.style.setProperty("--drift", `${drift}px`);

    background.appendChild(particle);
  }
}

// Create floating dots network
function createDots() {
  const background = document.querySelector(".animated-background");
  const dotCount = 20;

  for (let i = 0; i < dotCount; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");

    // Random position
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = `${Math.random() * 100}%`;

    // Random animation duration
    const duration = Math.random() * 10 + 10;
    dot.style.animationDuration = `${duration}s`;

    // Random delay
    const delay = Math.random() * 5;
    dot.style.animationDelay = `${delay}s`;

    background.appendChild(dot);
  }
}

// Create shooting stars
function createShootingStars() {
  const background = document.querySelector(".animated-background");

  function addShootingStar() {
    const star = document.createElement("div");
    star.classList.add("shooting-star");

    // Random starting position (top area)
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 30}%`;

    // Random animation duration
    const duration = Math.random() * 2 + 2;
    star.style.animationDuration = `${duration}s`;

    background.appendChild(star);

    // Remove after animation
    setTimeout(() => {
      star.remove();
    }, duration * 1000);
  }

  // Add shooting star every 3-8 seconds
  setInterval(() => {
    if (Math.random() > 0.5) {
      addShootingStar();
    }
  }, 3000);
}

// Create all effects when page loads
window.addEventListener("load", () => {
  createParticles();
  createDots();
  createShootingStars();
});

// =================== FADE IN ANIMATION ON SCROLL ===================
const fadeElements = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const appearOnScroll = new IntersectionObserver(function (
  entries,
  appearOnScroll
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("visible");
      appearOnScroll.unobserve(entry.target);
    }
  });
},
appearOptions);

fadeElements.forEach((element) => {
  appearOnScroll.observe(element);
});

// =================== SMOOTH SCROLL ===================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
