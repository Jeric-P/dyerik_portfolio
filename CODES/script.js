// ============================================
// LOADING SCREEN
// ============================================
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader-wrapper");
  setTimeout(() => {
    loader.classList.add("hidden");
  }, 1000);
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const navMenu = document.getElementById("navMenu");

// Create mobile menu overlay
const createMenuOverlay = () => {
  const overlay = document.createElement("div");
  overlay.className = "mobile-menu-overlay";
  overlay.id = "mobileMenuOverlay";
  document.body.appendChild(overlay);
  return overlay;
};

let menuOverlay = document.getElementById("mobileMenuOverlay") || createMenuOverlay();

if (mobileMenuToggle) {
  // Toggle menu on button click
  mobileMenuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileMenuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
    menuOverlay.classList.toggle("active");
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  // Close menu when clicking on overlay
  menuOverlay.addEventListener("click", () => {
    mobileMenuToggle.classList.remove("active");
    navMenu.classList.remove("active");
    menuOverlay.classList.remove("active");
    document.body.style.overflow = "";
  });

  // Close menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenuToggle.classList.remove("active");
      navMenu.classList.remove("active");
      menuOverlay.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // Close menu on window resize if screen becomes larger
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      mobileMenuToggle.classList.remove("active");
      navMenu.classList.remove("active");
      menuOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.getElementById("navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// ============================================
// BACK TO TOP BUTTON
// ============================================
const backToTop = document.getElementById("backToTop");

if (backToTop) {
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ============================================
// ANIMATED COUNTER FOR STATS
// ============================================
function animateCounter(element) {
  const target = parseInt(element.getAttribute("data-target"));
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.ceil(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  updateCounter();
}

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================
const revealElements = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");

const revealOnScroll = () => {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;

    if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
      element.classList.add("active");

      // Animate stat numbers when visible
      if (element.classList.contains("stat-card")) {
        const statNumber = element.querySelector(".stat-number");
        if (statNumber && !statNumber.classList.contains("animated")) {
          statNumber.classList.add("animated");
          animateCounter(statNumber);
        }
      }

      // Animate skill progress bars when visible
      if (element.classList.contains("skills-section")) {
        const skillProgress = element.querySelectorAll(".skill-progress");
        skillProgress.forEach((bar) => {
          if (!bar.classList.contains("animated")) {
            bar.classList.add("animated");
            const progress = bar.getAttribute("data-progress");
            bar.style.width = progress + "%";
          }
        });
      }
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// ============================================
// SKILLS TAB SWITCHING
// ============================================
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetTab = button.getAttribute("data-tab");

    // Remove active class from all buttons and contents
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    // Add active class to clicked button and corresponding content
    button.classList.add("active");
    const activeContent = document.getElementById(targetTab);
    if (activeContent) {
      activeContent.classList.add("active");

      // Animate skill bars in the new tab
      const skillProgress = activeContent.querySelectorAll(".skill-progress");
      skillProgress.forEach((bar) => {
        bar.style.width = "0";
        setTimeout(() => {
          const progress = bar.getAttribute("data-progress");
          bar.style.width = progress + "%";
        }, 100);
      });
    }
  });
});

// ============================================
// PORTFOLIO FILTER
// ============================================
const filterButtons = document.querySelectorAll(".filter-btn");
const workCards = document.querySelectorAll(".work-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");

    // Update active button
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // Filter work cards with staggered animation
    workCards.forEach((card, index) => {
      const category = card.getAttribute("data-category");

      if (filter === "all" || category === filter) {
        card.style.display = "block";
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "scale(1)";
        }, index * 100);
      } else {
        card.style.opacity = "0";
        card.style.transform = "scale(0.9)";
        setTimeout(() => {
          card.style.display = "none";
        }, 300);
      }
    });
  });
});

// ============================================
// WORK STATS ANIMATION
// ============================================
const workStats = document.querySelectorAll(".stat-count");

const animateWorkStats = () => {
  workStats.forEach((stat) => {
    const statsSection = stat.closest(".works-stats");
    if (!statsSection) return;

    const sectionTop = statsSection.getBoundingClientRect().top;
    const sectionBottom = statsSection.getBoundingClientRect().bottom;

    if (sectionTop < window.innerHeight - 100 && sectionBottom > 0) {
      if (!stat.classList.contains("animated")) {
        stat.classList.add("animated");
        animateCounter(stat);
      }
    }
  });
};

window.addEventListener("scroll", animateWorkStats);
window.addEventListener("load", animateWorkStats);

// ============================================
// CONTACT FORM VALIDATION AND SUBMISSION
// ============================================
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form elements
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");
    const submitBtn = contactForm.querySelector(".submit-btn");

    // Reset errors
    document.querySelectorAll(".error-message").forEach((error) => {
      error.textContent = "";
    });

    // Validation
    let isValid = true;

    if (nameInput.value.trim().length < 2) {
      showError(nameInput, "Name must be at least 2 characters");
      isValid = false;
    }

    if (!isValidEmail(emailInput.value)) {
      showError(emailInput, "Please enter a valid email address");
      isValid = false;
    }

    if (subjectInput.value.trim().length < 3) {
      showError(subjectInput, "Subject must be at least 3 characters");
      isValid = false;
    }

    if (messageInput.value.trim().length < 10) {
      showError(messageInput, "Message must be at least 10 characters");
      isValid = false;
    }

    if (!isValid) return;

    // Show loading state
    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;

      // Show success message
      contactForm.style.display = "none";
      document.querySelector(".form-success").classList.remove("hidden");

      // Reset form
      contactForm.reset();

      // Hide success message and show form again after 5 seconds
      setTimeout(() => {
        document.querySelector(".form-success").classList.add("hidden");
        contactForm.style.display = "block";
      }, 5000);
    }, 2000);
  });
}

function showError(input, message) {
  const errorElement = input.parentElement.querySelector(".error-message");
  errorElement.textContent = message;
  input.style.borderColor = "#ff6b6b";

  setTimeout(() => {
    input.style.borderColor = "";
  }, 3000);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ============================================
// PARTICLE EFFECT FOR HERO SECTION
// ============================================
const particlesContainer = document.getElementById("particles");

if (particlesContainer) {
  function createParticle() {
    const particle = document.createElement("div");
    particle.style.position = "absolute";
    particle.style.width = Math.random() * 4 + 1 + "px";
    particle.style.height = particle.style.width;
    particle.style.background = "rgba(100, 255, 218, 0.5)";
    particle.style.borderRadius = "50%";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.pointerEvents = "none";
    particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;

    particlesContainer.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 20000);
  }

  // Create particles
  for (let i = 0; i < 50; i++) {
    setTimeout(createParticle, i * 200);
  }

  // Add floating animation
  const style = document.createElement("style");
  style.textContent = `
    @keyframes float {
      0% {
        transform: translate(0, 0) scale(1);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
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

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log("✨ Portfolio website loaded successfully!");
console.log("📱 Fully responsive design active");
console.log("🍔 Mobile menu ready");