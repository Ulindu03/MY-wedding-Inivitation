// ===== Wedding Invitation - Main Script =====

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initCountdown();
  initScrollAnimations();
  initNavDots();
  initPetals();
  initFireflies();
  initRSVPForm();
  initMusicToggle();
});

// ===== PRELOADER & ENTRANCE =====
function initPreloader() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('preloader').classList.add('hidden');
    }, 1500);
  });

  const btnOpen = document.getElementById('btn-open-invitation');
  const entranceScreen = document.getElementById('entrance-screen');

  btnOpen.addEventListener('click', () => {
    entranceScreen.classList.add('open');
    document.body.classList.remove('locked');

    // Trigger hero animations with a slight delay as envelope lifts
    document.querySelectorAll('#hero .animate-on-scroll').forEach((el, i) => {
      setTimeout(() => el.classList.add('animated'), i * 150 + 600);
    });
  });
}

// ===== COUNTDOWN TIMER =====
function initCountdown() {
  const weddingDate = new Date('2033-01-10T16:00:00').getTime();
  function update() {
    const now = Date.now();
    const diff = weddingDate - now;
    if (diff <= 0) {
      document.getElementById('countdown').innerHTML = '<div class="countdown-title">The day has arrived! 💒</div>';
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById('countdown-days').textContent = String(d).padStart(2, '0');
    document.getElementById('countdown-hours').textContent = String(h).padStart(2, '0');
    document.getElementById('countdown-minutes').textContent = String(m).padStart(2, '0');
    document.getElementById('countdown-seconds').textContent = String(s).padStart(2, '0');
  }
  update();
  setInterval(update, 1000);
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('animated'), delay);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.animate-on-scroll').forEach((el, i) => {
    const section = el.closest('.section');
    if (section && section.id !== 'hero') {
      el.dataset.delay = (i % 4) * 150;
      observer.observe(el);
    }
  });
}

// ===== NAVIGATION DOTS =====
function initNavDots() {
  const dots = document.querySelectorAll('.nav-dot');
  const sections = document.querySelectorAll('.section');

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const target = document.getElementById(dot.dataset.section);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        dots.forEach(d => d.classList.remove('active'));
        const activeDot = document.querySelector(`.nav-dot[data-section="${entry.target.id}"]`);
        if (activeDot) activeDot.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => sectionObserver.observe(section));
}

// ===== FLOATING PETALS =====
function initPetals() {
  const container = document.getElementById('petals-container');
  const petals = ['🌸', '🌺', '💮', '🏵️', '🌷'];

  function createPetal() {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.textContent = petals[Math.floor(Math.random() * petals.length)];
    petal.style.left = Math.random() * 100 + '%';
    petal.style.fontSize = (0.8 + Math.random() * 0.8) + 'rem';
    petal.style.animationDuration = (6 + Math.random() * 8) + 's';
    petal.style.animationDelay = Math.random() * 2 + 's';
    container.appendChild(petal);
    setTimeout(() => petal.remove(), 16000);
  }

  setInterval(createPetal, 2500);
  for (let i = 0; i < 5; i++) setTimeout(createPetal, i * 500);
}

// ===== FIREFLIES =====
function initFireflies() {
  const container = document.getElementById('fireflies-container');
  for (let i = 0; i < 15; i++) {
    const firefly = document.createElement('div');
    firefly.className = 'firefly';
    firefly.style.left = Math.random() * 100 + '%';
    firefly.style.top = Math.random() * 100 + '%';
    firefly.style.animationDelay = Math.random() * 6 + 's';
    firefly.style.animationDuration = (4 + Math.random() * 4) + 's';
    container.appendChild(firefly);
  }
}

// ===== RSVP FORM =====
function initRSVPForm() {
  const form = document.getElementById('rsvp-form');
  const success = document.getElementById('rsvp-success');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('rsvp-submit');
    btn.innerHTML = '<span class="btn-text">Sending...</span>';
    btn.disabled = true;

    const formData = new FormData(form);
    const name = formData.get('name') || 'Not provided';
    const email = formData.get('email') || 'Not provided';
    const attendance = formData.get('attendance') === 'accept' ? 'Accepts with pleasure 🎉' : 'Declines with regret 😔';
    const guests = formData.get('guests') || '0';
    const dietary = formData.get('dietary') || 'None';
    const message = formData.get('message') || 'No message';

    const waText = `*RSVP Response: Ulindu & Nethmi Wedding*\n\n` +
      `*Name:* ${name}\n` +
      `*Email:* ${email}\n` +
      `*Attending:* ${attendance}\n` +
      `*Number of Guests:* ${guests}\n` +
      `*Dietary Requirements:* ${dietary}\n` +
      `*Message:* ${message}`;

    const waNumber = '94772987904';
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;
    
    window.open(waUrl, '_blank');

    setTimeout(() => {
      form.style.display = 'none';
      success.classList.remove('hidden');
      success.style.animation = 'fadeIn 0.6s ease forwards';
    }, 1200);
  });
}

// ===== MUSIC TOGGLE =====
function initMusicToggle() {
  const btn = document.getElementById('music-toggle');
  let isPlaying = false;

  btn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    btn.classList.toggle('playing', isPlaying);
  });
}
