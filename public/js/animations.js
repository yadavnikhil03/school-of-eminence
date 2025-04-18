// Animations JavaScript

// Scroll animations
function animateOnScroll() {
  const animatedElements = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .scale-in, .rotate-in")

  animatedElements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top
    const windowHeight = window.innerHeight

    // Add active class when element is in viewport
    if (elementPosition < windowHeight - 100) {
      element.classList.add("active")
    }
  })
}

// Initialize animations on page load
window.addEventListener("load", () => {
  animateOnScroll()
})

// Update animations on scroll
window.addEventListener("scroll", () => {
  animateOnScroll()
})

// Trophy hover animations
const trophies = document.querySelectorAll(".trophy")
trophies.forEach((trophy) => {
  trophy.addEventListener("mouseenter", () => {
    trophy.style.transform = "scale(1.2) rotate(5deg)"
    trophy.style.color = "var(--secondary-color)"
    trophy.style.transition = "transform 0.3s ease, color 0.3s ease"
  })

  trophy.addEventListener("mouseleave", () => {
    trophy.style.transform = "scale(1) rotate(0deg)"
    trophy.style.color = "var(--primary-color)"
  })
})

// Form input animations
const formInputs = document.querySelectorAll("input, textarea, select")
formInputs.forEach((input) => {
  // Add focus class on focus
  input.addEventListener("focus", () => {
    input.parentElement.classList.add("focused")
  })

  // Remove focus class on blur
  input.addEventListener("blur", () => {
    input.parentElement.classList.remove("focused")

    // Add filled class if input has value
    if (input.value.trim() !== "") {
      input.parentElement.classList.add("filled")
    } else {
      input.parentElement.classList.remove("filled")
    }
  })

  // Check if input has value on page load
  if (input.value.trim() !== "") {
    input.parentElement.classList.add("filled")
  }
})

// Navbar scroll animation
const navbar = document.querySelector(".navbar")
let lastScrollTop = 0

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  if (scrollTop > lastScrollTop) {
    // Scrolling down
    navbar.style.transform = "translateY(-100%)"
  } else {
    // Scrolling up
    navbar.style.transform = "translateY(0)"
  }

  // Update last scroll position
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop

  // Show navbar when at top of page
  if (scrollTop <= 50) {
    navbar.style.transform = "translateY(0)"
  }
})

// Parallax effect for hero section
const hero = document.querySelector(".hero")
if (hero) {
  window.addEventListener("scroll", () => {
    const scrollPosition = window.pageYOffset
    hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`
  })
}

// Add animation to social icons
const socialIcons = document.querySelectorAll(".social-icon")
socialIcons.forEach((icon, index) => {
  icon.style.animationDelay = `${index * 0.1}s`
  icon.classList.add("fade-in")
})

// Add animation to achievement items
const achievementItems = document.querySelectorAll(".achievement-item")
achievementItems.forEach((item, index) => {
  item.style.animationDelay = `${index * 0.2}s`
  item.classList.add("fade-in")
})

// Add animation to event cards
const eventCards = document.querySelectorAll(".event-card")
eventCards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.2}s`
  card.classList.add("fade-in")
})

// Add animation to contact items
const contactItems = document.querySelectorAll(".contact-item")
contactItems.forEach((item, index) => {
  item.style.animationDelay = `${index * 0.2}s`
  item.classList.add("fade-in")
})

// Add ripple effect to buttons
const buttons = document.querySelectorAll(".btn")
buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
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
