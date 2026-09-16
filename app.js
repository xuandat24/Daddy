"use strict";

// ============================================================
// 🎂 CẤU HÌNH & DỮ LIỆU SINH NHẬT BỐ NHƯ
// ============================================================
const BDAY_MONTH = 9;      // Tháng 9
const BDAY_DAY   = 17;     // Ngày 17
const PIN_CODE   = "1709"; // Mật khẩu ngày sinh: 17/09

// 8 Hộp Kỷ Niệm 3D với 8 chủ đề lời chúc ý nghĩa, sâu sắc nhất dành tặng Bố Như
// Người dùng có thể thêm ảnh p1.jpg -> p8.jpg vào thư mục photos/
const CUBE_ITEMS = [
  {
    photo: "photos/p1.jpg",
    title: "Tình Yêu Của Bố",
    sub: "Điểm tựa cuộc đời",
    wish: "Bố Như ơi, con yêu Bố nhiều lắm! Cảm ơn Bố vì cả cuộc đời đã luôn là điểm tựa vững chãi, là bến đỗ bình yên nhất cho gia đình chúng con.",
    emoji: "❤️",
    color: "#ec4899"
  },
  {
    photo: "photos/p2.jpg",
    title: "Người Hùng Thầm Lặng",
    sub: "Che chở bão giông",
    wish: "Bố là người hùng vĩ đại nhất trong tim con – không khoác áo choàng nhưng luôn dang rộng đôi tay che chở cho con qua mọi thử thách cuộc đời.",
    emoji: "🌟",
    color: "#f59e0b"
  },
  {
    photo: "photos/p3.jpg",
    title: "Chúc Thọ Bố Như",
    sub: "Tuổi mới bình an",
    wish: "Kính chúc Bố Như bước sang tuổi mới luôn dồi dào sức khỏe, tinh thần an vui, hạnh phúc đong đầy và vạn sự như ý bên con cháu!",
    emoji: "🎂",
    color: "#8b5cf6"
  },
  {
    photo: "photos/p4.jpg",
    title: "Bàn Tay Che Chở",
    sub: "Hy sinh vô bờ",
    wish: "Cảm ơn những nếp nhăn và đôi bàn tay chai sạn của Bố – tất cả sự hy sinh thầm lặng suốt bao năm tháng ấy con luôn khắc ghi và biết ơn khôn nguôi.",
    emoji: "🌿",
    color: "#10b981"
  },
  {
    photo: "photos/p5.jpg",
    title: "Tình Thấu Biển Trời",
    sub: "Ấm áp bao la",
    wish: "Tình thương của Bố như núi cao biển rộng. Dù con có đi đến chân trời nào, về bên Bố vẫn là nơi ấm áp và bình yên nhất trên thế gian.",
    emoji: "🏔️",
    color: "#06b6d4"
  },
  {
    photo: "photos/p6.jpg",
    title: "Nụ Cười Của Bố",
    sub: "Nắng ấm gia đình",
    wish: "Nụ cười rạng rỡ của Bố chính là niềm hạnh phúc lớn nhất của chúng con. Chúc Bố mỗi ngày trôi qua đều ngập tràn tiếng cười và sự an nhiên.",
    emoji: "☀️",
    color: "#f97316"
  },
  {
    photo: "photos/p7.jpg",
    title: "Người Thầy Vĩ Đại",
    sub: "Dạy bằng yêu thương",
    wish: "Bố dạy con bằng chính cuộc đời kiên cường, nhân hậu và bao dung của mình. Con tự hào vô cùng vì được làm con của Bố Như!",
    emoji: "🦋",
    color: "#d946ef"
  },
  {
    photo: "photos/p8.jpg",
    title: "Bách Niên Giai Lão",
    sub: "Mãi mãi bên con",
    wish: "Chúc Bố Như sống lâu trăm tuổi, mãi mạnh khỏe, an khang và luôn là chỗ dựa tinh thần vô giá cho cả gia đình chúng con! ❤️",
    emoji: "💖",
    color: "#f43f5e"
  }
];

