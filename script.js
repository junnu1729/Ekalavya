// Scroll Animations for Cards and Platform/Step Cards
function revealAnimatedCards() {
    const animatedClasses = [
      '.card', '.platform-card', '.step-card'
    ];
    animatedClasses.forEach(selector => {
      document.querySelectorAll(selector).forEach(card => {
        const rect = card.getBoundingClientRect();
        if(rect.top < window.innerHeight - 60) {
          card.classList.add('visible');
        }
      });
    });
  }
  window.addEventListener('scroll', revealAnimatedCards);
  window.addEventListener('DOMContentLoaded', revealAnimatedCards);
  
  // Testimonial Slider
  let tIndex = 0;
  const testimonials = document.querySelectorAll('.testimonial-slider blockquote');
  function showTestimonial(i) {
    testimonials.forEach((b, k) => b.classList.toggle('active', k === i));
  }
  function next() { tIndex = (tIndex + 1) % testimonials.length; showTestimonial(tIndex); }
  function prev() { tIndex = (tIndex - 1 + testimonials.length) % testimonials.length; showTestimonial(tIndex); }
  if(testimonials.length > 1) {
    const slider = document.querySelector('.testimonial-slider');
    ['‹','›'].forEach((txt, idx) => {
      let btn = document.createElement('button');
      btn.textContent = txt;
      btn.className = 'testimonial-nav';
      btn.onclick = idx ? next : prev;
      slider.appendChild(btn);
    });
    showTestimonial(tIndex);
    setInterval(next, 5000);
  } else if(testimonials.length === 1) {
    testimonials[0].classList.add('active');
  }
  
  // Smooth Scroll for Navbar
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
      const t = document.querySelector(this.getAttribute('href'));
      if(t) { e.preventDefault(); t.scrollIntoView({behavior: 'smooth'}); }
    });
  });
  
  // Dynamic greeting in hero section
  const hour = new Date().getHours();
  let greet = 'Welcome!';
  if(hour >= 5 && hour < 12) greet = 'Good Morning!';
  else if(hour >= 12 && hour < 17) greet = 'Good Afternoon!';
  else if(hour >= 17 && hour < 22) greet = 'Good Evening!';
  document.querySelector('.hero h1').textContent = `${greet} The Consistency Platform`;
  