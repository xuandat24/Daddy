"use strict";
// ============================================================
// CONFIG - CHINH SUA O DAY
// ============================================================
const DAD_BIRTHDAY_MONTH = 9;   // thang 9
const DAD_BIRTHDAY_DAY   = 17;  // ngay 17

// Du lieu qua cau - them anh va loi chuc o day
// photo: null hoac ten file anh (vi du: "photos/anh1.jpg")
const GALLERY_DATA = [
  { photo:null, message:"Bo oi, con yeu bo nhieu lam! Mo moi buoc chan cua bo la mot dieu tuyet voi trong cuoc doi con.", emoji:"❤️", color:"#ff6b9d" },
  { photo:null, message:"Cam on bo vi nhung hy sinh tham lang, nhung dem thuc khuya va nhung nu cuoi am ap khong bao gio tat!", emoji:"🌟", color:"#ffd93d" },
  { photo:null, message:"Bo la nguoi hung cua con - khong ao giap nhung luon che cho con duoi moi bau troi.", emoji:"🦸", color:"#6bcb77" },
  { photo:null, message:"Moi ky niem ben bo la mot kho bau con tran trong mai mai. Chuc bo manh khoe, hanh phuc!", emoji:"🎁", color:"#4d96ff" },
  { photo:null, message:"Nhu song bien bat tan, tinh bo danh cho gia dinh va nhung nguoi con la vo tan va mai mai.", emoji:"🌊", color:"#a855f7" },
  { photo:null, message:"Sinh nhat vui ve Bo Nhu! Chuc bo song lau tram tuoi, luon vui khoe ben gia dinh!", emoji:"🎂", color:"#ff9f43" },
];
// ============================================================

// ===== DATES =====
const now = new Date();
document.getElementById("footer-year").textContent = "© " + now.getFullYear();

const dayNames = ["Chủ nhật","Thứ hai","Thứ ba","Thứ tư","Thứ năm","Thứ sáu","Thứ bảy"];
const monthNames = ["tháng 1","tháng 2","tháng 3","tháng 4","tháng 5","tháng 6","tháng 7","tháng 8","tháng 9","tháng 10","tháng 11","tháng 12"];
document.getElementById("today-date").textContent =
  dayNames[now.getDay()] + ", " + now.getDate() + " " + monthNames[now.getMonth()] + " " + now.getFullYear();

const bdayThisYear = new Date(now.getFullYear(), DAD_BIRTHDAY_MONTH - 1, DAD_BIRTHDAY_DAY);
const bdayDisplay = dayNames[bdayThisYear.getDay()] + ", ngày " + DAD_BIRTHDAY_DAY + " " + monthNames[DAD_BIRTHDAY_MONTH - 1] + " " + bdayThisYear.getFullYear();
document.getElementById("bday-val").textContent = bdayDisplay;

const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const bdayDate  = new Date(now.getFullYear(), DAD_BIRTHDAY_MONTH - 1, DAD_BIRTHDAY_DAY);
const diffDays  = Math.round((bdayDate - todayDate) / 864e5);
const notice    = document.getElementById("bday-notice");
if (diffDays === 0)       notice.textContent = "🎉 Hôm nay là sinh nhật Bố! HAPPY BIRTHDAY!";
else if (diffDays === 1)  notice.textContent = "⏰ Còn 1 ngày nữa là sinh nhật Bố!";
else if (diffDays === -1) notice.textContent = "🎈 Hôm qua là sinh nhật Bố!";
else if (diffDays > 1)    notice.textContent = "Còn " + diffDays + " ngày nữa!";

