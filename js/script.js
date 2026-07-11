// ========================
// MENU TOGGLE & RESPONSIVE
// ========================
document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.querySelector('#menu-icon');
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('header nav a');

  if (window.innerWidth <= 768) menuIcon.style.display = "block";
  else menuIcon.style.display = "none";

  menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
  };

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        menuIcon.classList.remove("bx-x");
        navbar.classList.remove("active");
      }
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      menuIcon.classList.remove('bx-x');
      navbar.classList.remove('active');
      menuIcon.style.display = "none";
    } else {
      menuIcon.style.display = "block";
    }
  });

  // ========================
  // DATE & GREETING
  // ========================
  function updateDateGreeting() {
    const dateEl = document.getElementById("date-only");
    const greetingEl = document.getElementById("greeting");
    if (!dateEl || !greetingEl) return;

    const now = new Date();
    const options = { month: 'long', day: 'numeric', weekday: 'long' };
    dateEl.textContent = now.toLocaleDateString('en-US', options).toUpperCase();

    const hour = now.getHours();
    let greetingText = '';
    if (hour < 12) greetingText = 'GOOD MORNING';
    else if (hour < 16) greetingText = 'GOOD AFTERNOON';
    else if (hour < 19) greetingText = 'GOOD EVENING';
    else greetingText = 'GOOD NIGHT';

    greetingEl.innerHTML = '';
    greetingText.split('').forEach((letter, i) => {
      const span = document.createElement('span');
      span.classList.add('letter');

      const floatWrap = document.createElement('span');
      floatWrap.classList.add('float-wrap');
      floatWrap.textContent = letter;

      span.style.animation = `letterBounce 0.6s cubic-bezier(0.25,1.25,0.5,1) forwards`;
      span.style.animationDelay = `${i * 0.08}s`;

      const floatDuration = (1.8 + Math.random() * 1.2).toFixed(2) + 's';
      const floatAmount = (-3 - Math.random() * 4) + 'px';
      floatWrap.style.setProperty('--floatDuration', floatDuration);
      floatWrap.style.setProperty('--floatAmount', floatAmount);
      floatWrap.style.animation = `floatBounce var(--floatDuration) ease-in-out infinite ${i * 0.08}s, gradientWave 6s linear infinite ${i * 0.08}s`;

      span.appendChild(floatWrap);
      greetingEl.appendChild(span);
    });
  }
  updateDateGreeting();
  setInterval(updateDateGreeting, 60000);

  // ========================
  // CONTACT FORMS
  // ========================
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const name = document.getElementById("fullname").value;
      const email = document.getElementById("email").value;
      const mobile = document.getElementById("mobile").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;
      const phoneNumber = "94756136278";
      const url = "https://wa.me/" + phoneNumber + "?text=" +
        "*New Contact Form Submission*%0A%0A" +
        "*Name:* " + name + "%0A" +
        "*Email:* " + email + "%0A" +
        "*Mobile:* " + mobile + "%0A" +
        "*Subject:* " + subject + "%0A" +
        "*Message:* " + message;
      window.open(url, "_blank");
    });
  }

  const emailBtn = document.getElementById("emailBtn");
  if (emailBtn) {
    emailBtn.addEventListener("click", function() {
      const name = document.getElementById("fullname").value;
      const email = document.getElementById("email").value;
      const mobile = document.getElementById("mobile").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;
      const mailto = "mailto:dilshantharinda610@gmail.com" +
        "?subject=" + encodeURIComponent("Contact Form: " + subject) +
        "&body=" + encodeURIComponent(
          "Name: " + name + "\n" +
          "Email: " + email + "\n" +
          "Mobile: " + mobile + "\n\n" +
          "Message: " + message
        );
      window.open(mailto, "_blank");
    });
  }

  const smsBtn = document.getElementById("smsBtn");
  function isMobileDevice() {
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  if (smsBtn && isMobileDevice()) {
    smsBtn.style.display = "inline-block";
    smsBtn.addEventListener("click", function(e) {
      e.preventDefault();
      const name = document.getElementById("fullname").value;
      const email = document.getElementById("email").value;
      const mobile = document.getElementById("mobile").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;
      const phoneNumber = "94756136278";
      const sms = "sms:" + phoneNumber + "?body=" + encodeURIComponent(
        "New Contact Form Submission\n\n" +
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Mobile: " + mobile + "\n" +
        "Subject: " + subject + "\n" +
        "Message: " + message
      );
      window.open(sms, "_blank", "noopener,noreferrer");
    });
  } else if (smsBtn) {
    smsBtn.style.display = "none";
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Prevent links from stopping particles
  document.querySelectorAll(".services-box .btn2").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const url = link.getAttribute("href");
      if (url) window.open(url, "_blank");
    });
  });

  const previewCV = document.getElementById("previewCV");
  if (previewCV) {
    previewCV.addEventListener("click", e => {
      e.preventDefault();
      window.open("images/main-site/INFO/CV.jpg", "_blank");
    });
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // ========================
  // VIDEO AUTOPLAY + SCROLL
  // ========================
  const videos = document.querySelectorAll('.portfolio-box video');
  if (videos.length > 0) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.muted = true;
          video.play().catch(err => console.warn("Autoplay blocked:", err));
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.25 });

    videos.forEach(video => {
      observer.observe(video);
      video.addEventListener('mouseenter', () => {
        video.muted = false;
        video.play().catch(err => console.warn("Play failed:", err));
      });
      video.addEventListener('mouseleave', () => {
        video.muted = true;
        const rect = video.getBoundingClientRect();
        if (!(rect.top >= 0 && rect.bottom <= window.innerHeight)) video.pause();
      });
    });
  }

  // ========================
  // SCROLL ACTIVE NAV
  // ========================
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', () => {
    const top = window.scrollY;
    sections.forEach(sec => {
      const offset = sec.offsetTop - 150;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (top >= offset && top < offset + height) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`header nav a[href*=${id}]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });

    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
  });

  // ========================
  // SCROLL REVEAL + TYPED.JS
  // ========================
  if (typeof ScrollReveal !== "undefined") {
    ScrollReveal({ distance: '80px', duration: 2000, delay: 200 });
    ScrollReveal().reveal('.home-content, .heading, .heading24', { origin: 'top' });
    ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
    ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
    ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });
  }

  if (typeof Typed !== "undefined") {
    new Typed('.multiple-text', {
      strings: ['Web Designer', 'Graphic Designer', 'Gamer', 'VFX Editor', 'YouTuber'],
      typeSpeed: 100, backSpeed: 100, backDelay: 1000, loop: true
    });
    new Typed('.multiple-text2', {
      strings: ['GRAPHIC', 'MARKETING', 'COMMERCIAL', 'VFX', 'VIDEO EDITS', 'SOCIAL MEDIA', 'MUSIC VIDEOS', 'THUMBNAILS', 'WEB', 'GAMING', 'YOUTUBE'],
      typeSpeed: 80, backSpeed: 60, backDelay: 1500, loop: true
    });
  }
  // ========================
  // VANTA CLOUDS BACKGROUND
  // ========================
  window.addEventListener('load', function () {
    VANTA.WAVES({
      el: '#vanta-bg',
      THREE: THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x0,
      shininess: 87.00,
      waveHeight: 30.00,
      waveSpeed: 0.95,
      zoom: 1.47,
      backgroundColor: 0x1b1519
    });
  });

  // ========================
  // 3D ORBIT ANIMATION (PC PERSISTENT + MOBILE POSITIONING)
  // ========================
  const orbitContainer = document.getElementById('interactiveHero');
  const orbitIcons = document.querySelectorAll('.app-icon');

  if (orbitContainer && orbitIcons.length > 0) {
    let currentStep = 0;
    let baseAngle = 0;

    // ── KEEPING YOUR EXACT ORIGINAL DESKTOP VALUES AS THE DEFAULT ──
    let radiusX = 200;
    let radiusY = 200;
    let radiusZ = 120;
    let offsetX = 0;
    let offsetY = -145;

    // ── MOBILE-ONLY SIZING ADDITION ─────────────────────────────────
    function handleResponsiveSizing() {
      if (window.innerWidth <= 768) {
        radiusX = 110;  
        radiusY = 110;  
        radiusZ = 60;   
        offsetX = 0;
        offsetY = -80;  
      } else {
        radiusX = 200;
        radiusY = 200;
        radiusZ = 120;
        offsetX = 0;
        offsetY = -145;
      }
    }
    
    handleResponsiveSizing();
    window.addEventListener('resize', handleResponsiveSizing);
    // ────────────────────────────────────────────────────────────────

    const totalIcons = orbitIcons.length;
    const angleSpread = (2 * Math.PI) / totalIcons;

    // ── AUTO-SPIN SETTINGS ──────────────────────────
    const autoSpinDelay   = 2000;  
    const autoSpinPause   = 1000;  
    // ────────────────────────────────────────────────

    let autoSpinTimer  = null;
    let lastManualTime = 0;

    function scheduleAutoSpin() {
      clearTimeout(autoSpinTimer);
      autoSpinTimer = setTimeout(function tick() {
        const now = Date.now();
        if (now - lastManualTime < autoSpinPause) {
          autoSpinTimer = setTimeout(tick, autoSpinPause - (now - lastManualTime));
          return;
        }
        currentStep -= 1;
        autoSpinTimer = setTimeout(tick, autoSpinDelay);
      }, autoSpinDelay);
    }

    function positionOrbitIcons() {
      const targetAngle = currentStep * angleSpread;
      baseAngle += (targetAngle - baseAngle) * 0.12;

      let lowestYValue = Infinity;
      let topIconElement = null;

      orbitIcons.forEach((icon, index) => {
        const myAngle = baseAngle + (index * angleSpread);

        const x = offsetX + Math.sin(myAngle) * radiusX;
        const y = offsetY + Math.cos(myAngle) * radiusY;
        const z = Math.sin(myAngle + Math.PI / 2) * radiusZ;

        const innerImg = icon.querySelector('img');

        if (y < lowestYValue) {
          lowestYValue = y;
          topIconElement = icon;
        }

        const isMobile = window.innerWidth <= 768;
        const fadeThreshold = offsetY + (isMobile ? 15 : 30);
        const fadeRange = isMobile ? 80 : 140;

        if (y > fadeThreshold) {
          const fadeFactor = Math.min(1, (y - fadeThreshold) / fadeRange);
          icon.style.zIndex = 5;
          innerImg.style.opacity = `${1 - (fadeFactor * 1.0)}`;
          innerImg.style.filter = `blur(${fadeFactor * 2}px) brightness(0.35) grayscale(50%)`;
        } else {
          icon.style.zIndex = 15;
          innerImg.style.opacity = '1';
          if (!icon.matches(':hover')) {
            innerImg.style.filter = '';
          }
        }

        icon.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
      });

      orbitIcons.forEach(icon => {
        if (icon === topIconElement) {
          icon.classList.add('is-top');
        } else {
          icon.classList.remove('is-top');
        }
      });

      requestAnimationFrame(positionOrbitIcons);
    }

    // ── TARGETED FIX APPLIED HERE ──
    // Scroll wheel option is now completely blocked/bypassed on mobile views
    orbitContainer.addEventListener('wheel', (e) => {
      if (window.innerWidth > 768) {
        e.preventDefault();
        lastManualTime = Date.now();
        currentStep += Math.sign(e.deltaY);
        scheduleAutoSpin();
      }
    }, { passive: false });

    // Touch swipe handling now only runs and intercepts swipes on screens wider than mobile devices
    let touchStartY = 0;
    orbitContainer.addEventListener('touchstart', (e) => {
      if (window.innerWidth > 768) {
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    orbitContainer.addEventListener('touchmove', (e) => {
      if (window.innerWidth > 768) {
        const delta = touchStartY - e.touches[0].clientY;
        if (Math.abs(delta) > 10) {
          lastManualTime = Date.now();
          currentStep += Math.sign(delta);
          touchStartY = e.touches[0].clientY;
          scheduleAutoSpin();
        }
      }
    }, { passive: true });
    // ───────────────────────────────

    positionOrbitIcons();
    scheduleAutoSpin(); 
  }

});