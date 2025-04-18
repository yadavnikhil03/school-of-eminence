document.addEventListener('DOMContentLoaded', function() {
  // Video sound toggle functionality
  const heroVideo = document.getElementById('heroVideo');
  const muteToggle = document.getElementById('muteToggle');
  const volumeIcon = document.getElementById('volumeIcon');
  const heroSection = document.getElementById('home');
  
  if (!heroVideo) return;
  
  // Initialize muted state
  heroVideo.muted = true;
  if (volumeIcon) volumeIcon.className = 'fas fa-volume-mute';
  
  // Track if user has explicitly unmuted
  let userUnmuted = false;
  
  // Handle manual mute toggle
  if (muteToggle) {
    muteToggle.addEventListener('click', function() {
      heroVideo.muted = !heroVideo.muted;
      
      if (heroVideo.muted) {
        volumeIcon.className = 'fas fa-volume-mute';
        userUnmuted = false;
      } else {
        volumeIcon.className = 'fas fa-volume-up';
        userUnmuted = true;
      }
    });
  }
  
  // AUTO-MUTE WHEN SCROLLING AWAY
  if (heroSection) {
    // Create intersection observer to detect when hero section is out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          // When hero section is scrolled out of view
          if (!entry.isIntersecting && !heroVideo.muted) {
            heroVideo.muted = true;
            if (volumeIcon) volumeIcon.className = 'fas fa-volume-mute';
            console.log('Auto-muted video - scrolled away');
          }
        });
      },
      { threshold: 0.2 } // Trigger when less than 20% visible
    );
    
    // Start observing hero section
    observer.observe(heroSection);
    
    // Also mute on scroll events as backup method
    window.addEventListener('scroll', function() {
      const heroRect = heroSection.getBoundingClientRect();
      // If hero section is mostly out of view
      if (heroRect.bottom < 100 || heroRect.top > window.innerHeight - 100) {
        if (!heroVideo.muted) {
          heroVideo.muted = true;
          if (volumeIcon) volumeIcon.className = 'fas fa-volume-mute';
          console.log('Auto-muted video - scroll event');
        }
      }
    }, { passive: true });
  }
  
  // Optional: Show hero content again when hovering
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');
  
  if (hero && heroContent) {
    hero.addEventListener('mousemove', function() {
      heroContent.style.opacity = "1";
      heroContent.style.transform = "translateY(0)";
    });
    
    hero.addEventListener('mouseleave', function() {
      // Only hide if we're past the initial animation
      if (document.timeline.currentTime > 10000) {
        heroContent.style.opacity = "0";
        heroContent.style.transform = "translateY(-30px)";
      }
    });
  }
});