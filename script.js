/**
 * Devam & Reshama Royal Wedding Invitation Webpage
 * Interactive JavaScript Engine:
 * - High-Performance Canvas Particle System (Golden Dust & Rose Petals)
 * - Live Accurate Countdown Timer (Target: Jan 16, 2027 08:00 AM IST)
 * - Harmonious Ambient Indian Classical Music Synthesizer (Web Audio API)
 * - Interactive RSVP with Confetti Celebration
 * - Realtime Blessings & Guestbook with LocalStorage Persistence
 * - Apple Calendar / iCal (.ics) Generator
 * - WhatsApp Share & Clipboard Utilities
 * - IntersectionObserver Scroll Animations
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. Target Dates & Configuration
  // ==========================================================================
  // Target: January 16, 2027 08:00:00 IST (UTC+05:30)
  const WEDDING_START_DATE = new Date('2027-01-16T08:00:00+05:30');
  const WEDDING_RECEPTION_DATE = new Date('2027-01-17T19:00:00+05:30');

  // ==========================================================================
  // 2. Toast Notification Helper
  // ==========================================================================
  const toastEl = document.getElementById('toastNotification');
  let toastTimeout = null;

  function showToast(message, duration = 3200) {
    if (!toastEl) return;
    toastEl.innerHTML = `<span>✨</span><span>${message}</span>`;
    toastEl.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastEl.classList.remove('show');
    }, duration);
  }

  // ==========================================================================
  // 3. Live Countdown Timer
  // ==========================================================================
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const countdownTimerContainer = document.getElementById('countdownTimer');

  function pad(num) {
    return num.toString().padStart(2, '0');
  }

  function updateCountdown() {
    const now = new Date();
    const difference = WEDDING_START_DATE.getTime() - now.getTime();

    if (difference <= 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minutesEl) minutesEl.textContent = '00';
      if (secondsEl) secondsEl.textContent = '00';
      if (countdownTimerContainer) {
        countdownTimerContainer.setAttribute('title', 'The Auspicious Celebrations are underway!');
      }
      return;
    }

    const totalSeconds = Math.floor(difference / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    if (daysEl) daysEl.textContent = pad(days);
    if (hoursEl) hoursEl.textContent = pad(hours);
    if (minutesEl) minutesEl.textContent = pad(minutes);
    if (secondsEl) secondsEl.textContent = pad(seconds);
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // ==========================================================================
  // 4. Interactive Canvas Particle System (Gold Dust & Rose Petals)
  // ==========================================================================
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = window.innerWidth < 768 ? 40 : 85;

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -20;
      this.type = Math.random() > 0.45 ? 'petal' : 'goldDust';

      if (this.type === 'petal') {
        this.size = Math.random() * 8 + 8;
        this.speedY = Math.random() * 1.2 + 0.8;
        this.speedX = Math.random() * 1.5 - 0.75;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.04;
        this.opacity = Math.random() * 0.4 + 0.5;
        // Rose red or Marigold orange/yellow
        this.color = Math.random() > 0.35 
          ? `rgba(185, 28, 62, ${this.opacity})` 
          : `rgba(245, 158, 11, ${this.opacity})`;
      } else {
        // Shimmering Gold Dust
        this.size = Math.random() * 3 + 1.2;
        this.speedY = Math.random() * 0.8 + 0.4;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.opacity = Math.random() * 0.6 + 0.3;
        this.twinkleSpeed = Math.random() * 0.03 + 0.01;
        this.color = `rgba(212, 175, 55, ${this.opacity})`;
      }
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.y * 0.01) * 0.5;

      if (this.type === 'petal') {
        this.rotation += this.rotationSpeed;
      } else {
        this.opacity += Math.sin(Date.now() * 0.003) * 0.01;
      }

      if (this.y > height + 20 || this.x < -30 || this.x > width + 30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      if (this.type === 'petal') {
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        // Delicate curved petal path
        ctx.moveTo(0, -this.size / 2);
        ctx.bezierCurveTo(this.size / 2, -this.size / 2, this.size / 2, this.size / 2, 0, this.size / 2);
        ctx.bezierCurveTo(-this.size / 2, this.size / 2, -this.size / 2, -this.size / 2, 0, -this.size / 2);
        ctx.fill();
      } else {
        // Gold particle sparkle with soft glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 225, 130, ${Math.max(0.1, this.opacity)})`;
        ctx.shadowColor = '#d4af37';
        ctx.shadowBlur = 8;
        ctx.fill();
      }
      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // Gentle interaction on pointer movement
  window.addEventListener('pointermove', (e) => {
    if (Math.random() > 0.7) {
      const p = particles[Math.floor(Math.random() * particles.length)];
      if (p) {
        p.speedX += (e.movementX || 0) * 0.04;
      }
    }
  });

  // ==========================================================================
  // 5. Harmonious Ambient Indian Wedding Music Synthesizer (Web Audio API)
  // ==========================================================================
  // Synthesizes authentic meditative Indian wedding raga soundscapes (Tanpura drone + Bansuri/Sitar frequencies)
  let audioCtx = null;
  let isPlaying = false;
  let masterGain = null;
  let melodyInterval = null;
  let droneOscillators = [];

  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const soundWave = document.getElementById('soundWave');
  const musicBtnLabel = document.getElementById('musicBtnLabel');

  // Raag Yaman / Bhupali auspicious pentatonic scale frequencies (Sa Re Ga Pa Dha)
  const ragaFrequencies = [
    220.00, // A3 (Sa)
    247.50, // B3 (Re)
    277.18, // C#4 (Ga)
    329.63, // E4 (Pa)
    369.99, // F#4 (Dha)
    440.00, // A4 (High Sa)
    495.00, // B4 (High Re)
    554.37  // C#5 (High Ga)
  ];

  function initAudioEngine() {
    if (audioCtx) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
    masterGain.connect(audioCtx.destination);
  }

  function startDrone() {
    // Rich dual-harmonic Tanpura drone in Sa-Pa (A3 & E3)
    const droneFreqs = [110.00, 164.81, 220.00]; // A2, E3, A3
    droneFreqs.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.08 / (idx + 1), audioCtx.currentTime);
      osc.connect(gain);
      gain.connect(masterGain);

      osc.start();
      droneOscillators.push(osc);
    });
  }

  function playMelodyNote() {
    if (!isPlaying || !audioCtx) return;

    // Pick an auspicious melody note from Raag Yaman
    const freq = ragaFrequencies[Math.floor(Math.random() * ragaFrequencies.length)];
    const noteOsc = audioCtx.createOscillator();
    const noteGain = audioCtx.createGain();

    // Warm Shehnai / Flute timbre: blend sine and soft triangle
    noteOsc.type = 'triangle';
    noteOsc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    // Subtle graceful bend (Meend) characteristic of Indian classical
    noteOsc.frequency.exponentialRampToValueAtTime(
      freq * (Math.random() > 0.5 ? 1.02 : 0.98),
      audioCtx.currentTime + 1.2
    );

    const now = audioCtx.currentTime;
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.12, now + 0.4);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

    noteOsc.connect(noteGain);
    noteGain.connect(masterGain);

    noteOsc.start(now);
    noteOsc.stop(now + 2.3);
  }

  function startMusic() {
    initAudioEngine();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    startDrone();
    masterGain.gain.exponentialRampToValueAtTime(0.25, audioCtx.currentTime + 1.5);

    melodyInterval = setInterval(playMelodyNote, 1600);
    playMelodyNote();

    isPlaying = true;
    if (soundWave) soundWave.classList.add('playing');
    if (musicBtnLabel) musicBtnLabel.textContent = 'Music Playing';
    showToast('🎶 Royal Wedding Shehnai & Sitar Melody Playing');
  }

  function stopMusic() {
    if (!audioCtx) return;

    masterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);

    setTimeout(() => {
      droneOscillators.forEach((osc) => {
        try { osc.stop(); } catch (e) {}
      });
      droneOscillators = [];
      clearInterval(melodyInterval);
    }, 600);

    isPlaying = false;
    if (soundWave) soundWave.classList.remove('playing');
    if (musicBtnLabel) musicBtnLabel.textContent = 'Music Paused';
    showToast('Music Paused');
  }

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', () => {
      if (!isPlaying) {
        startMusic();
      } else {
        stopMusic();
      }
    });
  }

  // ==========================================================================
  // 6. Confetti Shower Effect for Celebratory RSVP
  // ==========================================================================
  function fireConfetti() {
    const confettiCount = 50;
    for (let i = 0; i < confettiCount; i++) {
      const conf = document.createElement('div');
      conf.style.position = 'fixed';
      conf.style.zIndex = '9999';
      conf.style.top = '-10px';
      conf.style.left = `${Math.random() * 100}vw`;
      conf.style.width = `${Math.random() * 10 + 6}px`;
      conf.style.height = `${Math.random() * 8 + 6}px`;
      const colors = ['#d4af37', '#ffd700', '#5c061a', '#064e3b', '#f43f5e', '#ffffff'];
      conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      conf.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      conf.style.pointerEvents = 'none';
      conf.style.transform = `rotate(${Math.random() * 360}deg)`;
      conf.style.transition = `all ${Math.random() * 2 + 2}s cubic-bezier(0.25, 1, 0.5, 1)`;

      document.body.appendChild(conf);

      requestAnimationFrame(() => {
        conf.style.transform = `translate(${Math.random() * 120 - 60}px, 105vh) rotate(${Math.random() * 720}deg)`;
        conf.style.opacity = '0';
      });

      setTimeout(() => {
        conf.remove();
      }, 4000);
    }
  }

  // ==========================================================================
  // 7. Interactive RSVP & Wishes System (LocalStorage)
  // ==========================================================================
  const defaultWishes = [
    {
      name: 'Rameshbhai & Kokilaben Patel',
      time: 'Family Elder Blessings',
      text: 'May Lord Ganesha bestow boundless happiness, good health, and eternal prosperity upon Devam & Reshama. Heartiest congratulations! 🌸'
    },
    {
      name: 'The Shah Family',
      time: 'Close Family',
      text: 'Wishing the beautiful couple a lifetime filled with laughter, mutual respect, and sweet moments. Looking forward to the Garba night! 🪔'
    },
    {
      name: 'Priya & Harshil',
      time: 'Friends & Cousins',
      text: 'Devam and Reshama, you two are made for each other! Can’t wait to dance at the Sangeet celebration! #DevamWedsReshama 💃🕺'
    },
    {
      name: 'Amit & Neha Dave',
      time: 'Well Wishers',
      text: 'Sadaa Saubhagyavati Bhava! Wishing both families boundless joy on this auspicious occasion.'
    }
  ];

  const STORAGE_KEY_WISHES = 'devam_reshama_wedding_wishes';
  const STORAGE_KEY_RSVP = 'devam_reshama_rsvp_submissions';

  function getStoredWishes() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_WISHES);
      return stored ? JSON.parse(stored) : defaultWishes;
    } catch (e) {
      return defaultWishes;
    }
  }

  function renderWishes() {
    const feed = document.getElementById('wishesFeed');
    const counter = document.getElementById('wishesCount');
    if (!feed) return;

    const wishes = getStoredWishes();
    feed.innerHTML = '';

    wishes.forEach((w) => {
      const card = document.createElement('div');
      card.className = 'wish-item';
      card.innerHTML = `
        <div class="wish-header-line">
          <span class="wish-author">${escapeHTML(w.name)}</span>
          <span class="wish-time">${escapeHTML(w.time)}</span>
        </div>
        <p class="wish-body">"${escapeHTML(w.text)}"</p>
      `;
      feed.appendChild(card);
    });

    if (counter) {
      counter.textContent = `${wishes.length} Blessings Shared`;
    }
  }

  function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  renderWishes();

  const rsvpForm = document.getElementById('rsvpForm');
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('guestName').value.trim();
      const phone = document.getElementById('guestPhone').value.trim();
      const count = document.getElementById('attendingCount').value;
      const status = document.getElementById('attendanceStatus').value;
      const blessing = document.getElementById('guestBlessing').value.trim();

      if (!name || !phone) {
        showToast('Please fill in your name and contact number');
        return;
      }

      // Save RSVP Record
      try {
        const storedRsvp = JSON.parse(localStorage.getItem(STORAGE_KEY_RSVP) || '[]');
        storedRsvp.push({
          name,
          phone,
          count,
          status,
          blessing,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem(STORAGE_KEY_RSVP, JSON.stringify(storedRsvp));
      } catch (err) {
        console.warn('LocalStorage error:', err);
      }

      // If guest wrote a blessing, add to public wall
      if (blessing) {
        try {
          const wishes = getStoredWishes();
          wishes.unshift({
            name,
            time: 'Just now',
            text: blessing
          });
          localStorage.setItem(STORAGE_KEY_WISHES, JSON.stringify(wishes));
          renderWishes();
        } catch (err) {
          console.warn('Wishes storage error:', err);
        }
      }

      // Celebratory Feedback
      fireConfetti();
      showToast(`Dhanyawad, ${name}! Your RSVP has been received with love ❤️`);
      rsvpForm.reset();
    });
  }

  // ==========================================================================
  // 8. One-Click Utilities: Address Copy, Hashtag Copy & WhatsApp Share
  // ==========================================================================
  const copyAddressBtn = document.getElementById('copyAddressBtn');
  if (copyAddressBtn) {
    copyAddressBtn.addEventListener('click', () => {
      const address = 'B-30, MatruShakti Society, OPP Sales-India, India-Colony Road, Bapunagar, Ahmedabad, Gujarat 380024';
      navigator.clipboard.writeText(address).then(() => {
        showToast('📋 Venue Address copied to clipboard!');
      }).catch(() => {
        showToast('Venue: B-30, MatruShakti Society, Bapunagar, Ahmedabad');
      });
    });
  }

  const hashtagCopyBtn = document.getElementById('hashtagCopyBtn');
  if (hashtagCopyBtn) {
    hashtagCopyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('#DevamWedsReshama').then(() => {
        showToast('🏷️ Hashtag #DevamWedsReshama copied!');
      }).catch(() => {
        showToast('Official Hashtag: #DevamWedsReshama');
      });
    });
  }

  const whatsappShareBtn = document.getElementById('whatsappShareBtn');
  if (whatsappShareBtn) {
    whatsappShareBtn.addEventListener('click', () => {
      const currentUrl = window.location.href;
      const shareMessage = encodeURIComponent(
        `💍 *Devam & Reshama Royal Wedding Invitation* 💍\n\n` +
        `Together with their families, Devam & Reshama cordially invite you to celebrate their wedding celebrations on *16th & 17th January 2027* in Ahmedabad!\n\n` +
        `📍 Venue: B-30, MatruShakti Society, Bapunagar, Ahmedabad\n` +
        `✨ Explore events, map directions & send blessings here:\n${currentUrl}\n\n` +
        `#DevamWedsReshama`
      );
      window.open(`https://api.whatsapp.com/send?text=${shareMessage}`, '_blank');
    });
  }

  // ==========================================================================
  // 9. Apple / Outlook / iCal Calendar Download (.ics)
  // ==========================================================================
  const downloadIcsBtn = document.getElementById('downloadIcsBtn');
  if (downloadIcsBtn) {
    downloadIcsBtn.addEventListener('click', () => {
      const icsData = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Devam and Reshama//Royal Wedding Invitation//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        'UID:devam-reshama-wedding-2027@celebration',
        'DTSTAMP:20261123T000000Z',
        'DTSTART:20270116T023000Z', // 08:00 AM IST
        'DTEND:20270117T183000Z',   // 12:00 AM IST next day
        'SUMMARY:Devam & Reshama Royal Wedding Celebrations',
        'DESCRIPTION:Join us for the auspicious wedding festivities of Devam & Reshama in Ahmedabad. Includes Ganesh Sthapan, Haldi, Sangeet, Vedic Wedding Ceremony & Grand Reception. #DevamWedsReshama',
        'LOCATION:B-30\\, MatruShakti Society\\, OPP Sales-India\\, India-Colony Road\\, Bapunagar\\, Ahmedabad\\, Gujarat',
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'Devam_Reshama_Wedding_Invitation.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast('📅 Wedding Calendar invite downloaded (.ics)!');
    });
  }

  // ==========================================================================
  // 10. Smooth Scroll Reveal (IntersectionObserver)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('revealed'));
  }

})();
