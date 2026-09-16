"use strict";

// ============================================================
// 🎂 CẤU HÌNH & DỮ LIỆU SINH NHẬT BỐ NHƯ
// ============================================================
const BDAY_MONTH = 9;      // Tháng 9
const BDAY_DAY   = 17;     // Ngày 17
const PIN_CODE   = "1709"; // Mật khẩu ngày sinh: 17/09

// Dữ liệu 6 mặt của Khối Hộp Kỷ Niệm 3D
// Người dùng có thể thêm ảnh vào thư mục photos/ với tên p1.jpg -> p6.jpg
const CUBE_FACES = [
  {
    photo: "photos/p1.jpg",
    title: "Tình Yêu Của Bố",
    sub: "Kỷ niệm yêu thương",
    wish: "Bố Như ơi, con yêu Bố nhiều lắm! Cảm ơn Bố vì cả cuộc đời đã luôn là điểm tựa vững chãi nhất cho cả gia đình chúng con.",
    emoji: "❤️",
    color: "#ec4899"
  },
  {
    photo: "photos/p2.jpg",
    title: "Người Hùng Của Con",
    sub: "Che chở bão giông",
    wish: "Bố là người hùng thầm lặng – không khoác áo choàng nhưng luôn dang rộng vòng tay che chở cho con qua mọi thử thách cuộc đời.",
    emoji: "🌟",
    color: "#f59e0b"
  },
  {
    photo: "photos/p3.jpg",
    title: "Chúc Thọ Bố Như",
    sub: "Tuổi mới bình an",
    wish: "Kính chúc Bố Như bước sang tuổi mới luôn mạnh khỏe, tràn ngập niềm vui, an nhiên và đong đầy hạnh phúc bên con cháu!",
    emoji: "🎂",
    color: "#8b5cf6"
  },
  {
    photo: "photos/p4.jpg",
    title: "Bàn Tay Che Chở",
    sub: "Hy sinh thầm lặng",
    wish: "Cảm ơn những nếp nhăn và đôi bàn tay chai sạn của Bố – tất cả sự hy sinh thầm lặng suốt năm tháng ấy con luôn khắc ghi trong tim.",
    emoji: "🌿",
    color: "#10b981"
  },
  {
    photo: "photos/p5.jpg",
    title: "Tình Thấu Biển Trời",
    sub: "Mái ấm bình yên",
    wish: "Tình thương của Bố như núi cao biển rộng, ấm áp và bao la. Dù con có đi xa đến đâu, về bên Bố vẫn là nơi bình yên và hạnh phúc nhất!",
    emoji: "🏔️",
    color: "#06b6d4"
  },
  {
    photo: "photos/p6.jpg",
    title: "Bách Niên Giai Lão",
    sub: "Mãi mãi bên con",
    wish: "Chúc Bố Như sống lâu trăm tuổi, luôn mỉm cười rạng rỡ, vạn sự như ý và mãi là niềm tự hào lớn nhất của cuộc đời chúng con! ❤️",
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
    { fill: "#f43f5e", type: "rose" },     // Hồng đỏ
    { fill: "#fbcfe8", type: "sakura" },   // Hoa đào
    { fill: "#fb7185", type: "rose" },     // Hoa hồng đào
    { fill: "#4ade80", type: "leaf" },     // Lá xanh non
    { fill: "#22c55e", type: "leaf" },     // Lá xanh tươi
    { fill: "#fef08a", type: "yellow" }    // Cánh hoa vàng
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
        // Vẽ lá cây
        ctx.ellipse(0, 0, p.sz * 0.5, p.sz * 1.2, Math.PI / 4, 0, Math.PI * 2);
      } else {
        // Vẽ cánh hoa mềm
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

// Tạo các ngôi sao vàng lấp lánh ở nền sáng
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
  // Cố gắng mở nhạc ngay khi bấm phím
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
  // Bắn pháo hoa rực rỡ chúc mừng
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

  // Phóng tên lửa liên tục
  setInterval(launchRocket, 1400);
  requestAnimationFrame(fireworkLoop);

  // Chạm/click bất kỳ đâu để nổ pháo hoa tại điểm chạm
  window.addEventListener("pointerdown", e => {
    if (e.target.closest(".num-key") || e.target.closest(".btn") || e.target.closest(".interactive-flame")) return;
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
  init3DCube();
}

// NGÀY THÁNG VÀ ĐẾM NGƯỢC
function initDatesAndCountdown() {
  const now = new Date();
  document.getElementById("footer-year").textContent = `© ${now.getFullYear()} Dành tặng Bố Như`;

  const daysOfWeek = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
  const months = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];

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
// 5. THỔI NẾN SINH NHẬT (CÂN CHỈNH CHUẨN XÁC THEO ẢNH BÁNH)
// ============================================================
function initInteractiveCandles() {
  const layer = document.getElementById("candles-layer");
  const countEl = document.getElementById("candles-left");
  const btnBlowAll = document.getElementById("btn-blow-all");
  const btnRelight = document.getElementById("btn-relight");
  const banner = document.getElementById("cake-wishes-banner");
  const cakeGlow = document.getElementById("cake-glow");

  // Vị trí 7 ngọn nến trên đỉnh tầng bánh kem thật trong ảnh cake.jpg
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
    flameWrap.innerHTML = `
      <span class="flame-particle">🔥</span>
    `;

    flameWrap.addEventListener("click", () => blowFlame(flameWrap));
    layer.appendChild(flameWrap);
    flameEls.push(flameWrap);
  });

  function blowFlame(flameEl) {
    if (flameEl.classList.contains("blown")) return;
    flameEl.classList.add("blown");

    // Tạo khói bốc lên
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

    // Kích hoạt mưa confetti và sao tiên nữ rực rỡ tưng bừng
    launchCelebrationShower();

    // Bắn liên tiếp pháo hoa
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        spawnFirework(Math.random() * window.innerWidth, Math.random() * window.innerHeight * 0.45);
      }, i * 180);
    }

    // Tự động cuộn mượt mà đến Khối Hộp Kỷ Niệm 3D
    setTimeout(() => {
      document.getElementById("memories-section").scrollIntoView({ behavior: "smooth" });
    }, 1400);
  }
}

