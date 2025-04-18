// Enhanced Animations for School of Eminence

// Detect browser support for advanced animation features
const supportsIntersectionObserver = 'IntersectionObserver' in window;
const supportsRequestAnimationFrame = 'requestAnimationFrame' in window;

// Initialize animation observers
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initParallaxEffects();
  initHoverAnimations();
  initButtonEffects();
  initCounterAnimations();
  initFloatingElements();
  initNavbarEffects();
  initTextAnimations();
});

// Improved scroll animations with Intersection Observer
function initScrollAnimations() {
  if (!supportsIntersectionObserver) {
    // Fallback for older browsers
    simpleScrollAnimation();
    return;
  }
  
  const animationClasses = [
    { selector: '.fade-in', baseClass: 'fade-in', activeClass: 'active' },
    { selector: '.slide-in-left', baseClass: 'slide-in-left', activeClass: 'active' },
    { selector: '.slide-in-right', baseClass: 'slide-in-right', activeClass: 'active' },
    { selector: '.scale-in', baseClass: 'scale-in', activeClass: 'active' },
    { selector: '.rotate-in', baseClass: 'rotate-in', activeClass: 'active' },
    { selector: '.bounce-in', baseClass: 'bounce-in', activeClass: 'active' },
    { selector: '.flip-in', baseClass: 'flip-in', activeClass: 'active' }
  ];
  
  animationClasses.forEach(({selector, activeClass}) => {
    const elements = document.querySelectorAll(selector);
    
    if (elements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Add staggered delay based on element index within its parent
        if (entry.isIntersecting) {
          const element = entry.target;
          const parent = element.parentNode;
          const children = Array.from(parent.children);
          const index = children.indexOf(element);
          
          // Staggered animation delay (more subtle than before)
          element.style.animationDelay = `${index * 0.1}s`;
          element.classList.add(activeClass);
          
          // Once animation is complete, unobserve the element
          setTimeout(() => {
            observer.unobserve(element);
          }, 1000);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -10% 0px'
    });
    
    elements.forEach(element => observer.observe(element));
  });
}

// Fallback for browsers without Intersection Observer
function simpleScrollAnimation() {
  const animateElements = () => {
    const animatedElements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .scale-in, .rotate-in, .bounce-in, .flip-in");
    
    animatedElements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 50) {
        element.classList.add("active");
      }
    });
  };
  
  window.addEventListener("scroll", animateElements);
  animateElements(); // Run once on load
}

// Enhanced parallax effects with performance optimizations
function initParallaxEffects() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  const hero = document.querySelector(".hero");
  
  if (parallaxElements.length === 0 && !hero) return;
  
  let ticking = false;
  let lastScrollY = window.scrollY;
  
  const updateParallax = () => {
    // Hero parallax with depth control
    if (hero) {
      const scrollPosition = window.scrollY;
      const parallaxSpeed = 0.4; // Reduced from 0.5 for smoother effect
      hero.style.backgroundPositionY = `${scrollPosition * parallaxSpeed}px`;
    }
    
    // Custom parallax elements
    parallaxElements.forEach(element => {
      const speed = parseFloat(element.dataset.parallax) || 0.2;
      const yPos = -(lastScrollY * speed);
      
      // Use transform for better performance
      element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
    
    ticking = false;
  };
  
  window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateParallax();
        ticking = false;
      });
      
      ticking = true;
    }
  });
  
  // Initial update
  updateParallax();
}

// Enhanced hover animations
function initHoverAnimations() {
  // Trophy hover with smoother transitions
  const trophies = document.querySelectorAll(".trophy");
  trophies.forEach((trophy) => {
    trophy.addEventListener("mouseenter", () => {
      trophy.style.transform = "scale(1.15) rotate(8deg)";
      trophy.style.color = "var(--secondary-color)";
      trophy.style.transition = "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), color 0.3s ease";
    });

    trophy.addEventListener("mouseleave", () => {
      trophy.style.transform = "scale(1) rotate(0deg)";
      trophy.style.color = "var(--primary-color)";
      trophy.style.transition = "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), color 0.3s ease";
    });
  });
  
  // Add hover effects to nav links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.transform = 'translateY(-2px)';
      link.style.transition = 'transform 0.3s ease';
    });
    
    link.addEventListener('mouseleave', () => {
      link.style.transform = 'translateY(0)';
    });
  });
  
  // Add hover effects to cards
  const cards = document.querySelectorAll('.card, .facility-item, .team-member, .achievement-item');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px)';
      card.style.boxShadow = 'var(--shadow-lg)';
      card.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = 'var(--shadow-md)';
    });
  });
}