const IS_MOBILE = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || window.innerWidth < 650;

// ============================================================
// 1. CÁNH HOA & LÁ HOA RƠI TỰ NHIÊN (CANVAS PETALS)
// ============================================================
(function initPetals() {
  const canvas = document.getElementById("petals-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });

  const petals = [];
  const TOTAL_PETALS = IS_MOBILE ? 24 : 36;
  const COLORS = [
    { fill: "#f43f5e", type: "rose" },
    { fill: "#fbcfe8", type: "sakura" },
    { fill: "#fb7185", type: "rose" },
    { fill: "#4ade80", type: "leaf" },
    { fill: "#22c55e", type: "leaf" },
    { fill: "#fef08a", type: "yellow" }
  ];

  for (let i = 0; i < TOTAL_PETALS; i++) {
    petals.push(createPetal(true));
  }

  function createPetal(randomY) {
    const c = COLORS[Math.floor(Math.random() * COLORS.length)];
    return {
      x: Math.random() * w,
      y: randomY ? Math.random() * h : -20,
      sz: Math.random() * 8 + 8,
      vx: (Math.random() - 0.5) * 1.2,
      vy: Math.random() * 1.4 + 1.0,
      rotX: Math.random() * Math.PI,
      rotY: Math.random() * Math.PI,
      rotZ: Math.random() * Math.PI,
      vRotX: Math.random() * 0.03 + 0.01,
      vRotY: Math.random() * 0.03 + 0.01,
      vRotZ: Math.random() * 0.02 + 0.01,
      color: c.fill,
      isLeaf: c.type === "leaf"
    };
  }

  function drawPetals() {
    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < petals.length; i++) {
      const p = petals[i];
      p.y += p.vy;
      p.x += p.vx + Math.sin(p.y * 0.015) * 0.8;
      p.rotX += p.vRotX;
      p.rotY += p.vRotY;
      p.rotZ += p.vRotZ;

      if (p.y > h + 20) {
        petals[i] = createPetal(false);
        continue;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotZ);
      const scaleX = Math.cos(p.rotX);
      const scaleY = Math.sin(p.rotY);
      ctx.scale(scaleX, scaleY);

      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.78;
      ctx.beginPath();
      if (p.isLeaf) {
        ctx.ellipse(0, 0, p.sz * 0.5, p.sz * 1.2, Math.PI / 4, 0, Math.PI * 2);
      } else {
        ctx.ellipse(0, 0, p.sz, p.sz * 1.3, 0, 0, Math.PI * 2);
      }
      ctx.fill();
      ctx.restore();
    }

    requestAnimationFrame(drawPetals);
  }
  drawPetals();
})();

// ============================================================
// 2. KHÓA MẬT KHẨU (1709) & CẢNH TRANG ĐẦU
// ============================================================
let currentPin = "";
const pinDots = [
  document.getElementById("dot-0"),
  document.getElementById("dot-1"),
  document.getElementById("dot-2"),
  document.getElementById("dot-3")
];
const lockCard = document.getElementById("lock-card");
const lockScreen = document.getElementById("lock-screen");
const lockSuccess = document.getElementById("lock-success");
const pinErr = document.getElementById("pin-err");

(function initBrightStars() {
  const container = document.getElementById("lock-stars");
  if (!container) return;
  for (let i = 0; i < 45; i++) {
    const star = document.createElement("div");
    star.className = "bright-star";
    const sz = Math.random() * 3 + 2;
    star.style.cssText = `
      width: ${sz}px; height: ${sz}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      --dur: ${Math.random() * 2 + 1.2}s;
      animation-delay: -${Math.random() * 3}s;
    `;
    container.appendChild(star);
  }
})();

function updatePinDots() {
  pinDots.forEach((dot, idx) => {
    dot.classList.toggle("filled", idx < currentPin.length);
  });
}

function handleKeyInput(val) {
  triggerMusicAutoplay();

  pinErr.classList.add("hidden");
  if (val === "C") {
    currentPin = "";
  } else if (val === "DEL") {
    currentPin = currentPin.slice(0, -1);
  } else if (currentPin.length < 4) {
    currentPin += val;
  }
  updatePinDots();

  if (currentPin.length === 4) {
    checkPinCode();
  }
}

