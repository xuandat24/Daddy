"use strict";

// ============================================================
// 🎂 CẤU HÌNH & DỮ LIỆU SINH NHẬT BỐ NHƯ
// ============================================================
const BDAY_MONTH = 9;      // Tháng 9
const BDAY_DAY   = 17;     // Ngày 17
const PIN_CODE   = "1709"; // Mật khẩu ngày sinh: 17/09

// 8 Hộp Kỷ Niệm 3D với 8 chủ đề lời chúc ý nghĩa, hiện đại và sâu sắc
// Liên kết chính xác 8 ảnh thực tế (đã chuyển đổi JPEG chất lượng cao) trong thư mục photos/:
const CUBE_ITEMS = [
  {
    photo: "photos/IMG_0409 (1).jpg",
    title: "Sức Khỏe Vàng & Dẻo Dai",
    sub: "Thân tâm an lạc",
    wish: "Kính chúc Bố Như luôn dồi dào sức khỏe, đôi chân luôn vững vàng, mỗi ngày thức dậy đều tràn đầy năng lượng tươi mới và sự dẻo dai.",
    emoji: "💪",
    color: "#ec4899"
  },
  {
    photo: "photos/IMG_0409 (2).jpg",
    title: "Niềm Vui & Tiếng Cười",
    sub: "Nụ cười rạng rỡ",
    wish: "Chúc Bố mỗi ngày trôi qua đều ngập tràn tiếng cười, tìm thấy niềm vui trong từng khoảnh khắc giản dị và lúc nào tâm hồn cũng trẻ trung, yêu đời.",
    emoji: "😊",
    color: "#f59e0b"
  },
  {
    photo: "photos/IMG_0409 (3).jpg",
    title: "Công Việc Thuận Lợi & Hanh Thông",
    sub: "Vạn sự hanh thông",
    wish: "Chúc cho mọi dự định và công việc của Bố luôn xuôi chèo mát mái, vạn sự hanh thông, gặt hái nhiều thành quả tốt đẹp và trọn vẹn ý nguyện.",
    emoji: "💼",
    color: "#8b5cf6"
  },
  {
    photo: "photos/IMG_0409 (4).jpg",
    title: "Bình An & Thư Thái Tâm Hồn",
    sub: "An nhiên tự tại",
    wish: "Chúc Bố luôn có những phút giây an yên, tâm hồn thư thái nhẹ nhàng, không còn những âu lo bộn bề, mỗi ngày đều là một ngày bình an trọn vẹn.",
    emoji: "🌿",
    color: "#10b981"
  },
  {
    photo: "photos/IMG_0409 (5).jpg",
    title: "Cuộc Sống Viên Mãn & May Mắn",
    sub: "Hạnh phúc đủ đầy",
    wish: "Chúc cuộc sống của Bố luôn ngập tràn điều may mắn, ấm no sung túc, gia đạo an vui và được tận hưởng trọn vẹn những quả ngọt của cuộc đời.",
    emoji: "🍀",
    color: "#06b6d4"
  },
  {
    photo: "photos/IMG_0409 (6).jpg",
    title: "Gia Đình Sum Vầy & Ấm Áp",
    sub: "Tổ ấm yêu thương",
    wish: "Cảm ơn Bố vì luôn là ngọn lửa ấm che chở và sưởi ấm gia đình. Chúc tổ ấm của chúng ta mãi mãi sum vầy, thuận hòa và đong đầy tình yêu thương.",
    emoji: "🏠",
    color: "#f97316"
  },
  {
    photo: "photos/IMG_0409 (7).jpg",
    title: "Điểm Tựa Vững Chãi Của Con",
    sub: "Niềm tự hào vô bờ",
    wish: "Bố luôn là tấm gương sáng, là điểm tựa vững chãi nhất để con tự tin bước đi. Con biết ơn và tự hào vô cùng vì được làm con của Bố Như!",
    emoji: "🏔️",
    color: "#d946ef"
  },
  {
    photo: "photos/IMG_0409 (8).jpg",
    title: "Tuổi Mới Rực Rỡ & Hạnh Phúc",
    sub: "Mừng sinh nhật Bố",
    wish: "Chúc mừng sinh nhật Bố Như thân yêu! Chúc Bố bước sang tuổi mới với muôn vàn phước lành, niềm vui nhân đôi và hạnh phúc đong đầy bên con cháu! ❤️",
    emoji: "🎂",
    color: "#f43f5e"
  }
];

const IS_MOBILE = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || window.innerWidth < 650;