// ===== COUNTDOWN =====
function updateCountdown() {
  const n = new Date();
  let next = new Date(n.getFullYear(), DAD_BIRTHDAY_MONTH - 1, DAD_BIRTHDAY_DAY);
  if (n.getMonth() === DAD_BIRTHDAY_MONTH - 1 && n.getDate() === DAD_BIRTHDAY_DAY) {
    document.getElementById("cd-msg").classList.remove("hidden");
    return;
  }
  if (n >= next) next.setFullYear(n.getFullYear() + 1);
  const diff = next - n;
  const totalDays = Math.floor(diff / 864e5);
  const months = Math.floor(totalDays / 30);
  const days   = totalDays % 30;
  const hours  = Math.floor((diff % 864e5) / 36e5);
  const mins   = Math.floor((diff % 36e5) / 6e4);
  const secs   = Math.floor((diff % 6e4) / 1e3);
  document.getElementById("cd-months").textContent = String(months).padStart(2,"0");
  document.getElementById("cd-days").textContent   = String(days).padStart(2,"0");
  document.getElementById("cd-hours").textContent  = String(hours).padStart(2,"0");
  document.getElementById("cd-mins").textContent   = String(mins).padStart(2,"0");
  document.getElementById("cd-secs").textContent   = String(secs).padStart(2,"0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ===== STARS =====
(function() {
  const container = document.getElementById("hero-stars");
  for (let i = 0; i < 80; i++) {
    const s = document.createElement("div");
    s.className = "star-dot";
    const sz = Math.random() * 3 + 1;
    s.style.cssText = "width:" + sz + "px;height:" + sz + "px;left:" + (Math.random()*100) + "%;top:" + (Math.random()*100) + "%;--td:" + (Math.random()*2+1.5) + "s;animation-delay:" + (Math.random()*3) + "s;opacity:" + (Math.random()*.7+.3);
    container.appendChild(s);
  }
})();

// ===== FIREWORKS =====
(function() {
  const canvas = document.getElementById("fireworks-canvas");
  const ctx = canvas.getContext("2d");
  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;
  window.addEventListener("resize", () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; });

  const particles = [];
  const COLORS = [
    "#ff6b6b","#ff9f43","#ffd93d","#6bcb77","#4d96ff",
    "#a855f7","#ec4899","#22d3ee","#f5c842","#ff6bff"
  ];

  function spawnFirework(x, y) {
    const count = Math.floor(Math.random() * 30 + 40);
    const baseColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - .5) * .3;
      const speed = Math.random() * 5 + 2;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: Math.random() > .3 ? baseColor : COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 4 + 2,
        life: 1,
        decay: Math.random() * .02 + .015,
        trail: [],
        sparkle: Math.random() > .5
      });
    }
  }

  // Rockets
  const rockets = [];
  function launchRocket() {
    rockets.push({
      x: Math.random() * W,
      y: H,
      vy: -(Math.random() * 8 + 8),
      peakY: Math.random() * H * .55 + H * .05,
      exploded: false
    });
  }

  // Auto launch
  setInterval(launchRocket, 700);
  launchRocket(); launchRocket();

  function draw() {
    ctx.clearRect(0, 0, W, H);
    // Rockets
    for (let i = rockets.length - 1; i >= 0; i--) {
      const r = rockets[i];
      r.y += r.vy;
      r.vy += .18;
      if (r.y <= r.peakY && !r.exploded) {
        r.exploded = true;
        spawnFirework(r.x, r.y);
        rockets.splice(i, 1);
        continue;
      }
      if (r.y > H + 10) { rockets.splice(i, 1); continue; }
      ctx.beginPath();
      ctx.arc(r.x, r.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,220,100,0.9)";
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(r.x, r.y);
      ctx.lineTo(r.x, r.y + 12);
      const g = ctx.createLinearGradient(r.x, r.y, r.x, r.y + 12);
      g.addColorStop(0,"rgba(255,200,50,.8)");
      g.addColorStop(1,"rgba(255,100,0,0)");
      ctx.strokeStyle = g; ctx.lineWidth = 2; ctx.stroke();
    }
    // Particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.trail.push({x: p.x, y: p.y});
      if (p.trail.length > 6) p.trail.shift();
      p.x += p.vx; p.y += p.vy;
      p.vy += .08; p.vx *= .98;
      p.life -= p.decay;
      if (p.life <= 0) { particles.splice(i, 1); continue; }
      // Trail
      for (let t = 0; t < p.trail.length - 1; t++) {
        const alpha = (t / p.trail.length) * p.life * .5;
        ctx.beginPath();
        ctx.moveTo(p.trail[t].x, p.trail[t].y);
        ctx.lineTo(p.trail[t+1].x, p.trail[t+1].y);
        ctx.strokeStyle = p.color.replace(")", "," + alpha + ")").replace("rgb","rgba");
        ctx.lineWidth = p.size * .5;
        ctx.stroke();
      }
      // Particle
      ctx.save();
      ctx.globalAlpha = p.life;
      if (p.sparkle) {
        ctx.beginPath();
        for (let s = 0; s < 4; s++) {
          const a = (s / 4) * Math.PI * 2;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + Math.cos(a) * p.size * 2, p.y + Math.sin(a) * p.size * 2);
        }
        ctx.strokeStyle = p.color; ctx.lineWidth = 1.5; ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.fill();
      }
      ctx.restore();
    }
    requestAnimationFrame(draw);
  }
  draw();

  window._spawnFirework = spawnFirework;
})();