function checkPinCode() {
  if (currentPin === PIN_CODE) {
    unlockSuccess();
  } else {
    lockCard.style.animation = "shake 0.4s ease";
    pinErr.classList.remove("hidden");
    setTimeout(() => {
      currentPin = "";
      updatePinDots();
      lockCard.style.animation = "";
    }, 700);
  }
}

document.getElementById("numpad").addEventListener("click", e => {
  const btn = e.target.closest(".num-key");
  if (btn) handleKeyInput(btn.dataset.val);
});

window.addEventListener("keydown", e => {
  if (!lockScreen || lockScreen.classList.contains("hidden")) return;
  if (e.key >= "0" && e.key <= "9") handleKeyInput(e.key);
  else if (e.key === "Backspace") handleKeyInput("DEL");
  else if (e.key === "Escape" || e.key === "c" || e.key === "C") handleKeyInput("C");
});

function unlockSuccess() {
  for (let i = 0; i < 4; i++) {
    setTimeout(() => {
      spawnFirework(Math.random() * window.innerWidth, Math.random() * window.innerHeight * 0.5);
    }, i * 200);
  }

  lockSuccess.classList.remove("hidden");

  let transitionTimer = setTimeout(transitionToMainPage, 2600);

  document.getElementById("btn-enter-now").addEventListener("click", () => {
    clearTimeout(transitionTimer);
    transitionToMainPage();
  }, { once: true });
}

function transitionToMainPage() {
  lockScreen.style.opacity = "0";
  lockScreen.style.pointerEvents = "none";

  setTimeout(() => {
    lockScreen.classList.add("hidden");
    const mainContent = document.getElementById("main-content");
    mainContent.classList.remove("hidden");
    requestAnimationFrame(() => {
      mainContent.classList.add("visible");
    });
    initMainPageFeatures();
  }, 700);
}

// ============================================================
// 3. ENGINE PHÁO HOA LIÊN TỤC (60 FPS, SIÊU MƯỢT)
// ============================================================
const FW_COLORS = [
  "#f5c842", "#ff385c", "#ff9f1c", "#2ec4b6", "#a855f7",
  "#38bdf8", "#ff007f", "#34d399", "#facc15", "#ffffff"
];

let fwCanvas, fwCtx, fwW, fwH;
let fwParticles = [];
let fwRockets = [];
const MAX_PARTICLES = IS_MOBILE ? 85 : 120;

(function initFireworksEngine() {
  fwCanvas = document.getElementById("fireworks-canvas");
  if (!fwCanvas) return;
  fwCtx = fwCanvas.getContext("2d");

  function resize() {
    fwW = fwCanvas.width = window.innerWidth;
    fwH = fwCanvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  setInterval(launchRocket, 1400);
  requestAnimationFrame(fireworkLoop);

  window.addEventListener("pointerdown", e => {
    if (e.target.closest(".num-key") || e.target.closest(".btn") || e.target.closest(".interactive-flame") || e.target.closest(".alpha-cube-item") || e.target.closest(".luxury-card-wrap")) return;
    spawnFirework(e.clientX, e.clientY);
  });
})();

function launchRocket() {
  if (fwRockets.length > 2) return;
  fwRockets.push({
    x: fwW * (Math.random() * 0.7 + 0.15),
    y: fwH + 10,
    vx: (Math.random() - 0.5) * 1.8,
    vy: -(Math.random() * 4 + (IS_MOBILE ? 8 : 10)),
    targetY: fwH * (Math.random() * 0.35 + 0.1),
    color: FW_COLORS[Math.floor(Math.random() * FW_COLORS.length)]
  });
}

function spawnFirework(x, y) {
  if (fwParticles.length >= MAX_PARTICLES - 28) {
    fwParticles.splice(0, 28);
  }
  const color = FW_COLORS[Math.floor(Math.random() * FW_COLORS.length)];
  const count = IS_MOBILE ? 24 : 32;

  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
    const speed = Math.random() * 4.2 + 2.0;
    fwParticles.push({
      x, y,
      ox: x, oy: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      color: Math.random() > 0.25 ? color : FW_COLORS[Math.floor(Math.random() * FW_COLORS.length)],
      alpha: 1,
      decay: Math.random() * 0.018 + 0.015,
      size: Math.random() * 2 + 1.5
    });
  }
}