// ============================================================
// 1. HOA ĐÀO & LÁ HOA RƠI NHIỀU NHƯ GIÓ (CANVAS PETALS & LEAVES IN THE WIND)
// ============================================================
(function initPetalsWind() {
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
  // Mật độ hoa đào, lá rơi dày dặn, dạt theo gió xuân rực rỡ
  const TOTAL_PETALS = IS_MOBILE ? 60 : 92;
  const PETAL_TYPES = [
    { fill: "#f43f5e", fill2: "#fb7185", type: "sakura" }, // Hoa đào hồng thắm
    { fill: "#fb7185", fill2: "#fda4af", type: "sakura" }, // Hoa đào hồng phấn
    { fill: "#fbcfe8", fill2: "#ffffff", type: "sakura" }, // Cánh hoa đào trắng hồng
    { fill: "#e11d48", fill2: "#be123c", type: "rose" },   // Cánh hoa hồng nhung
    { fill: "#22c55e", fill2: "#4ade80", type: "leaf" },   // Lá xanh tươi non
    { fill: "#16a34a", fill2: "#22c55e", type: "leaf" },   // Lá xanh biếc
    { fill: "#f59e0b", fill2: "#fef08a", type: "gold" }    // Bụi vàng lấp lánh
  ];

  for (let i = 0; i < TOTAL_PETALS; i++) {
    petals.push(createPetal(true));
  }

  function createPetal(randomY) {
    const pt = PETAL_TYPES[Math.floor(Math.random() * PETAL_TYPES.length)];
    return {
      x: Math.random() * (w + 300) - 150,
      y: randomY ? Math.random() * h : -30,
      sz: Math.random() * 8 + 8,
      vx: Math.random() * 2.8 + 2.0, // Gió thổi mạnh sang phải
      vy: Math.random() * 1.8 + 1.2, // Rơi từ từ xuống dưới
      wobble: Math.random() * Math.PI * 2,
      vWobble: Math.random() * 0.05 + 0.02,
      rotX: Math.random() * Math.PI,
      rotY: Math.random() * Math.PI,
      rotZ: Math.random() * Math.PI * 2,
      vRotX: Math.random() * 0.035 + 0.015,
      vRotY: Math.random() * 0.035 + 0.015,
      vRotZ: (Math.random() - 0.5) * 0.04,
      fill: pt.fill,
      fill2: pt.fill2,
      type: pt.type
    };
  }

  let windTime = 0;
  function drawPetals() {
    ctx.clearRect(0, 0, w, h);
    windTime += 0.018;

    // Cơn gió xuân thổi lượn sóng cuồn cuộn
    const windGust = Math.sin(windTime * 1.4) * 3.2 + Math.cos(windTime * 0.8) * 2.0 + 2.2;

    for (let i = 0; i < petals.length; i++) {
      const p = petals[i];
      p.wobble += p.vWobble;
      p.y += p.vy + Math.sin(p.wobble) * 0.6;
      p.x += p.vx + windGust + Math.cos(p.wobble) * 0.8;

      p.rotX += p.vRotX;
      p.rotY += p.vRotY;
      p.rotZ += p.vRotZ;

      // Hết màn hình thì tạo lại bên trái/trên để gió thổi vào liên tục
      if (p.y > h + 30 || p.x > w + 80) {
        petals[i] = createPetal(false);
        petals[i].x = Math.random() * (w * 0.6) - 100;
        continue;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotZ);

      // Tránh scale = 0 tuyệt đối để canvas không bao giờ bị lỗi ma trận
      const sx = Math.sign(Math.cos(p.rotX) || 1) * Math.max(0.15, Math.abs(Math.cos(p.rotX)));
      const sy = Math.sign(Math.sin(p.rotY) || 1) * Math.max(0.15, Math.abs(Math.sin(p.rotY)));
      ctx.scale(sx, sy);

      ctx.globalAlpha = 0.92;

      if (p.type === "leaf") {
        // Vẽ lá cây xanh tươi có sống lá
        const grad = ctx.createLinearGradient(0, -p.sz, 0, p.sz);
        grad.addColorStop(0, p.fill2);
        grad.addColorStop(1, p.fill);
        ctx.fillStyle = grad;

        ctx.beginPath();
        ctx.moveTo(0, -p.sz * 1.3);
        ctx.bezierCurveTo(p.sz * 0.8, -p.sz * 0.5, p.sz * 0.8, p.sz * 0.5, 0, p.sz * 1.3);
        ctx.bezierCurveTo(-p.sz * 0.8, p.sz * 0.5, -p.sz * 0.8, -p.sz * 0.5, 0, -p.sz * 1.3);
        ctx.fill();

        // Gân lá
        ctx.strokeStyle = "rgba(255,255,255,0.45)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, -p.sz);
        ctx.lineTo(0, p.sz);
        ctx.stroke();
      } else if (p.type === "sakura" || p.type === "rose") {
        // Vẽ cánh hoa đào mềm mại hình trái tim/khía
        const grad = ctx.createRadialGradient(0, 0, 1, 0, 0, p.sz * 1.2);
        grad.addColorStop(0, p.fill2);
        grad.addColorStop(0.8, p.fill);
        grad.addColorStop(1, p.fill);
        ctx.fillStyle = grad;

        ctx.beginPath();
        ctx.moveTo(0, p.sz * 1.1);
        ctx.bezierCurveTo(-p.sz * 1.2, p.sz * 0.4, -p.sz * 1.1, -p.sz * 0.8, -p.sz * 0.2, -p.sz * 1.1);
        ctx.bezierCurveTo(0, -p.sz * 0.8, 0, -p.sz * 0.8, p.sz * 0.2, -p.sz * 1.1);
        ctx.bezierCurveTo(p.sz * 1.1, -p.sz * 0.8, p.sz * 1.2, p.sz * 0.4, 0, p.sz * 1.1);
        ctx.fill();
      } else {
        // Hạt bụi vàng lấp lánh
        ctx.fillStyle = p.fill2;
        ctx.shadowColor = "#f59e0b";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(0, 0, p.sz * 0.35, 0, Math.PI * 2);
        ctx.fill();
      }

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
  for (let i = 0; i < 48; i++) {
    const star = document.createElement("div");
    star.className = "bright-star";
    const sz = Math.random() * 3.5 + 2;
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
let isSceneHovered = false;

function initAlphaCubes() {
  const track = document.getElementById("cubes-track");
  const scene = document.getElementById("alpha-scene");
  if (!track) return;

  const cubeEls = [];

  // Tạo 8 khối hộp 3D hiển thị ảnh của người dùng
  CUBE_ITEMS.forEach((item, idx) => {
    const cubeWrap = document.createElement("div");
    cubeWrap.className = "alpha-cube-item";
    cubeWrap.dataset.index = idx;

    const faceClasses = ["face-f", "face-b", "face-r", "face-l", "face-t", "face-d"];
    let facesHtml = "";
    faceClasses.forEach(fc => {
      facesHtml += `
        <div class="cube-face-mini ${fc}">
          <div class="cube-face-sheen"></div>
          <img src="${encodeURI(item.photo)}" class="cube-face-img" alt="${item.title}" onerror="if(!this.dataset.retry){this.dataset.retry='1';this.src='${item.photo}';}else{this.style.display='none';this.nextElementSibling.style.display='flex';}">
          <div class="cube-face-fallback" style="--cube-bg: ${item.color}; display: none;">
            <span class="c-emoji">${item.emoji}</span>
            <span class="c-tag">${item.title}</span>
          </div>
        </div>
      `;
    });

    cubeWrap.innerHTML = facesHtml;

    // Chạm hoặc nhấp vào hộp -> Mở thiệp chúc mừng sinh nhật
    cubeWrap.addEventListener("click", (e) => {
      e.stopPropagation();
      openLuxuryCard(item);
    });

    track.appendChild(cubeWrap);
    cubeEls.push(cubeWrap);
  });

  // Khi người dùng rê chuột vào khu vực các hộp, tự động chậm lại để cực kỳ dễ bấm
  scene.addEventListener("mouseenter", () => { isSceneHovered = true; });
  scene.addEventListener("mouseleave", () => { isSceneHovered = false; });
  scene.addEventListener("touchstart", () => { isSceneHovered = true; }, { passive: true });
  scene.addEventListener("touchend", () => { 
    setTimeout(() => { isSceneHovered = false; }, 1500); 
  }, { passive: true });

  // Kéo xoay tự do trong không gian 3D
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
    sceneRotY += dx * 0.35;
    sceneRotX -= dy * 0.35;
    startX = e.clientX;
    startY = e.clientY;
  });

  window.addEventListener("pointerup", () => { isSceneDragging = false; });
  window.addEventListener("pointercancel", () => { isSceneDragging = false; });

  function animateAlphaTrack() {
    // Nếu đang rê chuột/chạm thì di chuyển siêu chậm (0.001) để người dùng dễ bấm trúng
    const speed = isSceneHovered ? 0.0015 : 0.0065;
    alphaTime += speed;

    const scaleX = IS_MOBILE ? 150 : 255;
    const scaleY = IS_MOBILE ? 80 : 130;
    const scaleZ = IS_MOBILE ? 90 : 160;

    cubeEls.forEach((cube, i) => {
      const theta = alphaTime + (i * Math.PI * 2) / 8;

      const x = scaleX * Math.cos(theta);
      const y = scaleY * Math.sin(2 * theta) * 0.65;
      const z = scaleZ * Math.sin(theta);

      const rotX = (theta * 50 + i * 45) % 360;
      const rotY = (theta * 70 + i * 35) % 360;
      const rotZ = (theta * 30) % 360;

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
      sceneRotY += 0.04;
    }
    track.style.transform = `rotateX(${sceneRotX.toFixed(1)}deg) rotateY(${sceneRotY.toFixed(1)}deg)`;

    requestAnimationFrame(animateAlphaTrack);
  }
  animateAlphaTrack();
}

// ============================================================
// 7. THIỆP CHÚC MỪNG SINH NHẬT 3D CAO CẤP (SIÊU SÁNG & LỘNG LẪY)
// ============================================================
function initGreetingCardModal() {
  const modal = document.getElementById("card-modal");
  const backdrop = document.getElementById("card-backdrop");
  const closeBtn = document.getElementById("card-close");
  const loveBtn = document.getElementById("btn-love-burst");

  closeBtn.addEventListener("click", closeLuxuryCard);
  backdrop.addEventListener("click", closeLuxuryCard);

  loveBtn.addEventListener("click", e => {
    e.stopPropagation();
    triggerLoveBurst(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2);
  });
}

function openLuxuryCard(item) {
  const modal = document.getElementById("card-modal");
  const titleEl = document.getElementById("card-title");
  const msgEl = document.getElementById("card-message");
  const photoBox = document.getElementById("card-photo-box");

  titleEl.textContent = item.title;
  msgEl.textContent = item.wish;

  // Hiển thị ảnh thực tế to rõ và sắc nét
  photoBox.innerHTML = `
    <img src="${encodeURI(item.photo)}" alt="${item.title}" onerror="if(!this.dataset.retry){this.dataset.retry='1';this.src='${item.photo}';}else{this.style.display='none';this.nextElementSibling.style.display='block';}">
    <div class="card-emoji-big" style="display: none;">${item.emoji}</div>
  `;

  modal.classList.remove("hidden");

  // Nổ pháo hoa chúc mừng tấm thiệp
  spawnFirework(window.innerWidth * 0.5, window.innerHeight * 0.35);
}

function closeLuxuryCard() {
  const modal = document.getElementById("card-modal");
  modal.classList.add("hidden");
}

function triggerLoveBurst(originX, originY) {
  const hearts = ["❤️", "💖", "💕", "💗", "💓", "💝", "✨", "🌸"];
  for (let i = 0; i < 22; i++) {
    const heart = document.createElement("div");
    heart.className = "floating-heart-particle";
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = `${originX + (Math.random() - 0.5) * 110}px`;
    heart.style.top = `${originY + (Math.random() - 0.5) * 70}px`;
    heart.style.setProperty("--rx", `${(Math.random() - 0.5) * 160}px`);
    heart.style.animationDelay = `${Math.random() * 0.25}s`;
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 1800);
  }
}

// ============================================================
// 8. HỆ THỐNG PHÁT NHẠC NỀN LIÊN TỤC (TỰ ĐỘNG PHÁT TỪ ĐẦU)
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
      // Nếu browser chặn trước khi tương tác, chờ cử chỉ đầu tiên
    });
  }
}

// Cố gắng phát ngay khi tải trang
window.addEventListener("load", () => {
  triggerMusicAutoplay();
});

// Bắt bất cứ tương tác chạm / click / phím đầu tiên để phát nhạc liên tục
const firstInteractionEvents = ["click", "touchstart", "keydown", "pointerdown"];
function handleFirstInteraction() {
  triggerMusicAutoplay();
  firstInteractionEvents.forEach(evt => window.removeEventListener(evt, handleFirstInteraction));
}
firstInteractionEvents.forEach(evt => window.addEventListener(evt, handleFirstInteraction, { passive: true }));

// Nút bật/tắt nhạc
musicBtn.addEventListener("click", () => {
  if (isAudioPlaying) {
    if (bgAudio) bgAudio.pause();
    if (melodyTimeout) clearTimeout(melodyTimeout);
    musicBtn.classList.remove("playing");
    isAudioPlaying = false;
  } else {
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
});

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