// HIỆU ỨNG TƯNG BỪNG: MƯA CONFETTI & SAO TIÊN NỮ
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
      c.vy += 0.22; // Trọng lực rơi
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
// 6. KHỐI HỘP KỶ NIỆM 3D (XOAY FULL GÓC 360°, KHÔNG BỊ MẤT)
// ============================================================
function init3DCube() {
  const cube = document.getElementById("cube-3d");
  const scene = document.getElementById("cube-scene");
  const popup = document.getElementById("cube-popup");
  const popupClose = document.getElementById("popup-close");
  const popupMedia = document.getElementById("popup-media");
  const popupTitle = document.getElementById("popup-title");
  const popupMsg = document.getElementById("popup-msg");

  // Nạp nội dung cho 6 mặt của khối lập phương
  CUBE_FACES.forEach((item, idx) => {
    const faceEl = document.getElementById(`face-${idx}`);
    if (!faceEl) return;

    faceEl.innerHTML = `
      <img src="${item.photo}" class="face-img" alt="${item.title}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
      <div class="face-placeholder" style="--face-bg: ${item.color}; display: none;">
        <span class="face-emoji">${item.emoji}</span>
      </div>
      <div class="face-caption">
        <div class="face-caption-title">${item.title}</div>
        <div class="face-caption-sub">${item.sub}</div>
      </div>
    `;

    // Mở popup chi tiết khi nhấp vào mặt hộp
    faceEl.closest(".cube-face").addEventListener("click", () => {
      openCubePopup(item);
    });
  });

  function openCubePopup(item) {
    popupTitle.textContent = item.title;
    popupMsg.textContent = item.wish;
    popupMedia.innerHTML = `
      <img src="${item.photo}" alt="${item.title}" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
      <div class="popup-emoji" style="display: none;">${item.emoji}</div>
    `;
    popup.classList.remove("hidden");
  }

  popupClose.addEventListener("click", () => popup.classList.add("hidden"));
  popup.addEventListener("click", e => {
    if (e.target === popup) popup.classList.add("hidden");
  });

  // Vật lý xoay 3D Full góc mượt mà
  let rotX = -15;
  let rotY = 25;
  let isDragging = false;
  let startX = 0, startY = 0;
  let lastDeltaX = 0, lastDeltaY = 0;

  scene.addEventListener("pointerdown", e => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    lastDeltaX = 0;
    lastDeltaY = 0;
  });

  window.addEventListener("pointermove", e => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    rotY += dx * 0.45;
    rotX -= dy * 0.45;

    startX = e.clientX;
    startY = e.clientY;
    lastDeltaX = dx;
    lastDeltaY = dy;
  });

  window.addEventListener("pointerup", () => { isDragging = false; });
  window.addEventListener("pointercancel", () => { isDragging = false; });

  // Vòng lặp xoay tự nhiên liên tục
  function animateCube() {
    if (!isDragging) {
      rotY += 0.35; // Xoay chậm rãi quanh trục Y
      rotX += Math.sin(Date.now() * 0.001) * 0.08; // Dao động nhẹ trục X tạo chiều sâu 3D
    }
    cube.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
    requestAnimationFrame(animateCube);
  }
  animateCube();
}

// ============================================================
// 7. HỆ THỐNG PHÁT NHẠC SINH NHẬT (AUTOPLAY & WEB AUDIO)
// ============================================================
const bgAudio = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");
let isAudioPlaying = false;
let audioCtx = null;
let melodyTimeout = null;

function triggerMusicAutoplay() {
  if (isAudioPlaying) return;

  // Thử phát bằng file audio trước
  if (bgAudio) {
    bgAudio.play().then(() => {
      isAudioPlaying = true;
      musicBtn.classList.add("playing");
    }).catch(() => {
      // Nếu browser chặn hoặc chưa có file music.mp3, chuyển sang Web Audio API
      playWebAudioMelody();
    });
  } else {
    playWebAudioMelody();
  }
}

// Thử phát ngay khi load trang
window.addEventListener("load", () => {
  triggerMusicAutoplay();
});

// Lắng nghe tương tác đầu tiên để vượt qua chính sách Autoplay của Browser
const firstInteractionEvents = ["click", "touchstart", "keydown", "pointerdown"];
function handleFirstInteraction() {
  triggerMusicAutoplay();
  firstInteractionEvents.forEach(evt => window.removeEventListener(evt, handleFirstInteraction));
}
firstInteractionEvents.forEach(evt => window.addEventListener(evt, handleFirstInteraction, { passive: true }));

// Nút bật / tắt nhạc
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

// Web Audio API Synthesizer bài hát Happy Birthday du dương
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
  } catch (err) {
    // Không làm gián đoạn nếu trình duyệt chưa hỗ trợ
  }
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