function fireworkLoop() {
  fwCtx.clearRect(0, 0, fwW, fwH);
  fwCtx.globalCompositeOperation = "lighter";

  for (let i = fwRockets.length - 1; i >= 0; i--) {
    const r = fwRockets[i];
    r.x += r.vx;
    r.y += r.vy;
    r.vy += 0.08;

    fwCtx.fillStyle = r.color;
    fwCtx.beginPath();
    fwCtx.arc(r.x, r.y, 2.2, 0, Math.PI * 2);
    fwCtx.fill();

    if (r.y <= r.targetY || r.vy >= -1) {
      spawnFirework(r.x, r.y);
      fwRockets.splice(i, 1);
    }
  }

  for (let i = fwParticles.length - 1; i >= 0; i--) {
    const p = fwParticles[i];
    p.ox = p.x;
    p.oy = p.y;
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.075;
    p.vx *= 0.985;
    p.alpha -= p.decay;

    if (p.alpha <= 0) {
      fwParticles.splice(i, 1);
      continue;
    }

    fwCtx.strokeStyle = p.color;
    fwCtx.globalAlpha = p.alpha;
    fwCtx.lineWidth = p.size;
    fwCtx.beginPath();
    fwCtx.moveTo(p.ox, p.oy);
    fwCtx.lineTo(p.x, p.y);
    fwCtx.stroke();
  }

  fwCtx.globalCompositeOperation = "source-over";
  fwCtx.globalAlpha = 1;

  requestAnimationFrame(fireworkLoop);
}

// ============================================================
// 4. CÁC TÍNH NĂNG TRANG CHÍNH
// ============================================================
function initMainPageFeatures() {
  initDatesAndCountdown();
  initHeroStars();
  initBalloons();
  initInteractiveCandles();
  initAlphaCubes();
  initGreetingCardModal();
}

