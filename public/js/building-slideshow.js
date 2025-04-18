// Building Slideshow Functionality
document.addEventListener('DOMContentLoaded', function() {
  initBuildingSlideshow();
});

function initBuildingSlideshow() {
  const slideshow = document.querySelector('.slideshow-container');
  if (!slideshow) return;

  const slides = slideshow.querySelectorAll('.slideshow-slide');
  const dotsContainer = slideshow.querySelector('.slideshow-dots');
  let currentSlide = 0;
  let slideshowTimer;

  // Create dots navigation
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('slideshow-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.slideshow-dot');

  // Initialize slideshow
  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    
    currentSlide = index;
  }

  function goToSlide(index) {
    // Reset timer when manually changing slides
    clearInterval(slideshowTimer);
    showSlide(index);
    startSlideshow();
  }

  function nextSlide() {
    let nextIndex = currentSlide + 1;
    if (nextIndex >= slides.length) nextIndex = 0;
    showSlide(nextIndex);
  }

  function startSlideshow() {
    // Change slide every 2 seconds (changed from 3 seconds)
    slideshowTimer = setInterval(nextSlide, 2000);
  }

  // Start slideshow initially
  startSlideshow();

  // Pause slideshow on hover
  slideshow.addEventListener('mouseenter', () => clearInterval(slideshowTimer));
  slideshow.addEventListener('mouseleave', startSlideshow);
}