// Smooth scrolling for navigation links
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

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Active nav link on scroll
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  document.querySelectorAll("nav a").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Animated skill bars on scroll
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progressBars = entry.target.querySelectorAll(".skill-progress");
        progressBars.forEach((bar) => {
          const width = bar.style.width;
          bar.style.width = "0%";
          setTimeout(() => {
            bar.style.width = width;
          }, 100);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const skillsSection = document.querySelector("#skills");
if (skillsSection) {
  skillObserver.observe(skillsSection);
}

// Parallax effect for hero background
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero::before");
  if (hero) {
    document.documentElement.style.setProperty(
      "--scroll",
      scrolled * 0.5 + "px"
    );
  }
});

// Add hover effect to timeline items
document.querySelectorAll(".timeline-item").forEach((item, index) => {
  item.style.animationDelay = `${index * 0.2}s`;
});

// Console easter egg
console.log(
  "%c👋 Hello there!",
  "font-size: 20px; color: #CCDDCF; font-weight: bold;"
);
console.log(
  "%cThanks for checking out my portfolio!",
  "font-size: 14px; color: #9BA6AB;"
);
console.log(
  "%cInterested in working together? Let's connect!",
  "font-size: 14px; color: #4A525A;"
);