// ===== BALLOONS =====
(function() {
  const container = document.getElementById("balloons-container");
  const colors = [
    "#ff6b6b","#ff9f43","#ffd93d","#6bcb77","#4d96ff",
    "#a855f7","#ec4899","#22d3ee","#f07b3f","#ff6bff"
  ];
  const count = window.innerWidth < 600 ? 7 : 12;

  for (let i = 0; i < count; i++) {
    const wrap = document.createElement("div");
    wrap.className = "balloon-wrap";
    const col = colors[i % colors.length];
    const sz  = Math.random() * 30 + 45;
    const dur = Math.random() * 8 + 10;
    const del = -(Math.random() * dur);

    wrap.style.cssText = "--col:" + col + ";--sz:" + sz + "px;--dur:" + dur + "s;--del:" + del + "s;left:" + (Math.random() * 88 + 4) + "%";

    const body  = document.createElement("div"); body.className  = "balloon-body";
    const knot  = document.createElement("div"); knot.className  = "balloon-knot";
    const str   = document.createElement("div"); str.className   = "balloon-string";
    wrap.appendChild(body); wrap.appendChild(knot); wrap.appendChild(str);
    container.appendChild(wrap);
  }
})();

// ===== MUSIC (Web Audio API) =====
(function() {
  let ctx, masterGain, playing = false, nodes = [];
  const btn = document.getElementById("music-btn");

  const notes = [
    [392,.4],[392,.4],[440,.8],[392,.8],[523,.8],[494,1.6],
    [392,.4],[392,.4],[440,.8],[392,.8],[587,.8],[523,1.6],
    [392,.4],[392,.4],[784,.8],[659,.8],[523,.8],[494,.8],[440,1.6],
    [698,.4],[698,.4],[659,.8],[523,.8],[587,.8],[523,1.6]
  ];
  const BPS = 60 / 110;
  const totalLen = notes.reduce((s, n) => s + n[1] * BPS, 0);

  function createCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    return ctx;
  }

  function playMelody() {
    const c = createCtx();
    if (c.state === "suspended") c.resume();
    nodes.forEach(n => { try { n.stop(); } catch(e){} });
    nodes = [];

    masterGain = c.createGain();
    masterGain.gain.setValueAtTime(.18, c.currentTime);
    masterGain.connect(c.destination);

    const rev = c.createDelay(.4);
    const rg  = c.createGain(); rg.gain.value = .09;
    rev.connect(rg); rg.connect(masterGain); masterGain.connect(rev);

    let t = c.currentTime + .05;
    notes.forEach(([freq, beats]) => {
      const dur = beats * BPS;
      ["sine","triangle"].forEach((type, ti) => {
        const osc = c.createOscillator();
        const g   = c.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq * (ti === 1 ? 1 : 1), t);
        if (ti === 1) osc.frequency.setValueAtTime(freq * 1.498, t);
        const vol = ti === 0 ? .7 : .12;
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(vol, t + .03);
        g.gain.setValueAtTime(vol, t + dur * .65);
        g.gain.linearRampToValueAtTime(0, t + dur * .92);
        osc.connect(g); g.connect(masterGain);
        osc.start(t); osc.stop(t + dur);
        nodes.push(osc);
      });
      t += dur;
    });

    setTimeout(() => { if (playing) playMelody(); }, totalLen * 1000 + 50);
  }

  function startMusic() {
    playing = true;
    btn.classList.add("playing");
    playMelody();
  }

  function stopMusic() {
    playing = false;
    btn.classList.remove("playing");
    nodes.forEach(n => { try { n.stop(); } catch(e){} });
    nodes = [];
  }

  btn.addEventListener("click", () => { if (playing) stopMusic(); else startMusic(); });

  // Auto-play: try immediately, else wait for first interaction
  function tryPlay() {
    const c = createCtx();
    if (c.state === "running") {
      startMusic();
    } else {
      const unlock = () => {
        c.resume().then(() => { startMusic(); });
        document.removeEventListener("click",   unlock);
        document.removeEventListener("touchstart", unlock);
        document.removeEventListener("keydown",  unlock);
      };
      document.addEventListener("click",      unlock, { once: true });
      document.addEventListener("touchstart", unlock, { once: true });
      document.addEventListener("keydown",    unlock, { once: true });
    }
  }
  setTimeout(tryPlay, 500);
})();