// Improved button effects
function initButtonEffects() {
  // Add ripple effect to buttons with performance improvements
  const buttons = document.querySelectorAll(".btn");
  
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Create ripple element
      const ripple = document.createElement("span");
      ripple.classList.add("ripple");
      
      // Set position and scale based on button size
      const size = Math.max(rect.width, rect.height) * 2;
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x - size/2}px`;
      ripple.style.top = `${y - size/2}px`;
      
      // Add to button
      this.appendChild(ripple);
      
      // Remove after animation completes
      setTimeout(() => {
        ripple.remove();
        
        // Handle link navigation after ripple effect
        const href = this.getAttribute('href');
        if (href && href !== '#') {
          window.location.href = href;
        }
      }, 600);
    });
  });
}

// New animated counters with intersection observer
function initCounterAnimations() {
  const counters = document.querySelectorAll('.counter');
  
  if (counters.length === 0) return;
  
  const animateCounter = (counter, target) => {
    const speed = 30; // Lower is faster
    let current = 0;
    const increment = target / speed;
    const updateCount = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCount);
      } else {
        counter.textContent = target;
      }
    };
    updateCount();
  };
  
  if (supportsIntersectionObserver) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-target'));
          animateCounter(counter, target);
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
  } else {
    // Fallback
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      animateCounter(counter, target);
    });
  }
}

// New floating elements animation
function initFloatingElements() {
  const floatingElements = document.querySelectorAll('.floating-shape');
  
  if (floatingElements.length === 0) return;
  
  floatingElements.forEach((element, index) => {
    // Create unique animation for each element
    const moveX = 10 + (index * 5);
    const moveY = 15 + (index * 3);
    const rotation = 5 + (index * 2);
    const duration = 20 + (index * 5);
    const delay = index * 2;
    
    // Apply custom floating animation
    element.style.animation = `float-${index} ${duration}s infinite ease-in-out ${delay}s`;
    
    // Create keyframe animation dynamically
    const keyframes = `
      @keyframes float-${index} {
        0% { transform: translate(0, 0) rotate(0deg); }
        25% { transform: translate(${moveX}px, -${moveY}px) rotate(${rotation}deg); }
        50% { transform: translate(${moveX * 1.2}px, ${moveY * 0.5}px) rotate(${-rotation * 0.7}deg); }
        75% { transform: translate(-${moveX * 0.8}px, ${moveY * 1.2}px) rotate(${rotation * 0.5}deg); }
        100% { transform: translate(0, 0) rotate(0deg); }
      }
    `;
    
    // Add keyframes to document
    const styleSheet = document.createElement('style');
    styleSheet.textContent = keyframes;
    document.head.appendChild(styleSheet);
  });
  
  // Add subtle parallax to floating shapes based on mouse movement
  document.addEventListener('mousemove', e => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    floatingElements.forEach((element, index) => {
      const depth = 0.05 + (index * 0.01);
      const moveX = mouseX * 30 * depth;
      const moveY = mouseY * 30 * depth;
      
      element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });
}

// Enhanced navbar effects
function initNavbarEffects() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;
  
  let lastScrollTop = 0;
  let scrollThreshold = 100;
  let scrollTimeout;
  
  window.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    
    scrollTimeout = setTimeout(() => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Add scroll class when user has scrolled down
      if (scrollTop > scrollThreshold) {
        navbar.classList.add("navbar-scrolled");
      } else {
        navbar.classList.remove("navbar-scrolled");
      }
      
      // Hide/show based on scroll direction with smoother transition
      if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
        // Scrolling down
        navbar.style.transform = "translateY(-100%)";
        navbar.style.opacity = "0";
      } else {
        // Scrolling up
        navbar.style.transform = "translateY(0)";
        navbar.style.opacity = "1";
      }
      
      // Update last scroll position
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, 10); // Short timeout for smoother feel
  });
}

// New text animations
function initTextAnimations() {
  const headings = document.querySelectorAll('h1, h2.animated');
  
  headings.forEach(heading => {
    // Only apply to headings that don't already have animations
    if (heading.classList.contains('active') || 
        heading.classList.contains('fade-in') ||
        heading.classList.contains('slide-in-left') ||
        heading.classList.contains('slide-in-right')) {
      return;
    }
    
    // Get the text content
    const text = heading.textContent;
    heading.textContent = '';
    
    // Create wrapper
    const wrapper = document.createElement('span');
    wrapper.className = 'text-animation-wrapper';
    heading.appendChild(wrapper);
    
    // Add each letter with staggered animation
    [...text].forEach((char, index) => {
      const span = document.createElement('span');
      span.className = 'animated-letter';
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.animationDelay = `${index * 0.05}s`;
      wrapper.appendChild(span);
    });
  });
}

// Add animation to social icons with improved staggering
const socialIcons = document.querySelectorAll(".social-icon");
socialIcons.forEach((icon, index) => {
  icon.style.animationDelay = `${0.7 + (index * 0.1)}s`;
  icon.classList.add("bounce-in");
});

// Add animation to achievement items with improved entrance
const achievementItems = document.querySelectorAll(".achievement-item");
achievementItems.forEach((item, index) => {
  item.style.animationDelay = `${0.3 + (index * 0.15)}s`;
  item.classList.add("fade-in");
});

// Add animation to event cards with better transitions
const eventCards = document.querySelectorAll(".event-card");
eventCards.forEach((card, index) => {
  card.style.animationDelay = `${0.4 + (index * 0.15)}s`;
  card.classList.add("fade-in");
  
  // Add hover effects
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px)';
    card.style.boxShadow = 'var(--shadow-lg)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
    card.style.boxShadow = 'var(--shadow-md)';
  });
});

// Add animation to contact items with improved staggering
const contactItems = document.querySelectorAll(".contact-item");
contactItems.forEach((item, index) => {
  item.style.animationDelay = `${0.5 + (index * 0.15)}s`;
  item.classList.add("slide-in-left");
});

// Add form input animations with smoother transitions
const formInputs = document.querySelectorAll("input, textarea, select");
formInputs.forEach((input) => {
  const inputWrapper = input.parentElement;
  
  // Add focus animation
  input.addEventListener("focus", () => {
    inputWrapper.classList.add("focused");
  });
  
  // Remove focus animation
  input.addEventListener("blur", () => {
    inputWrapper.classList.remove("focused");
    
    // Add or remove filled class
    if (input.value.trim() !== "") {
      inputWrapper.classList.add("filled");
    } else {
      inputWrapper.classList.remove("filled");
    }
  });
  
  // Check initial state
  if (input.value.trim() !== "") {
    inputWrapper.classList.add("filled");
  }
});