// NGÀY THÁNG VÀ ĐẾM NGƯỢC (ĐÃ ĐƯỢC PHÓNG TO RÕ RÀNG)
function initDatesAndCountdown() {
  const now = new Date();
  document.getElementById("footer-year").textContent = `© ${now.getFullYear()} Dành tặng Bố Như`;

  const daysOfWeek = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
  const months = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];

  // Dòng ngày hôm nay to rõ: "Thứ năm, 17 Tháng 9"
  document.getElementById("today-date").textContent = 
    `${daysOfWeek[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]}`;

  const isTodayBirthday = (now.getMonth() === BDAY_MONTH - 1 && now.getDate() === BDAY_DAY);
  const badge = document.getElementById("bday-notice");
  if (isTodayBirthday) {
    badge.textContent = "🎉 Hôm nay là sinh nhật Bố Như!";
  } else {
    badge.textContent = "🎂 Ngày sinh nhật: 17/09";
  }

  function updateCountdown() {
    const cur = new Date();
    let nextBday = new Date(cur.getFullYear(), BDAY_MONTH - 1, BDAY_DAY);
    if (cur.getMonth() === BDAY_MONTH - 1 && cur.getDate() === BDAY_DAY) {
      document.getElementById("cd-msg").classList.remove("hidden");
      return;
    }
    if (cur >= nextBday) nextBday.setFullYear(cur.getFullYear() + 1);

    const diff = nextBday - cur;
    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const m = Math.floor(totalDays / 30);
    const d = totalDays % 30;
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const min = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    document.getElementById("cd-months").textContent = String(m).padStart(2, "0");
    document.getElementById("cd-days").textContent   = String(d).padStart(2, "0");
    document.getElementById("cd-hours").textContent  = String(h).padStart(2, "0");
    document.getElementById("cd-mins").textContent   = String(min).padStart(2, "0");
    document.getElementById("cd-secs").textContent   = String(s).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// SAO HERO
function initHeroStars() {
  const container = document.getElementById("hero-stars");
  if (!container) return;
  for (let i = 0; i < 45; i++) {
    const star = document.createElement("div");
    star.className = "star-dot";
    const sz = Math.random() * 2.5 + 1;
    star.style.cssText = `
      width: ${sz}px; height: ${sz}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      --td: ${Math.random() * 2 + 1.2}s;
      animation-delay: ${Math.random() * 2}s;
    `;
    container.appendChild(star);
  }
}

// BÓNG BAY LIÊN TỤC
function initBalloons() {
  const container = document.getElementById("balloons-container");
  const colors = ["#ec4899", "#f59e0b", "#8b5cf6", "#10b981", "#06b6d4", "#f43f5e", "#ffd166", "#06d6a0"];
  for (let i = 0; i < 10; i++) {
    const b = document.createElement("div");
    b.className = "balloon";
    const col = colors[i % colors.length];
    b.style.background = `radial-gradient(circle at 35% 30%, #fff 0%, ${col} 65%)`;
    b.style.left = `${(i * 10) + Math.random() * 6}%`;
    b.style.animationDuration = `${Math.random() * 6 + 12}s`;
    b.style.animationDelay = `${Math.random() * 10}s`;
    container.appendChild(b);
  }
}

// ============================================================
// 5. THỔI NẾN SINH NHẬT
// ============================================================
function initInteractiveCandles() {
  const layer = document.getElementById("candles-layer");
  const countEl = document.getElementById("candles-left");
  const btnBlowAll = document.getElementById("btn-blow-all");
  const btnRelight = document.getElementById("btn-relight");
  const banner = document.getElementById("cake-wishes-banner");
  const cakeGlow = document.getElementById("cake-glow");

  const CANDLE_POSITIONS = [
    { x: 36.4, y: 37.8 },
    { x: 40.5, y: 38.0 },
    { x: 44.8, y: 38.2 },
    { x: 49.8, y: 38.0 },
    { x: 54.8, y: 38.2 },
    { x: 59.8, y: 38.0 },
    { x: 62.5, y: 37.8 }
  ];

  let unblownCount = CANDLE_POSITIONS.length;
  countEl.textContent = unblownCount;
  const flameEls = [];

  CANDLE_POSITIONS.forEach((pos, idx) => {
    const flameWrap = document.createElement("div");
    flameWrap.className = "interactive-flame";
    flameWrap.style.left = `${pos.x}%`;
    flameWrap.style.top = `${pos.y}%`;
    flameWrap.innerHTML = `<span class="flame-particle">🔥</span>`;

    flameWrap.addEventListener("click", () => blowFlame(flameWrap));
    layer.appendChild(flameWrap);
    flameEls.push(flameWrap);
  });

  function blowFlame(flameEl) {
    if (flameEl.classList.contains("blown")) return;
    flameEl.classList.add("blown");

    const smoke = document.createElement("span");
    smoke.className = "smoke-puff";
    smoke.textContent = "💨";
    flameEl.appendChild(smoke);
    setTimeout(() => smoke.remove(), 800);

    unblownCount--;
    countEl.textContent = unblownCount;

    if (unblownCount === 0) {
      triggerCandlesCelebration();
    }
  }

  btnBlowAll.addEventListener("click", () => {
    flameEls.forEach(f => {
      if (!f.classList.contains("blown")) {
        f.classList.add("blown");
        const smoke = document.createElement("span");
        smoke.className = "smoke-puff";
        smoke.textContent = "💨";
        f.appendChild(smoke);
        setTimeout(() => smoke.remove(), 800);
      }
    });
    unblownCount = 0;
    countEl.textContent = "0";
    triggerCandlesCelebration();
  });

  btnRelight.addEventListener("click", () => {
    flameEls.forEach(f => f.classList.remove("blown"));
    unblownCount = CANDLE_POSITIONS.length;
    countEl.textContent = unblownCount;
    btnRelight.classList.add("hidden");
    btnBlowAll.classList.remove("hidden");
    banner.classList.add("hidden");
    cakeGlow.style.opacity = "1";
  });

  function triggerCandlesCelebration() {
    btnBlowAll.classList.add("hidden");
    btnRelight.classList.remove("hidden");
    banner.classList.remove("hidden");
    cakeGlow.style.opacity = "0.2";

    launchCelebrationShower();

    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        spawnFirework(Math.random() * window.innerWidth, Math.random() * window.innerHeight * 0.45);
      }, i * 180);
    }

    setTimeout(() => {
      document.getElementById("memories-section").scrollIntoView({ behavior: "smooth" });
    }, 1400);
  }
}