// ===== CANDLES =====
(function() {
  const layer      = document.getElementById("candles-layer");
  const leftEl     = document.getElementById("candles-left");
  const btnBlowAll = document.getElementById("btn-blow-all");
  const btnRelight = document.getElementById("btn-relight");
  const TOTAL      = 5;

  // Positions (% from left, % from top) — on cake image area
  const POS = [
    [22, 8],[32, 5],[50, 3],[67, 5],[78, 8]
  ];

  let blown = 0;
  let candles = [];

  function createCandles() {
    layer.innerHTML = "";
    candles = [];
    blown = 0;
    leftEl.textContent = TOTAL;
    btnBlowAll.classList.remove("hidden");
    btnRelight.classList.add("hidden");

    POS.forEach(([l, t], i) => {
      const el = document.createElement("div");
      el.className = "candle";
      el.style.left = l + "%";
      el.style.top  = t + "%";
      el.innerHTML  = "<div class='c-flame'>🔥</div><div class='c-body'></div>";
      el.addEventListener("click",     () => blowOne(i));
      el.addEventListener("touchstart", (e) => { e.preventDefault(); blowOne(i); });
      layer.appendChild(el);
      candles.push(el);
    });
  }

  function blowOne(i) {
    if (candles[i].classList.contains("blown")) return;
    candles[i].classList.add("blown");
    blown++;
    leftEl.textContent = TOTAL - blown;
    spawnMiniSparkle(candles[i]);
    if (blown === TOTAL) allBlown();
  }

  function spawnMiniSparkle(el) {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;
    if (window._spawnFirework) window._spawnFirework(cx, cy);
  }

  function allBlown() {
    btnBlowAll.classList.add("hidden");
    btnRelight.classList.remove("hidden");
    startFairyEffect();
  }

  btnBlowAll.addEventListener("click", () => { POS.forEach((_, i) => blowOne(i)); });
  btnRelight.addEventListener("click", createCandles);
  createCandles();
})();

