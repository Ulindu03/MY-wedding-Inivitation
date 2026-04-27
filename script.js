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
    const isAttending = formData.get('attendance') === 'accept';
    const attendance = isAttending ? 'Accepts with pleasure 🎉' : 'Declines with regret 😔';
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
    // Use deep link to bypass the intermediate web page
    const waUrl = `whatsapp://send?phone=${waNumber}&text=${encodeURIComponent(waText)}`;
    
    // Attempt to open the WhatsApp app directly
    window.location.href = waUrl;

    let emailSubject = '';
    let emailBody = '';

    if (isAttending) {
      emailSubject = "Wedding Invitation Confirmation - Ulindu & Nethmi";
      emailBody = `
        <div style="font-family: 'Montserrat', sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
          <div style="background-color: #fce4ec; padding: 30px; text-align: center;">
            <h1 style="color: #880e4f; margin: 0; font-size: 32px; font-family: 'Great Vibes', cursive;">Ulindu & Nethmi</h1>
            <p style="color: #c2185b; font-size: 16px; margin-top: 5px;">Wedding Invitation Confirmation</p>
          </div>
          <div style="padding: 30px; background-color: #ffffff; text-align: center;">
            <h2 style="color: #333333; font-size: 24px; margin-bottom: 15px;">Thank You, ${name}! 🌸</h2>
            <p style="color: #666666; font-size: 16px; line-height: 1.6;">We are absolutely thrilled that you will be joining us to celebrate our special day.</p>
            <p style="color: #666666; font-size: 16px; line-height: 1.6;">Your RSVP for <strong>${guests} guest(s)</strong> has been successfully received.</p>
            <hr style="border: none; border-top: 1px solid #eeeeee; margin: 25px 0;">
            <h3 style="color: #880e4f; font-size: 18px; margin-bottom: 10px;">Event Details</h3>
            <p style="color: #555555; font-size: 15px; margin: 5px 0;"><strong>Date:</strong> January 10, 2033</p>
            <p style="color: #555555; font-size: 15px; margin: 5px 0;"><strong>Time:</strong> 4:00 PM</p>
            <p style="color: #555555; font-size: 15px; margin: 5px 0;"><strong>Venue:</strong> Hill Paradise Hotel, Hanthana</p>
            <hr style="border: none; border-top: 1px solid #eeeeee; margin: 25px 0;">
            <p style="color: #666666; font-size: 16px; font-style: italic;">We can't wait to share these beautiful moments with you!</p>
          </div>
          <div style="background-color: #f8bbd0; padding: 15px; text-align: center; color: #880e4f; font-size: 14px;">
            With love,<br><strong>Ulindu & Nethmi</strong>
          </div>
        </div>
      `;
    } else {
      emailSubject = "Wedding Invitation Update - Ulindu & Nethmi";
      emailBody = `
        <div style="font-family: 'Montserrat', sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
          <div style="background-color: #fce4ec; padding: 30px; text-align: center;">
            <h1 style="color: #880e4f; margin: 0; font-size: 32px; font-family: 'Great Vibes', cursive;">Ulindu & Nethmi</h1>
            <p style="color: #c2185b; font-size: 16px; margin-top: 5px;">Wedding Invitation Update</p>
          </div>
          <div style="padding: 30px; background-color: #ffffff; text-align: center;">
            <h2 style="color: #333333; font-size: 24px; margin-bottom: 15px;">Dear ${name},</h2>
            <p style="color: #666666; font-size: 16px; line-height: 1.6;">We have received your response and are so sorry to hear that you won't be able to make it to our wedding.</p>
            <p style="color: #666666; font-size: 16px; line-height: 1.6;">You will certainly be missed, but we completely understand. We hope to catch up and celebrate with you at another time!</p>
            <hr style="border: none; border-top: 1px solid #eeeeee; margin: 25px 0;">
            <p style="color: #666666; font-size: 16px; font-style: italic;">Thank you for letting us know, and for all your love and support.</p>
          </div>
          <div style="background-color: #f8bbd0; padding: 15px; text-align: center; color: #880e4f; font-size: 14px;">
            Warmly,<br><strong>Ulindu & Nethmi</strong>
          </div>
        </div>
      `;
    }

    if (email && email !== 'Not provided') {
      fetch('/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: email,
          subject: emailSubject,
          html: emailBody
        })
      })
      .then(response => response.json())
      .then(data => console.log('Email sent status: ', data))
      .catch(error => console.error('Error sending email:', error));
    }

    setTimeout(() => {
      form.style.display = 'none';
      success.classList.remove('hidden');
      success.style.animation = 'fadeIn 0.6s ease forwards';
      
      // Reset form data and button state
      form.reset();
      btn.innerHTML = '<span class="btn-text">Send Your Response</span><span class="btn-shimmer"></span>';
      btn.disabled = false;
    }, 1200);
  });
}

// ===== MUSIC TOGGLE =====
function initMusicToggle() {
  const btn = document.getElementById('music-toggle');
  let isPlaying = false;
  const audio = new Audio('mp3.mp3');
  audio.loop = true;

  btn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    btn.classList.toggle('playing', isPlaying);
    
    if (isPlaying) {
      audio.play().catch(e => console.error("Error playing audio:", e));
    } else {
      audio.pause();
    }
  });
}