function launchCelebrationShower() {
  const canvas = document.getElementById("celebration-canvas");
  if (!canvas) return;
  canvas.classList.add("active");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confettis = [];
  for (let i = 0; i < 80; i++) {
    confettis.push({
      x: window.innerWidth * 0.5 + (Math.random() - 0.5) * 200,
      y: window.innerHeight * 0.5,
      vx: (Math.random() - 0.5) * 14,
      vy: -(Math.random() * 12 + 6),
      size: Math.random() * 6 + 4,
      color: FW_COLORS[Math.floor(Math.random() * FW_COLORS.length)],
      rot: Math.random() * Math.PI,
      vRot: (Math.random() - 0.5) * 0.2,
      life: 1,
      decay: Math.random() * 0.008 + 0.006
    });
  }

  let frames = 0;
  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let anyAlive = false;

    for (const c of confettis) {
      if (c.life <= 0) continue;
      anyAlive = true;
      c.x += c.vx;
      c.y += c.vy;
      c.vy += 0.22;
      c.vx *= 0.98;
      c.rot += c.vRot;
      c.life -= c.decay;

      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(c.rot);
      ctx.globalAlpha = c.life;
      ctx.fillStyle = c.color;
      ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 1.4);
      ctx.restore();
    }

    frames++;
    if (anyAlive && frames < 240) {
      requestAnimationFrame(loop);
    } else {
      canvas.classList.remove("active");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  loop();
}

// ============================================================
// 6. 8 HỘP KỶ NIỆM 3D DI CHUYỂN & XOAY THEO ĐƯỜNG ALPHA (α) CẦU VỒNG
// ============================================================
let activeCubeModalItem = null;