// ===== FAIRY SPARKLE EFFECT =====
function startFairyEffect() {
  const canvas = document.getElementById("fairy-canvas");
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.classList.add("active");
  const ctx = canvas.getContext("2d");

  const cakeEl  = document.getElementById("cake-frame");
  const cakeRect = cakeEl.getBoundingClientRect();
  const originX  = cakeRect.left + cakeRect.width / 2;
  const originY  = cakeRect.top  + cakeRect.height * .3;

  const COLORS = ["#ff6b9d","#ffd93d","#6bcb77","#4d96ff","#a855f7","#ec4899","#22d3ee","#ff9f43","#f5c842"];
  const fairies = [];

  for (let i = 0; i < 140; i++) {
    const angle  = (Math.PI * 2 * i / 140) + (Math.random() - .5) * .8;
    const speed  = Math.random() * 4 + 2;
    const hue    = Math.floor(Math.random() * 360);
    fairies.push({
      x: originX, y: originY,
      vx: Math.cos(angle) * speed * .5,
      vy: -(Math.random() * 5 + 3),
      ax: (Math.random() - .5) * .15,
      color: "hsl(" + hue + ",100%,75%)",
      size: Math.random() * 5 + 2,
      life: 1,
      decay: Math.random() * .01 + .007,
      twinkle: Math.random() * Math.PI * 2,
      trail: []
    });
  }

  let elapsed = 0;
  function drawFairy() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    for (const f of fairies) {
      if (f.life <= 0) continue;
      alive = true;
      f.trail.push({x: f.x, y: f.y});
      if (f.trail.length > 8) f.trail.shift();
      f.x  += f.vx;
      f.y  += f.vy;
      f.vy += .04;
      f.vx += f.ax;
      f.life -= f.decay;
      f.twinkle += .2;
      // Trail
      for (let t = 0; t < f.trail.length - 1; t++) {
        const a = (t / f.trail.length) * f.life * .4;
        ctx.beginPath();
        ctx.moveTo(f.trail[t].x, f.trail[t].y);
        ctx.lineTo(f.trail[t+1].x, f.trail[t+1].y);
        ctx.strokeStyle = f.color;
        ctx.globalAlpha = a;
        ctx.lineWidth = f.size * .6;
        ctx.lineCap = "round";
        ctx.stroke();
      }
      // Star shape
      ctx.save();
      ctx.globalAlpha = f.life * (.7 + Math.sin(f.twinkle) * .3);
      ctx.translate(f.x, f.y);
      ctx.rotate(f.twinkle);
      ctx.beginPath();
      const spikes = 4;
      for (let s = 0; s < spikes * 2; s++) {
        const a = (s * Math.PI) / spikes;
        const r = s % 2 === 0 ? f.size * 2 : f.size * .7;
        s === 0 ? ctx.moveTo(Math.cos(a)*r, Math.sin(a)*r) : ctx.lineTo(Math.cos(a)*r, Math.sin(a)*r);
      }
      ctx.closePath();
      ctx.fillStyle = f.color;
      ctx.shadowColor = f.color;
      ctx.shadowBlur  = 12;
      ctx.fill();
      ctx.restore();
    }

    elapsed++;
    if (!alive || elapsed > 240) {
      canvas.classList.remove("active");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Burst fireworks
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          if (window._spawnFirework) {
            window._spawnFirework(Math.random() * window.innerWidth, Math.random() * window.innerHeight * .6);
          }
        }, i * 180);
      }
      // Scroll to memories
      setTimeout(() => {
        document.getElementById("memories-section").scrollIntoView({ behavior: "smooth" });
      }, 800);
      return;
    }
    requestAnimationFrame(drawFairy);
  }
  drawFairy();
}

