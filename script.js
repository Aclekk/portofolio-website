// =================== CURSOR TRAIL EFFECT ===================
const cursorTrail = [];
const trailLength = 20;

document.addEventListener("mousemove", (e) => {
  const trail = document.createElement("div");
  trail.className = "cursor-trail";
  trail.style.left = e.clientX + "px";
  trail.style.top = e.clientY + "px";
  document.body.appendChild(trail);

  cursorTrail.push(trail);

  if (cursorTrail.length > trailLength) {
    const oldTrail = cursorTrail.shift();
    oldTrail.remove();
  }

  setTimeout(() => {
    trail.style.opacity = "0";
    trail.style.transform = "scale(0)";
  }, 10);

  setTimeout(() => trail.remove(), 600);
});

// =================== ANIMATED BACKGROUND PARTICLES ===================
function createParticles() {
  const background = document.querySelector(".animated-background");
  const particleCount = 60;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    const size = Math.random() * 5 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;

    const duration = Math.random() * 20 + 20;
    particle.style.animationDuration = `${duration}s`;

    const delay = Math.random() * 15;
    particle.style.animationDelay = `${delay}s`;

    const drift = (Math.random() - 0.5) * 300;
    particle.style.setProperty("--drift", `${drift}px`);

    background.appendChild(particle);
  }
}

// =================== FLOATING DOTS NETWORK ===================
function createDots() {
  const background = document.querySelector(".animated-background");
  const dotCount = 25;

  for (let i = 0; i < dotCount; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");

    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = `${Math.random() * 100}%`;

    const duration = Math.random() * 10 + 10;
    dot.style.animationDuration = `${duration}s`;

    const delay = Math.random() * 5;
    dot.style.animationDelay = `${delay}s`;

    background.appendChild(dot);
  }
}

// =================== SHOOTING STARS ===================
function createShootingStars() {
  const background = document.querySelector(".animated-background");

  function addShootingStar() {
    const star = document.createElement("div");
    star.classList.add("shooting-star");

    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 30}%`;

    const duration = Math.random() * 2 + 2;
    star.style.animationDuration = `${duration}s`;

    background.appendChild(star);

    setTimeout(() => star.remove(), duration * 1000);
  }

  setInterval(() => {
    if (Math.random() > 0.5) {
      addShootingStar();
    }
  }, 3000);
}

// =================== 3D TILT EFFECT FOR CARDS ===================
function init3DTilt() {
  const cards = document.querySelectorAll(
    ".project-card, .about-card, .experience-card, .profile-card"
  );

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
    });
  });
}

// =================== MAGNETIC BUTTONS ===================
function initMagneticButtons() {
  const buttons = document.querySelectorAll(".btn, .social-link");

  buttons.forEach((button) => {
    button.addEventListener("mousemove", (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "translate(0, 0)";
    });
  });
}

// =================== PARALLAX SCROLL EFFECT ===================
function initParallaxScroll() {
  const parallaxElements = document.querySelectorAll(
    ".hero-text, .hero-image, .orb"
  );

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;

    parallaxElements.forEach((element, index) => {
      const speed = (index + 1) * 0.2;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// =================== TYPING EFFECT FOR HERO ===================
function initTypingEffect() {
  const subtitle = document.querySelector(".hero-subtitle");
  if (!subtitle) return;

  const text = subtitle.textContent;
  subtitle.textContent = "";
  subtitle.style.opacity = "1";

  let index = 0;
  const cursor = document.createElement("span");
  cursor.className = "typing-cursor";
  cursor.textContent = "|";
  subtitle.appendChild(cursor);

  function type() {
    if (index < text.length) {
      subtitle.textContent = text.substring(0, index + 1);
      subtitle.appendChild(cursor);
      index++;
      setTimeout(type, 100);
    } else {
      cursor.style.animation = "blink 0.7s infinite";
    }
  }

  setTimeout(type, 500);
}

// =================== SMOOTH REVEAL ANIMATIONS ===================
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    ".fade-in, .project-card, .certification-item, .competency-item"
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0) rotateX(0)";
          }, index * 100);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  revealElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(50px) rotateX(-10deg)";
    element.style.transition =
      "all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    revealObserver.observe(element);
  });
}

// =================== SKILL BAR ANIMATION ===================
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress");

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const width = entry.target.style.width;
          entry.target.style.width = "0";
          setTimeout(() => {
            entry.target.style.width = width;
          }, 200);
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillBars.forEach((bar) => skillObserver.observe(bar));
}

// =================== RIPPLE EFFECT ON CLICK ===================
function initRippleEffect() {
  const buttons = document.querySelectorAll(".btn, .social-link, nav a");

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      ripple.className = "ripple";

      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";

      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// =================== FLOATING ANIMATION FOR ICONS ===================
function initFloatingIcons() {
  const icons = document.querySelectorAll(
    ".about-icon, .cert-icon-wrapper, .project-icon"
  );

  icons.forEach((icon, index) => {
    icon.style.animation = `float-icon 3s ease-in-out ${index * 0.2}s infinite`;
  });
}

// =================== GRADIENT ANIMATION ON HOVER ===================
function initGradientAnimation() {
  const cards = document.querySelectorAll(".certification-item, .about-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.background =
        "linear-gradient(135deg, rgba(0, 188, 212, 0.1) 0%, rgba(37, 55, 69, 0.4) 100%)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.background = "";
    });
  });
}

// =================== TEXT GLITCH EFFECT ===================
function initGlitchEffect() {
  const glitchElements = document.querySelectorAll(".section-title");

  glitchElements.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      this.classList.add("glitch");
      setTimeout(() => this.classList.remove("glitch"), 500);
    });
  });
}

// =================== MOBILE MENU TOGGLE ===================
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", () => {
    mobileMenuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.style.overflow = navMenu.classList.contains("active")
      ? "hidden"
      : "";
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenuToggle.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest("nav")) {
      mobileMenuToggle.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

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

// =================== NAVBAR BACKGROUND ON SCROLL ===================
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (window.scrollY > 100) {
    nav.style.background = "rgba(6, 20, 27, 0.95)";
    nav.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.5)";
  } else {
    nav.style.background = "rgba(6, 20, 27, 0.8)";
    nav.style.boxShadow = "none";
  }
});

// =================== INITIALIZE ALL EFFECTS ===================
window.addEventListener("load", () => {
  createParticles();
  createDots();
  createShootingStars();
  init3DTilt();
  initMagneticButtons();
  initParallaxScroll();
  initTypingEffect();
  initScrollReveal();
  animateSkillBars();
  initRippleEffect();
  initFloatingIcons();
  initGradientAnimation();
  initGlitchEffect();

  // Add loaded class to body for entrance animations
  document.body.classList.add("loaded");
});

// =================== PERFORMANCE OPTIMIZATION ===================
let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      // Optimized scroll handlers
      ticking = false;
    });
    ticking = true;
  }
});