function initAlphaCubes() {
  const track = document.getElementById("cubes-track");
  const scene = document.getElementById("alpha-scene");
  if (!track) return;

  const cubeEls = [];

  // Tạo 8 khối hộp 3D
  CUBE_ITEMS.forEach((item, idx) => {
    const cubeWrap = document.createElement("div");
    cubeWrap.className = "alpha-cube-item";
    cubeWrap.dataset.index = idx;

    // 6 mặt của khối hộp
    const faceClasses = ["face-f", "face-b", "face-r", "face-l", "face-t", "face-d"];
    let facesHtml = "";
    faceClasses.forEach(fc => {
      facesHtml += `
        <div class="cube-face-mini ${fc}">
          <div class="cube-face-sheen"></div>
          <img src="${item.photo}" class="cube-face-img" alt="${item.title}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
          <div class="cube-face-fallback" style="--cube-bg: ${item.color}; display: none;">
            <span class="c-emoji">${item.emoji}</span>
            <span class="c-tag">${item.title}</span>
          </div>
        </div>
      `;
    });

    cubeWrap.innerHTML = facesHtml;

    // Khi nhấp hoặc chạm vào hộp -> Mở thiệp chúc mừng sinh nhật
    cubeWrap.addEventListener("click", () => {
      openLuxuryCard(item);
    });

    track.appendChild(cubeWrap);
    cubeEls.push(cubeWrap);
  });

  // Vật lý chuyển động trên quỹ đạo hình Alpha (α)
  let alphaTime = 0;
  let isSceneDragging = false;
  let startX = 0, startY = 0;
  let sceneRotX = 12, sceneRotY = 0;

  scene.addEventListener("pointerdown", e => {
    if (e.target.closest(".alpha-cube-item")) return;
    isSceneDragging = true;
    startX = e.clientX;
    startY = e.clientY;
  });

  window.addEventListener("pointermove", e => {
    if (!isSceneDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    sceneRotY += dx * 0.4;
    sceneRotX -= dy * 0.4;
    startX = e.clientX;
    startY = e.clientY;
  });

  window.addEventListener("pointerup", () => { isSceneDragging = false; });
  window.addEventListener("pointercancel", () => { isSceneDragging = false; });

  // Vòng lặp chuyển động 60fps mượt mà
  function animateAlphaTrack() {
    alphaTime += 0.007; // Tốc độ di chuyển êm dịu

    const scaleX = IS_MOBILE ? 150 : 255;
    const scaleY = IS_MOBILE ? 80 : 130;
    const scaleZ = IS_MOBILE ? 90 : 160;

    cubeEls.forEach((cube, i) => {
      // Góc pha phân bố đều 8 hộp dọc theo đường cong
      const theta = alphaTime + (i * Math.PI * 2) / 8;

      // Phương trình tham số đường cong hình Alpha (α) trong không gian 3D
      // X tạo 2 cánh lượn, Y tạo nút giao chữ alpha, Z tạo chiều sâu không gian
      const x = scaleX * Math.cos(theta);
      const y = scaleY * Math.sin(2 * theta) * 0.65;
      const z = scaleZ * Math.sin(theta);

      // Tự xoay 3D riêng biệt của từng hộp
      const rotX = (theta * 50 + i * 45) % 360;
      const rotY = (theta * 70 + i * 35) % 360;
      const rotZ = (theta * 30) % 360;

      // Hiệu ứng cầu vồng nhẹ (shimmering rainbow hue)
      const rainbowHue = ((alphaTime * 60) + (i * 45)) % 360;
      cube.style.setProperty("--rainbow-col", `hsl(${rainbowHue}, 95%, 68%)`);

      cube.style.transform = `
        translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px)
        rotateX(${rotX.toFixed(1)}deg)
        rotateY(${rotY.toFixed(1)}deg)
        rotateZ(${rotZ.toFixed(1)}deg)
      `;
    });

    if (!isSceneDragging) {
      sceneRotY += 0.05; // Xoay nhẹ không gian tổng thể
    }
    track.style.transform = `rotateX(${sceneRotX.toFixed(1)}deg) rotateY(${sceneRotY.toFixed(1)}deg)`;

    requestAnimationFrame(animateAlphaTrack);
  }
  animateAlphaTrack();
}

// ============================================================
// 7. THIỆP CHÚC MỪNG SINH NHẬT 3D CAO CẤP (LUXURY GREETING CARD)
// Màu sắc sáng hơn, nhiều hiệu ứng đẹp, animation thích thú
// ============================================================
function initGreetingCardModal() {
  const modal = document.getElementById("card-modal");
  const backdrop = document.getElementById("card-backdrop");
  const closeBtn = document.getElementById("card-close");
  const loveBtn = document.getElementById("btn-love-burst");

  closeBtn.addEventListener("click", closeLuxuryCard);
  backdrop.addEventListener("click", closeLuxuryCard);

  // Hiệu ứng nổ tim ngập tràn khi bấm "Con yêu Bố nhiều lắm ❤️"
  loveBtn.addEventListener("click", e => {
    e.stopPropagation();
    triggerLoveBurst(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2);
  });
}

function openLuxuryCard(item) {
  activeCubeModalItem = item;
  const modal = document.getElementById("card-modal");
  const titleEl = document.getElementById("card-title");
  const msgEl = document.getElementById("card-message");
  const photoBox = document.getElementById("card-photo-box");

  titleEl.textContent = item.title;
  msgEl.textContent = item.wish;

  photoBox.innerHTML = `
    <img src="${item.photo}" alt="${item.title}" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
    <div class="card-emoji-big" style="display: none;">${item.emoji}</div>
  `;

  modal.classList.remove("hidden");

  // Bắn nhẹ chùm pháo hoa chúc mừng tấm thiệp
  spawnFirework(window.innerWidth * 0.5, window.innerHeight * 0.35);
}

function closeLuxuryCard() {
  const modal = document.getElementById("card-modal");
  modal.classList.add("hidden");
}

// HIỆU ỨNG THẢ NGÀN TRÁI TIM BAY KHI NHẤN NÚT
function triggerLoveBurst(originX, originY) {
  const hearts = ["❤️", "💖", "💕", "💗", "💓", "💝", "✨"];
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement("div");
    heart.className = "floating-heart-particle";
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = `${originX + (Math.random() - 0.5) * 100}px`;
    heart.style.top = `${originY + (Math.random() - 0.5) * 60}px`;
    heart.style.setProperty("--rx", `${(Math.random() - 0.5) * 140}px`);
    heart.style.animationDelay = `${Math.random() * 0.25}s`;
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 1800);
  }
}

