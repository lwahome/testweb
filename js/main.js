// ============================================================================
// PORTFOLIO WEBSITE - MAIN JAVASCRIPT
// Dark mode toggle, mobile menu, and interactivity
// ============================================================================

// ============================================================================
// DARK MODE TOGGLE
// ============================================================================

const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
}

function enableDarkMode() {
  document.body.classList.add('dark-mode');
  if (themeToggle) {
    themeToggle.textContent = '☀️'; // Sun icon for light mode
  }
  localStorage.setItem('theme', 'dark');
}

function disableDarkMode() {
  document.body.classList.remove('dark-mode');
  if (themeToggle) {
    themeToggle.textContent = '🌙'; // Moon icon for dark mode
  }
  localStorage.setItem('theme', 'light');
}

// Toggle dark mode on button click
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('dark-mode')) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  });
}

// ============================================================================
// MOBILE MENU TOGGLE
// ============================================================================

const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
}

// Close mobile menu when a link is clicked
if (navLinks) {
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('nav')) {
    navToggle?.classList.remove('active');
    navLinks?.classList.remove('active');
  }
});

// ============================================================================
// INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
// ============================================================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-on-scroll');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
  const elementsToObserve = document.querySelectorAll('.project-card, .skill-category, .about-content');
  elementsToObserve.forEach(el => observer.observe(el));
});

// ============================================================================
// FORM VALIDATION & SUBMISSION
// ============================================================================

const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Basic validation
    if (!name || !email || !message) {
      alert('Please fill in all fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Data privacy consent is required before we collect any details
    const consent = document.getElementById('privacy-consent');
    if (consent && !consent.checked) {
      alert('Please tick the box to agree to the Privacy Policy before sending.');
      consent.focus();
      return;
    }
    
    // Disable submit button while processing
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Send the message to Formspree
    fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { 'Accept': 'application/json' }
    })
      .then((response) => {
        if (response.ok) {
          alert('Thank you for your message! I\'ll get back to you soon.');
          contactForm.reset();
        } else {
          alert('Sorry, your message could not be sent. Please try again or reach me on WhatsApp.');
        }
      })
      .catch(() => {
        alert('Sorry, your message could not be sent. Please check your connection or reach me on WhatsApp.');
      })
      .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
  });
}

// ============================================================================
// SMOOTH SCROLL BEHAVIOR (fallback for older browsers)
// ============================================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ============================================================================
// INITIALIZATION
// ============================================================================

// Initialize theme on page load
window.addEventListener('load', initializeTheme);
// Also initialize immediately in case DOM is already loaded
initializeTheme();
