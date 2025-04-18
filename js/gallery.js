// Simplified Gallery JavaScript

document.addEventListener("DOMContentLoaded", function() {
  // DOM Elements
  const gallerySlides = document.querySelectorAll(".gallery-slide");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dots = document.querySelectorAll(".dot");
  const galleryWrapper = document.querySelector(".gallery-wrapper");
  
  // Exit if no gallery
  if (gallerySlides.length === 0) return;
  
  let currentSlide = 0;
  const slideCount = gallerySlides.length;
  let autoSlideInterval;
  
  // Initialize gallery
  function showSlide(index) {
    // Remove active class from all slides and dots
    gallerySlides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));
    
    // Set current slide and dot as active
    currentSlide = index;
    gallerySlides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  }
  
  // Show the first slide
  showSlide(0);
  
  // Navigation functions
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    showSlide(currentSlide);
    resetAutoSlide();
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    showSlide(currentSlide);
    resetAutoSlide();
  }
  
  // Auto slide functionality
  function startAutoSlide() {
    // Clear any existing intervals first to avoid multiple timers
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
      nextSlide();
    }, 4000); // Change slide every 4 seconds
  }
  
  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }
  
  // Add event listeners
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", prevSlide);
    nextBtn.addEventListener("click", nextSlide);
  }
  
  // Add dot click events
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const slideIndex = Number.parseInt(dot.getAttribute("data-index"));
      showSlide(slideIndex);
      resetAutoSlide();
    });
  });
  
  // Pause auto slide on hover
  if (galleryWrapper) {
    galleryWrapper.addEventListener("mouseenter", () => {
      clearInterval(autoSlideInterval);
    });
    
    galleryWrapper.addEventListener("mouseleave", () => {
      startAutoSlide();
    });
  }
  
  // Add touch & drag navigation
  function addTouchNavigation() {
    if (!galleryWrapper) return;
    
    let startX, moved;
    let currentPosition = 0;
    
    galleryWrapper.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      moved = false;
      clearInterval(autoSlideInterval);
    }, {passive: true});
    
    galleryWrapper.addEventListener('touchmove', () => {
      moved = true;
    }, {passive: true});
    
    galleryWrapper.addEventListener('touchend', (e) => {
      if (!moved) return;
      
      const diffX = startX - e.changedTouches[0].clientX;
      
      if (Math.abs(diffX) > 50) { // Minimum swipe distance
        if (diffX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      
      resetAutoSlide();
    }, {passive: true});
    
    // Add mouse drag support
    let isDragging = false;
    
    galleryWrapper.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      moved = false;
      galleryWrapper.style.cursor = 'grabbing';
    });
    
    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        galleryWrapper.style.cursor = 'grab';
      }
    });
    
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      moved = true;
      e.preventDefault();
    });
    
    galleryWrapper.addEventListener('mouseup', (e) => {
      if (!isDragging || !moved) return;
      
      const diffX = startX - e.clientX;
      
      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      
      isDragging = false;
    });
    
    // Make gallery wrapper look interactive
    galleryWrapper.style.cursor = 'grab';
  }
  
  addTouchNavigation();
  startAutoSlide();
});
