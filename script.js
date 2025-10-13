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
  // Responsive animation: Animate section fade-in on scroll
  function animateSectionsOnScroll() {
    document.querySelectorAll('section').forEach(sec => {
      const rect = sec.getBoundingClientRect();
      // Only animate if not already shown
      if (!sec.classList.contains('section-visible') && rect.top < window.innerHeight - 80) {
        sec.classList.add('section-visible');
      }
    });
  }

  // Add fade-in to sections via JS-injected CSS (if not already present)
  if (!document.getElementById('sectionAnimStyle')) {
    const style = document.createElement('style');
    style.id = 'sectionAnimStyle';
    style.innerHTML = `
      section {
        opacity: 0;
        transition: opacity 0.7s cubic-bezier(.83,0,.17,1);
        will-change: opacity;
      }
      section.section-visible {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
  }

  window.addEventListener('scroll', animateSectionsOnScroll);
  window.addEventListener('DOMContentLoaded', animateSectionsOnScroll);

  // Responsive floating button that bounces on small screens
  function createBouncyContactBtn() {
    if(window.innerWidth <= 768 && !document.getElementById('bouncyContactBtn')) {
      const btn = document.createElement('button');
      btn.id = 'bouncyContactBtn';
      btn.textContent = 'Contact Us';
      btn.onclick = () => document.querySelector('#contact').scrollIntoView({behavior: 'smooth'});
      btn.style.cssText = `
        position: fixed; right: 18px; bottom: 22px; z-index: 1002;
        background: #455de0; color: #fff; border: none; border-radius: 50px; 
        padding: 15px 26px; box-shadow: 0 4px 18px rgba(22,70,156,0.14);
        font-size: 1.12rem; font-family: inherit; cursor: pointer;
        animation: bouncyBtnAnim 1s ease-in-out infinite alternate;
        outline: none;
        transition: background .16s;
      `;
      btn.onmouseenter = () => btn.style.background = "#45a3e0";
      btn.onmouseleave = () => btn.style.background = "#455de0";
      document.body.appendChild(btn);

      // Add animation keyframes if not already
      if(!document.getElementById('bouncyBtnKF')) {
        const kf = document.createElement('style');
        kf.id = 'bouncyBtnKF';
        kf.innerHTML = `
          @keyframes bouncyBtnAnim {
            0% { transform: translateY(0) scale(1); box-shadow: 0 4px 18px rgba(22,70,156,0.14);}
            25% { transform: translateY(-7px) scale(1.05);}
            45% { transform: translateY(-13px) scale(1.12);}
            65% { transform: translateY(-7px) scale(1.07);}
            100% { transform: translateY(0) scale(1);}
          }
        `;
        document.head.appendChild(kf);
      }
    }
    // Remove the button if screen is enlarged
    if(window.innerWidth > 768) {
      const btn = document.getElementById('bouncyContactBtn');
      if(btn) btn.remove();
    }
  }
  window.addEventListener('DOMContentLoaded', createBouncyContactBtn);
  window.addEventListener('resize', createBouncyContactBtn);

  // Animated floating social links in footer on mobile
  function animateFooterLinks() {
    if(window.innerWidth <= 600) {
      document.querySelectorAll('footer .social-links a').forEach((a,i) => {
        a.style.position = 'relative';
        a.style.animation = `footerFloat 2.4s ease-in-out ${i*0.22}s infinite alternate`;
      });
      // Keyframes
      if(!document.getElementById('footerFloatAnim')) {
        const kf = document.createElement('style');
        kf.id = 'footerFloatAnim';
        kf.innerHTML = `
          @keyframes footerFloat {
            from { top: 0; filter: brightness(1); }
            60% { top: -5px; filter: brightness(1.18);}
            to { top: 0; filter: brightness(1);}
          }
        `;
        document.head.appendChild(kf);
      }
    } else {
      document.querySelectorAll('footer .social-links a').forEach(a => {
        a.style.animation = '';
        a.style.position = '';
        a.style.top = '';
        a.style.filter = '';
      });
    }
  }
  window.addEventListener('DOMContentLoaded', animateFooterLinks);
  window.addEventListener('resize', animateFooterLinks);