// ===== 3D SPHERE =====
(function() {
  const inner    = document.getElementById("sphere-inner");
  const popup    = document.getElementById("sphere-popup");
  const popMedia = document.getElementById("popup-media");
  const popMsg   = document.getElementById("popup-msg");
  const popClose = document.getElementById("popup-close");
  const scene    = document.getElementById("sphere-scene");

  const isMobile = window.innerWidth < 600;
  const RADIUS   = isMobile ? 120 : 170;
  const ITEM_SZ  = isMobile ? 70 : 96;
  const PHI      = (1 + Math.sqrt(5)) / 2;
  const n        = GALLERY_DATA.length;

  // Create items
  const itemEls = [];
  GALLERY_DATA.forEach((data, i) => {
    const theta = 2 * Math.PI * i / PHI;
    const phi   = Math.acos(1 - 2 * (i + .5) / n);
    const x     = RADIUS * Math.sin(phi) * Math.cos(theta);
    const y     = RADIUS * Math.cos(phi);
    const z     = RADIUS * Math.sin(phi) * Math.sin(theta);

    const el = document.createElement("div");
    el.className = "sphere-item";
    el.dataset.index = i;
    el.style.cssText =
      "width:" + ITEM_SZ + "px;height:" + ITEM_SZ + "px;" +
      "margin:" + (-ITEM_SZ/2) + "px 0 0 " + (-ITEM_SZ/2) + "px;" +
      "transform:translate3d(" + x + "px," + y + "px," + z + "px)";

    const face = document.createElement("div");
    face.className = "sphere-face";
    face.style.width = face.style.height = ITEM_SZ + "px";
    face.style.setProperty("--bg-col", data.color);

    if (data.photo) {
      const img = document.createElement("img");
      img.src = data.photo; img.className = "s-photo";
      face.appendChild(img);
    } else {
      const ph = document.createElement("div");
      ph.className = "s-placeholder";
      ph.style.background = "radial-gradient(ellipse at 35% 30%,rgba(255,255,255,.25),transparent 70%)," + data.color;
      ph.textContent = data.emoji;
      face.appendChild(ph);
    }

    // Short msg overlay on hover
    const msgLbl = document.createElement("div");
    msgLbl.className = "sphere-msg-label";
    msgLbl.innerHTML = "<span class='s-msg-emoji'>" + data.emoji + "</span><p class='s-msg-text'>" + data.message.substring(0,40) + "...</p>";
    face.appendChild(msgLbl);

    // Glow ring
    face.style.boxShadow = "0 0 0 2px " + data.color + "80, 0 0 20px " + data.color + "50";

    el.appendChild(face);
    inner.appendChild(el);
    itemEls.push({ el, data, x, y, z });
  });

  // Open popup
  function openPopup(data) {
    if (data.photo) {
      popMedia.innerHTML = "<img src='" + data.photo + "' alt='Photo' />";
    } else {
      popMedia.innerHTML = "<div class='popup-emoji'>" + data.emoji + "</div>";
    }
    popMsg.textContent = data.message;
    popup.classList.remove("hidden");
  }

  itemEls.forEach(({ el, data }) => {
    el.addEventListener("click", () => openPopup(data));
    el.addEventListener("touchend", (e) => { e.preventDefault(); openPopup(data); });
  });

  popClose.addEventListener("click",  () => popup.classList.add("hidden"));
  popup.addEventListener("click", e => { if (e.target === popup) popup.classList.add("hidden"); });

  // Rotation
  let rotY = 0, rotX = -12;
  let isDragging = false, lastX = 0;

  scene.addEventListener("mousedown", e => { isDragging = true; lastX = e.clientX; });
  window.addEventListener("mouseup",  () => { isDragging = false; });
  window.addEventListener("mousemove", e => {
    if (!isDragging) return;
    rotY += (e.clientX - lastX) * .5;
    lastX = e.clientX;
  });

  let touchStartX = 0;
  scene.addEventListener("touchstart", e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  scene.addEventListener("touchmove", e => {
    rotY += (e.touches[0].clientX - touchStartX) * .4;
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  function tick() {
    if (!isDragging) rotY += .22;
    inner.style.transform = "rotateY(" + rotY + "deg) rotateX(" + rotX + "deg)";
    requestAnimationFrame(tick);
  }
  tick();

  // Upload photos into sphere
  const fileInput   = document.getElementById("file-input");
  const uploadZone  = document.getElementById("upload-zone");

  function addPhotoToSphere(src) {
    const i = GALLERY_DATA.findIndex(d => d.photo === null);
    if (i === -1) return;
    GALLERY_DATA[i].photo = src;
    const face = itemEls[i].el.querySelector(".sphere-face");
    face.innerHTML = "";
    const img = document.createElement("img");
    img.src = src; img.className = "s-photo";
    face.appendChild(img);
    const msgLbl = document.createElement("div");
    msgLbl.className = "sphere-msg-label";
    msgLbl.innerHTML = "<span class='s-msg-emoji'>" + GALLERY_DATA[i].emoji + "</span><p class='s-msg-text'>" + GALLERY_DATA[i].message.substring(0,40) + "...</p>";
    face.appendChild(msgLbl);
  }

  fileInput.addEventListener("change", e => {
    Array.from(e.target.files).forEach(f => {
      if (!f.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = ev => addPhotoToSphere(ev.target.result);
      reader.readAsDataURL(f);
    });
  });

  uploadZone.addEventListener("dragover", e => { e.preventDefault(); uploadZone.classList.add("drag-over"); });
  uploadZone.addEventListener("dragleave", () => uploadZone.classList.remove("drag-over"));
  uploadZone.addEventListener("drop", e => {
    e.preventDefault();
    uploadZone.classList.remove("drag-over");
    Array.from(e.dataTransfer.files).forEach(f => {
      if (!f.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = ev => addPhotoToSphere(ev.target.result);
      reader.readAsDataURL(f);
    });
  });
})();

// Scroll reveal
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = "1";
      e.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: .12 });

document.querySelectorAll(".cd-card").forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(28px)";
  el.style.transition = "opacity .6s ease,transform .6s ease";
  revealObs.observe(el);
});
