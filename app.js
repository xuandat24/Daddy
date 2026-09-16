// =================== INIT ===================
const DAD_BIRTHDAY_MONTH = 9; // September (0-indexed: 8)
const DAD_BIRTHDAY_DAY = 16;

document.getElementById('today-date').textContent = new Date().toLocaleDateString('vi-VN', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
});
document.getElementById('footer-year').textContent = new Date().getFullYear();

// =================== PARTICLES ===================
(function initParticles() {
  const container = document.getElementById('particles-container');
  const colors = ['#f5c842','#9333ea','#d8b4fe','#ffe98a','#6b21a8'];
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 6 + 2;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      animation-duration:${Math.random()*15+10}s;
      animation-delay:${Math.random()*10}s;
    `;
    container.appendChild(p);
  }
})();

// =================== CONFETTI ===================
(function initConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  const pieces = [];
  const colors = ['#f5c842','#9333ea','#d8b4fe','#ff6b6b','#4ecdc4','#ffe98a','#6b21a8'];

  function spawnBurst(x, y, count) {
    for (let i = 0; i < count; i++) {
      pieces.push({
        x, y,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.5) * 12 - 4,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        alpha: 1,
        life: 1,
      });
    }
  }

  // Auto-spawn confetti bursts at start
  let autoCount = 0;
  const autoInterval = setInterval(() => {
    spawnBurst(Math.random() * window.innerWidth, Math.random() * window.innerHeight * 0.5, 20);
    autoCount++;
    if (autoCount > 10) clearInterval(autoInterval);
  }, 500);

  window._spawnConfetti = spawnBurst;

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = pieces.length - 1; i >= 0; i--) {
      const p = pieces[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.15;
      p.rotation += p.rotationSpeed;
      p.life -= 0.015;
      p.alpha = Math.max(0, p.life);
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.5);
      ctx.restore();
      if (p.life <= 0) pieces.splice(i, 1);
    }
    requestAnimationFrame(animate);
  }
  animate();
})();

// =================== MUSIC (Web Audio API) ===================
(function initMusic() {
  let audioCtx = null;
  let playing = false;
  let oscillators = [];
  const btn = document.getElementById('music-btn');

  const melody = [
    [523.25, 0.4], [523.25, 0.4], [587.33, 0.8], [523.25, 0.8],
    [698.46, 0.8], [659.25, 1.6], [523.25, 0.4], [523.25, 0.4],
    [587.33, 0.8], [523.25, 0.8], [783.99, 0.8], [698.46, 1.6],
    [523.25, 0.4], [523.25, 0.4], [1046.5, 0.8], [880, 0.8],
    [698.46, 0.8], [659.25, 0.8], [587.33, 0.8], [932.33, 0.4],
    [932.33, 0.4], [880, 0.8], [698.46, 0.8], [783.99, 0.8], [698.46, 1.6],
  ];

  function playMelody(ctx) {
    let time = ctx.currentTime + 0.1;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.15, ctx.currentTime);
    masterGain.connect(ctx.destination);

    melody.forEach(([freq, dur]) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.8, time + 0.05);
      gain.gain.linearRampToValueAtTime(0, time + dur * 0.4 - 0.05);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(time);
      osc.stop(time + dur * 0.4);
      oscillators.push(osc);
      time += dur * 0.4;
    });

    // loop
    setTimeout(() => {
      if (playing) {
        oscillators = [];
        playMelody(audioCtx);
      }
    }, (time - ctx.currentTime) * 1000);
  }

  btn.addEventListener('click', () => {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    playing = !playing;
    btn.classList.toggle('playing', playing);
    if (playing) {
      playMelody(audioCtx);
    } else {
      oscillators.forEach(o => { try { o.stop(); } catch(e) {} });
      oscillators = [];
    }
  });
})();

// =================== COUNTDOWN ===================
(function initCountdown() {
  function update() {
    const now = new Date();
    let next = new Date(now.getFullYear(), DAD_BIRTHDAY_MONTH - 1, DAD_BIRTHDAY_DAY);
    if (now >= next) {
      if (now.getMonth() === DAD_BIRTHDAY_MONTH - 1 && now.getDate() === DAD_BIRTHDAY_DAY) {
        document.getElementById('birthday-today-msg').classList.remove('hidden');
        document.getElementById('countdown').style.opacity = '0.3';
        return;
      }
      next.setFullYear(now.getFullYear() + 1);
    }
    const diff = next - now;
    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(totalDays / 30);
    const days = totalDays % 30;
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    document.getElementById('cd-months').textContent = String(months).padStart(2,'0');
    document.getElementById('cd-days').textContent = String(days).padStart(2,'0');
    document.getElementById('cd-hours').textContent = String(hours).padStart(2,'0');
    document.getElementById('cd-mins').textContent = String(mins).padStart(2,'0');
    document.getElementById('cd-secs').textContent = String(secs).padStart(2,'0');
  }
  update();
  setInterval(update, 1000);
})();

// =================== CANDLES ===================
(function initCandles() {
  const overlay = document.getElementById('candles-overlay');
  const blowOverlay = document.getElementById('blow-overlay');
  const btnBlowAll = document.getElementById('btn-blow-all');
  const btnRelight = document.getElementById('btn-relight');
  const candlesLeftEl = document.getElementById('candles-left');

  const candlePositions = [
    { left: '18%', top: '12%' },
    { left: '30%', top: '8%' },
    { left: '45%', top: '6%' },
    { left: '60%', top: '8%' },
    { left: '74%', top: '12%' },
  ];

  let candles = [];
  let blown = 0;

  function createCandles() {
    overlay.innerHTML = '';
    candles = [];
    blown = 0;
    candlesLeftEl.textContent = candlePositions.length;
    blowOverlay.classList.add('hidden');
    btnRelight.classList.add('hidden');
    btnBlowAll.classList.remove('hidden');

    candlePositions.forEach((pos, i) => {
      const el = document.createElement('div');
      el.className = 'candle';
      el.style.left = pos.left;
      el.style.top = pos.top;
      el.innerHTML = '<div class="candle-flame">🔥</div><div class="candle-body"></div>';
      el.addEventListener('click', () => blowCandle(i));
      overlay.appendChild(el);
      candles.push(el);
    });
  }

  function blowCandle(idx) {
    const el = candles[idx];
    if (el.classList.contains('blown')) return;
    el.classList.add('blown');
    blown++;
    candlesLeftEl.textContent = candlePositions.length - blown;
    if (window._spawnConfetti) {
      const rect = el.getBoundingClientRect();
      window._spawnConfetti(rect.left + rect.width / 2, rect.top, 30);
    }
    if (blown === candlePositions.length) allBlown();
  }

  function allBlown() {
    blowOverlay.classList.remove('hidden');
    btnBlowAll.classList.add('hidden');
    btnRelight.classList.remove('hidden');
    if (window._spawnConfetti) {
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          window._spawnConfetti(Math.random() * window.innerWidth, Math.random() * window.innerHeight * 0.5, 40);
        }, i * 200);
      }
    }
  }

  btnBlowAll.addEventListener('click', () => {
    candles.forEach((_, i) => blowCandle(i));
  });
  btnRelight.addEventListener('click', createCandles);
  createCandles();
})();

// =================== MESSAGES ===================
document.getElementById('btn-add-message').addEventListener('click', function() {
  const text = document.getElementById('custom-message').value.trim();
  if (!text) return;
  const div = document.createElement('div');
  div.className = 'added-msg-card';
  div.textContent = '💬 ' + text;
  document.getElementById('added-messages').prepend(div);
  document.getElementById('custom-message').value = '';
});

// =================== GALLERY / SLIDESHOW ===================
(function initGallery() {
  const photos = [];
  let currentIdx = 0;
  let autoSlideInterval = null;

  const emptyEl = document.getElementById('slideshow-empty');
  const displayEl = document.getElementById('slideshow-display');
  const currentSlide = document.getElementById('current-slide');
  const stripEl = document.getElementById('thumbnail-strip');
  const slideCurrentEl = document.getElementById('slide-current');
  const slideTotalEl = document.getElementById('slide-total');
  const uploadZone = document.getElementById('upload-zone');
  const fileInput = document.getElementById('file-input');

  function updateSlideshow() {
    if (photos.length === 0) {
      emptyEl.classList.remove('hidden');
      displayEl.classList.add('hidden');
      return;
    }
    emptyEl.classList.add('hidden');
    displayEl.classList.remove('hidden');
    slideTotalEl.textContent = photos.length;
    showSlide(currentIdx);
    renderThumbs();
    startAutoSlide();
  }

  function showSlide(idx) {
    currentIdx = idx;
    currentSlide.style.opacity = '0';
    setTimeout(() => {
      currentSlide.src = photos[idx];
      currentSlide.style.opacity = '1';
    }, 200);
    slideCurrentEl.textContent = idx + 1;
    document.querySelectorAll('.thumb-item').forEach((t, i) => {
      t.classList.toggle('active', i === idx);
    });
  }

  function renderThumbs() {
    stripEl.innerHTML = '';
    photos.forEach((src, i) => {
      const div = document.createElement('div');
      div.className = 'thumb-item' + (i === currentIdx ? ' active' : '');
      const img = document.createElement('img');
      img.src = src;
      img.alt = 'Photo ' + (i + 1);
      img.addEventListener('click', () => showSlide(i));
      div.appendChild(img);
      div.addEventListener('click', () => showSlide(i));
      stripEl.appendChild(div);
    });
  }

  function startAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
      showSlide((currentIdx + 1) % photos.length);
    }, 4000);
  }

  document.getElementById('prev-btn').addEventListener('click', () => {
    showSlide((currentIdx - 1 + photos.length) % photos.length);
    startAutoSlide();
  });
  document.getElementById('next-btn').addEventListener('click', () => {
    showSlide((currentIdx + 1) % photos.length);
    startAutoSlide();
  });

  function handleFiles(files) {
    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = e => {
        photos.push(e.target.result);
        updateSlideshow();
      };
      reader.readAsDataURL(file);
    });
  }

  fileInput.addEventListener('change', e => handleFiles(e.target.files));
  uploadZone.addEventListener('dragover', e => { e.preventDefault(); uploadZone.classList.add('drag-over'); });
  uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('drag-over'));
  uploadZone.addEventListener('drop', e => {
    e.preventDefault();
    uploadZone.classList.remove('drag-over');
    handleFiles(e.dataTransfer.files);
  });

  // Lightbox
  currentSlide.addEventListener('click', () => {
    if (photos.length === 0) return;
    document.getElementById('lightbox-img').src = photos[currentIdx];
    document.getElementById('lightbox').classList.remove('hidden');
  });
  document.getElementById('lightbox-close').addEventListener('click', () => {
    document.getElementById('lightbox').classList.add('hidden');
  });
  document.getElementById('lightbox').addEventListener('click', e => {
    if (e.target === document.getElementById('lightbox')) {
      document.getElementById('lightbox').classList.add('hidden');
    }
  });
})();

// =================== INTERSECTION OBSERVER (scroll animations) ===================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.message-card, .countdown-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