// ============================================================
// 8. HỆ THỐNG PHÁT NHẠC SINH NHẬT (AUTOPLAY & WEB AUDIO)
// ============================================================
const bgAudio = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");
let isAudioPlaying = false;
let audioCtx = null;
let melodyTimeout = null;

function triggerMusicAutoplay() {
  if (isAudioPlaying) return;

  if (bgAudio) {
    bgAudio.play().then(() => {
      isAudioPlaying = true;
      musicBtn.classList.add("playing");
    }).catch(() => {
      playWebAudioMelody();
    });
  } else {
    playWebAudioMelody();
  }
}

window.addEventListener("load", () => {
  triggerMusicAutoplay();
});

const firstInteractionEvents = ["click", "touchstart", "keydown", "pointerdown"];
function handleFirstInteraction() {
  triggerMusicAutoplay();
  firstInteractionEvents.forEach(evt => window.removeEventListener(evt, handleFirstInteraction));
}
firstInteractionEvents.forEach(evt => window.addEventListener(evt, handleFirstInteraction, { passive: true }));

musicBtn.addEventListener("click", () => {
  if (isAudioPlaying) {
    stopAllMusic();
  } else {
    triggerMusicAutoplay();
  }
});

function stopAllMusic() {
  if (bgAudio) bgAudio.pause();
  if (melodyTimeout) clearTimeout(melodyTimeout);
  musicBtn.classList.remove("playing");
  isAudioPlaying = false;
}

function playWebAudioMelody() {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    isAudioPlaying = true;
    musicBtn.classList.add("playing");

    const melody = [
      { f: 261.63, d: 0.35 }, { f: 261.63, d: 0.25 }, { f: 293.66, d: 0.6 },
      { f: 261.63, d: 0.6 },  { f: 349.23, d: 0.6 },  { f: 329.63, d: 1.0 },
      { f: 261.63, d: 0.35 }, { f: 261.63, d: 0.25 }, { f: 293.66, d: 0.6 },
      { f: 261.63, d: 0.6 },  { f: 392.00, d: 0.6 },  { f: 349.23, d: 1.0 },
      { f: 261.63, d: 0.35 }, { f: 261.63, d: 0.25 }, { f: 523.25, d: 0.6 },
      { f: 440.00, d: 0.6 },  { f: 349.23, d: 0.6 },  { f: 329.63, d: 0.6 }, { f: 293.66, d: 0.8 },
      { f: 466.16, d: 0.35 }, { f: 466.16, d: 0.25 }, { f: 440.00, d: 0.6 },
      { f: 349.23, d: 0.6 },  { f: 392.00, d: 0.6 },  { f: 349.23, d: 1.2 }
    ];

    let noteIdx = 0;
    function playStep() {
      if (!isAudioPlaying) return;
      const n = melody[noteIdx];
      playTone(n.f, n.d);
      noteIdx = (noteIdx + 1) % melody.length;
      melodyTimeout = setTimeout(playStep, n.d * 1000 + 70);
    }
    playStep();
  } catch (err) {}
}

function playTone(freq, duration) {
  if (!audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;

    gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {}
}
