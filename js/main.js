// Main JavaScript File

// DOM Elements
const body = document.body
const themeSwitch = document.getElementById("theme-switch")
const backToTopBtn = document.getElementById("back-to-top")
const header = document.querySelector(".header")
const navToggle = document.getElementById("navToggle")
const navMenu = document.getElementById("navMenu")
const navLinks = document.querySelectorAll(".nav-link")
const contactForm = document.getElementById("contactForm")
const newsletterForm = document.getElementById("newsletterForm")

// Theme Toggle
themeSwitch.addEventListener("change", () => {
  if (themeSwitch.checked) {
    body.setAttribute("data-theme", "dark")
    localStorage.setItem("theme", "dark")
  } else {
    body.removeAttribute("data-theme")
    localStorage.setItem("theme", "light")
  }
})

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme")
if (savedTheme === "dark") {
  themeSwitch.checked = true
  body.setAttribute("data-theme", "dark")
}

// Back to Top Button
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("visible")
  } else {
    backToTopBtn.classList.remove("visible")
  }

  // Header scroll effect
  if (window.scrollY > 50) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }

  // Scroll animations
  animateOnScroll()
})

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Mobile Navigation
navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Active navigation link based on scroll position
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section")
  const scrollPosition = window.scrollY

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        }
      })
    }
  })
})

// Modal Function
function showModal(title, content) {
  const modal = document.createElement("div")
  modal.classList.add("modal")
  modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2>${title}</h2>
            ${content}
        </div>
    `
  document.body.appendChild(modal)

  const closeButton = modal.querySelector(".close-button")
  closeButton.addEventListener("click", () => {
    document.body.removeChild(modal)
  })

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal)
    }
  })
}

// Form Validation
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Reset error messages
    document.querySelectorAll(".form-error").forEach((error) => {
      error.textContent = ""
    })

    let isValid = true

    // Name validation
    const name = document.getElementById("name")
    if (name.value.trim() === "") {
      document.getElementById("nameError").textContent = "Name is required"
      isValid = false
    }

    // Email validation
    const email = document.getElementById("email")
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.value)) {
      document.getElementById("emailError").textContent = "Please enter a valid email"
      isValid = false
    }

    // Phone validation
    const phone = document.getElementById("phone")
    const phoneRegex = /^\d{10}$/
    if (!phoneRegex.test(phone.value.replace(/\D/g, ""))) {
      document.getElementById("phoneError").textContent = "Please enter a valid 10-digit phone number"
      isValid = false
    }

    // Subject validation
    const subject = document.getElementById("subject")
    if (subject.value === "") {
      document.getElementById("subjectError").textContent = "Please select a subject"
      isValid = false
    }

    // Message validation
    const message = document.getElementById("message")
    if (message.value.trim() === "") {
      document.getElementById("messageError").textContent = "Message is required"
      isValid = false
    }

    if (isValid) {
      // Simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]')
      const originalText = submitBtn.textContent

      submitBtn.disabled = true
      submitBtn.textContent = "Sending..."

      setTimeout(() => {
        // Show success message
        showModal("Message Sent!", "<p>Thank you for contacting us. We will get back to you soon!</p>")

        // Reset form
        contactForm.reset()

        // Reset button
        submitBtn.disabled = false
        submitBtn.textContent = originalText
      }, 1500)
    }
  })
}

// Newsletter Form
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const emailInput = newsletterForm.querySelector('input[type="email"]')
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (emailRegex.test(emailInput.value)) {
      // Simulate subscription
      const submitBtn = newsletterForm.querySelector("button")
      const originalHTML = submitBtn.innerHTML

      submitBtn.disabled = true
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'

      setTimeout(() => {
        // Show success message
        alert("Thank you for subscribing to our newsletter!")

        // Reset form
        newsletterForm.reset()

        // Reset button
        submitBtn.disabled = false
        submitBtn.innerHTML = originalHTML
      }, 1000)
    } else {
      alert("Please enter a valid email address")
    }
  })
}

// Scroll Animation Function
function animateOnScroll() {
  const elements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .scale-in, .rotate-in")

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top
    const windowHeight = window.innerHeight

    if (elementPosition < windowHeight - 100) {
      element.classList.add("active")
    }
  })
}

// Initialize animations on page load
window.addEventListener("load", () => {
  animateOnScroll()
})

// Button Ripple Effect
const buttons = document.querySelectorAll(".btn")
buttons.forEach((button) => {
  button.addEventListener("mousedown", function (e) {
    const x = e.clientX - this.getBoundingClientRect().left
    const y = e.clientY - this.getBoundingClientRect().top

    const ripple = document.createElement("span")
    ripple.classList.add("ripple")
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`

    this.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Testimonials Slider
function initTestimonialSlider() {
  const testimonials = document.querySelectorAll('.testimonial-item');
  const dots = document.querySelectorAll('.testimonial-dots .dot');
  const prevBtn = document.querySelector('.prev-testimonial');
  const nextBtn = document.querySelector('.next-testimonial');
  let currentIndex = 0;
  
  function showTestimonial(index) {
    testimonials.forEach(item => item.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    currentIndex = index;
  }
  
  if (dots.length > 0) {
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => showTestimonial(idx));
    });
  }
  
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      let newIndex = currentIndex - 1;
      if (newIndex < 0) newIndex = testimonials.length - 1;
      showTestimonial(newIndex);
    });
    
    nextBtn.addEventListener('click', () => {
      let newIndex = currentIndex + 1;
      if (newIndex >= testimonials.length) newIndex = 0;
      showTestimonial(newIndex);
    });
  }
  
  // Auto-rotate testimonials
  setInterval(() => {
    let newIndex = currentIndex + 1;
    if (newIndex >= testimonials.length) newIndex = 0;
    showTestimonial(newIndex);
  }, 5000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Other initializations
  
  // Init testimonial slider if it exists
  if (document.querySelector('.testimonials-slider')) {
    initTestimonialSlider();
  }
});
