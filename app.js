"use strict";

// ============================================================
// 🎂 CẤU HÌNH & DỮ LIỆU CHÚC MỪNG SINH NHẬT BỐ NHƯ
// ============================================================
const BDAY_MONTH = 9;   // Tháng 9
const BDAY_DAY   = 17;  // Ngày 17
const PIN_CODE   = "1709"; // Mật khẩu 17/09

// Danh sách 12 lời chúc ý nghĩa, sâu sắc nhất dành tặng Bố Như
const MEMORIES_DATA = [
  {
    photo: null,
    emoji: "❤️",
    color: "#ec4899",
    message: "Bố Như ơi, con yêu bố nhiều lắm! Cảm ơn bố vì cả cuộc đời đã luôn là điểm tựa vững chãi nhất cho con."
  },
  {
    photo: null,
    emoji: "🌟",
    color: "#f59e0b",
    message: "Bố là người hùng thầm lặng của con – không khoác áo choàng nhưng luôn che chở con qua mọi bão giông cuộc đời."
  },
  {
    photo: null,
    emoji: "🎂",
    color: "#8b5cf6",
    message: "Chúc mừng sinh nhật Bố Như kính yêu! Chúc bố bước sang tuổi mới luôn dồi dào sức khỏe, tràn ngập niềm vui và bình an!"
  },
  {
    photo: null,
    emoji: "🌿",
    color: "#10b981",
    message: "Cảm ơn những nếp nhăn và đôi bàn tay chai sạn của bố – tất cả sự hy sinh thầm lặng ấy con luôn khắc ghi trong tim."
  },
  {
    photo: null,
    emoji: "🏔️",
    color: "#06b6d4",
    message: "Tình thương của bố như núi cao biển rộng, ấm áp và bao la. Con luôn tự hào vì được làm con của bố!"
  },
  {
    photo: null,
    emoji: "☀️",
    color: "#f97316",
    message: "Nụ cười của bố chính là nguồn động lực lớn nhất để con nỗ lực từng ngày. Chúc bố luôn mỉm cười rạng rỡ như ánh mặt trời!"
  },
  {
    photo: null,
    emoji: "🏠",
    color: "#3b82f6",
    message: "Dù con có đi xa đến đâu, về bên bố vẫn là nơi bình yên và ấm áp nhất trên thế giới này."
  },
  {
    photo: null,
    emoji: "🦋",
    color: "#d946ef",
    message: "Bố dạy con bằng cả cuộc đời mẫu mực, kiên cường và bao dung. Bố là người thầy vĩ đại nhất của con!"
  },
  {
    photo: null,
    emoji: "🎁",
    color: "#eab308",
    message: "Món quà tuyệt vời nhất mà cuộc đời ban tặng cho con chính là có Bố Như là người cha kính yêu."
  },
  {
    photo: null,
    emoji: "💖",
    color: "#f43f5e",
    message: "Chúc Bố Như bách niên giai lão, sống vui khỏe, hạnh phúc an nhiên từng ngày bên con cháu!"
  },
  {
    photo: null,
    emoji: "✨",
    color: "#a855f7",
    message: "Mỗi ngày trôi qua, con đều thầm cảm ơn trời phật vì bố vẫn luôn mạnh khỏe bên cạnh gia đình chúng con."
  },
  {
    photo: null,
    emoji: "🎈",
    color: "#14b8a6",
    message: "Happy Birthday Bố Như! Cả gia đình chúc mừng ngày sinh nhật tuyệt vời nhất của người bố kính yêu!"
  }
];

// Phát hiện thiết bị di động
const IS_MOBILE = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || window.innerWidth < 650;

// ============================================================
// 1. CẢNH TRANG ĐẦU: KHÓA MẬT KHẨU (1709)
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

// Tạo các hạt lấp lánh ở trang khóa
(function initLockSparkles() {
  const container = document.getElementById("lock-sparkles");
  if (!container) return;
  for (let i = 0; i < 40; i++) {
    const dot = document.createElement("div");
    dot.className = "sparkle-dot";
    const sz = Math.random() * 3 + 1.5;
    dot.style.cssText = `
      width: ${sz}px; height: ${sz}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      --t: ${Math.random() * 2 + 1.5}s;
      animation-delay: -${Math.random() * 3}s;
    `;
    container.appendChild(dot);
  }
})();

function updatePinDots() {
  pinDots.forEach((dot, idx) => {
    dot.classList.toggle("filled", idx < currentPin.length);
  });
}

function handleKeyInput(val) {
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

// Bắt sự kiện bàn phím số
document.getElementById("numpad").addEventListener("click", e => {
  const btn = e.target.closest(".num-key");
  if (btn) {
    handleKeyInput(btn.dataset.val);
  }
});

// Hỗ trợ cả bàn phím máy tính
window.addEventListener("keydown", e => {
  if (!lockScreen || lockScreen.classList.contains("hidden")) return;
  if (e.key >= "0" && e.key <= "9") handleKeyInput(e.key);
  else if (e.key === "Backspace") handleKeyInput("DEL");
  else if (e.key === "Escape" || e.key === "c" || e.key === "C") handleKeyInput("C");
});

function unlockSuccess() {
  // Bắn pháo hoa rực rỡ chào mừng
  startFireworks();
  for (let i = 0; i < 4; i++) {
    setTimeout(() => {
      spawnFirework(Math.random() * window.innerWidth, Math.random() * window.innerHeight * 0.5);
    }, i * 180);
  }

  // Ẩn bàn phím và hiện modal chúc mừng
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
    document.getElementById("music-btn").classList.remove("hidden");
    initMainPageFeatures();
  }, 700);
}

// ============================================================
// 2. ENGINE PHÁO HOA SIÊU MƯỢT (60 FPS, KHÔNG LAG)
// ============================================================
const FW_COLORS = [
  "#f5c842", "#ff385c", "#ff9f1c", "#2ec4b6", "#a855f7",
  "#38bdf8", "#ff007f", "#34d399", "#facc15", "#ffffff"
];

let fwCanvas, fwCtx, fwW, fwH;
let fwParticles = [];
let fwRockets = [];
let fwIsRunning = false;
const MAX_PARTICLES = IS_MOBILE ? 85 : 120; // Giới hạn số lượng hạt để cực kỳ mượt mà

function startFireworks() {
  if (fwIsRunning) return;
  fwIsRunning = true;
  fwCanvas = document.getElementById("fireworks-canvas");
  fwCtx = fwCanvas.getContext("2d");
  
  function resize() {
    fwW = fwCanvas.width = window.innerWidth;
    fwH = fwCanvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  // Phóng quả đầu tiên
  launchRocket();
  // Nhịp bắn tên lửa vừa phải (1.4s) không dồn dập gây lag
  setInterval(() => {
    if (fwIsRunning) launchRocket();
  }, 1450);

  requestAnimationFrame(fireworkLoop);

  // Chạm hoặc click bất kỳ đâu để nổ pháo hoa tại điểm chạm
  window.addEventListener("pointerdown", e => {
    if (e.target.closest(".num-key") || e.target.closest(".btn") || e.target.closest(".candle")) return;
    spawnFirework(e.clientX, e.clientY);
  });
}

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
  // Đảm bảo không tràn bộ nhớ hạt
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
  // Xóa nhẹ để giữ hiệu suất cao
  fwCtx.clearRect(0, 0, fwW, fwH);
  fwCtx.globalCompositeOperation = "lighter";

  // Cập nhật tên lửa bay lên
  for (let i = fwRockets.length - 1; i >= 0; i--) {
    const r = fwRockets[i];
    r.x += r.vx;
    r.y += r.vy;
    r.vy += 0.08; // trọng lực nhẹ

    fwCtx.fillStyle = r.color;
    fwCtx.beginPath();
    fwCtx.arc(r.x, r.y, 2.2, 0, Math.PI * 2);
    fwCtx.fill();

    if (r.y <= r.targetY || r.vy >= -1) {
      spawnFirework(r.x, r.y);
      fwRockets.splice(i, 1);
    }
  }

  // Cập nhật các hạt pháo hoa nổ
  for (let i = fwParticles.length - 1; i >= 0; i--) {
    const p = fwParticles[i];
    p.ox = p.x;
    p.oy = p.y;
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.075; // trọng lực
    p.vx *= 0.985; // cản không khí
    p.alpha -= p.decay;

    if (p.alpha <= 0) {
      fwParticles.splice(i, 1);
      continue;
    }

    // Vẽ tia sáng gọn nhẹ (siêu mượt trên mobile)
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
// 3. CÁC TÍNH NĂNG TRANG CHÍNH (ĐÃ SỬA HOÀN HẢO)
// ============================================================
function initMainPageFeatures() {
  initDatesAndCountdown();
  initHeroStars();
  initBalloons();
  initCandles();
  initMemoriesSphere();
  initMusic();
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

// NGÔI SAO LẤP LÁNH Ở HERO
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

// BÓNG BAY LƠ LỬNG
function initBalloons() {
  const container = document.getElementById("balloons-container");
  const colors = ["#ec4899", "#f59e0b", "#8b5cf6", "#10b981", "#06b6d4", "#f43f5e"];
  for (let i = 0; i < 8; i++) {
    const b = document.createElement("div");
    b.className = "balloon";
    const col = colors[i % colors.length];
    b.style.background = `radial-gradient(circle at 35% 30%, #fff 0%, ${col} 65%)`;
    b.style.left = `${(i * 12) + Math.random() * 8}%`;
    b.style.animationDuration = `${Math.random() * 6 + 12}s`;
    b.style.animationDelay = `${Math.random() * 8}s`;
    container.appendChild(b);
  }
}

// BÁNH KEM VÀ THỔI NẾN
function initCandles() {
  const layer = document.getElementById("candles-layer");
  const countEl = document.getElementById("candles-left");
  const btnBlowAll = document.getElementById("btn-blow-all");
  const btnRelight = document.getElementById("btn-relight");

  // Vị trí 5 ngọn nến trên bề mặt bánh
  const candleCoords = [
    { x: 30, y: 34 },
    { x: 40, y: 28 },
    { x: 50, y: 26 },
    { x: 60, y: 28 },
    { x: 70, y: 34 }
  ];

  let unblownCount = 5;
  const candleEls = [];

  candleCoords.forEach((coord, i) => {
    const c = document.createElement("div");
    c.className = "candle";
    c.style.left = `${coord.x}%`;
    c.style.top = `${coord.y}%`;
    c.innerHTML = `
      <div class="c-flame">🔥</div>
      <div class="c-body"></div>
    `;

    c.addEventListener("click", () => blowCandle(c));
    layer.appendChild(c);
    candleEls.push(c);
  });

  function blowCandle(candleEl) {
    if (candleEl.classList.contains("blown")) return;
    candleEl.classList.add("blown");
    unblownCount--;
    countEl.textContent = unblownCount;

    if (unblownCount === 0) {
      triggerAllCandlesBlown();
    }
  }

  btnBlowAll.addEventListener("click", () => {
    candleEls.forEach(c => c.classList.add("blown"));
    unblownCount = 0;
    countEl.textContent = "0";
    triggerAllCandlesBlown();
  });

  btnRelight.addEventListener("click", () => {
    candleEls.forEach(c => c.classList.remove("blown"));
    unblownCount = 5;
    countEl.textContent = "5";
    btnRelight.classList.add("hidden");
    btnBlowAll.classList.remove("hidden");
  });

  function triggerAllCandlesBlown() {
    btnBlowAll.classList.add("hidden");
    btnRelight.classList.remove("hidden");

    // Kích hoạt hiệu ứng tiên nữ bay lên lấp lánh
    launchFairyDust();

    // Bắn thêm pháo hoa chúc mừng
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        spawnFirework(Math.random() * window.innerWidth, Math.random() * window.innerHeight * 0.45);
      }, i * 220);
    }

    // Tự động cuộn mượt mà xuống phần kỷ niệm
    setTimeout(() => {
      document.getElementById("memories-section").scrollIntoView({ behavior: "smooth" });
    }, 1100);
  }
}

// HIỆU ỨNG TIÊN NỮ SAO LẤP LÁNH (FAIRY DUST)
function launchFairyDust() {
  const canvas = document.getElementById("fairy-canvas");
  if (!canvas) return;
  canvas.classList.add("active");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const fairies = [];
  for (let i = 0; i < 45; i++) {
    fairies.push({
      x: window.innerWidth * 0.5 + (Math.random() - 0.5) * 80,
      y: window.innerHeight * 0.65,
      vx: (Math.random() - 0.5) * 6,
      vy: -(Math.random() * 5 + 3.5),
      size: Math.random() * 3.5 + 1.5,
      color: FW_COLORS[Math.floor(Math.random() * FW_COLORS.length)],
      life: 1,
      decay: Math.random() * 0.012 + 0.008
    });
  }

  let frames = 0;
  function fairyLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let anyAlive = false;

    for (const f of fairies) {
      if (f.life <= 0) continue;
      anyAlive = true;
      f.x += f.vx;
      f.y += f.vy;
      f.vy += 0.03; // bay lượn nhẹ
      f.life -= f.decay;

      ctx.save();
      ctx.globalAlpha = f.life;
      ctx.fillStyle = f.color;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    frames++;
    if (anyAlive && frames < 180) {
      requestAnimationFrame(fairyLoop);
    } else {
      canvas.classList.remove("active");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  fairyLoop();
}

// ============================================================
// 4. QUẢ CẦU KỶ NIỆM 3D (LỜI CHÚC Ý NGHĨA & HÌNH ẢNH)
// ============================================================
function initMemoriesSphere() {
  const inner = document.getElementById("sphere-inner");
  const scene = document.getElementById("sphere-scene");
  const popup = document.getElementById("sphere-popup");
  const popupClose = document.getElementById("popup-close");
  const popupMedia = document.getElementById("popup-media");
  const popupMsg = document.getElementById("popup-msg");

  const radius = IS_MOBILE ? 115 : 160;
  const itemSize = IS_MOBILE ? 62 : 82;
  const phiGolden = (1 + Math.sqrt(5)) / 2;
  const total = MEMORIES_DATA.length;

  MEMORIES_DATA.forEach((item, i) => {
    // Phân bố đều các điểm trên mặt cầu (Fibonacci Sphere)
    const theta = 2 * Math.PI * i / phiGolden;
    const phi = Math.acos(1 - 2 * (i + 0.5) / total);
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    const el = document.createElement("div");
    el.className = "sphere-item";
    el.style.cssText = `
      width: ${itemSize}px; height: ${itemSize}px;
      margin: ${-itemSize / 2}px 0 0 ${-itemSize / 2}px;
      transform: translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px);
    `;

    const face = document.createElement("div");
    face.className = "sphere-face";
    face.style.width = face.style.height = `${itemSize}px`;
    face.style.setProperty("--item-col", item.color);

    if (item.photo) {
      const img = document.createElement("img");
      img.src = item.photo;
      img.className = "sphere-item-photo";
      face.appendChild(img);
    } else {
      const ph = document.createElement("div");
      ph.className = "sphere-item-placeholder";
      ph.textContent = item.emoji;
      face.appendChild(ph);
    }

    el.appendChild(face);

    // Mở popup khi chạm hoặc nhấp chuột
    el.addEventListener("click", () => openMemoryPopup(item));
    inner.appendChild(el);
  });

  function openMemoryPopup(item) {
    if (item.photo) {
      popupMedia.innerHTML = `<img src="${item.photo}" alt="Ảnh kỷ niệm Bố Như">`;
    } else {
      popupMedia.innerHTML = `<div class="popup-emoji">${item.emoji}</div>`;
    }
    popupMsg.textContent = item.message;
    popup.classList.remove("hidden");
  }

  popupClose.addEventListener("click", () => popup.classList.add("hidden"));
  popup.addEventListener("click", e => {
    if (e.target === popup) popup.classList.add("hidden");
  });

  // Xoay 3D cảm ứng & chuột mượt mà
  let rotY = 0;
  let rotX = -10;
  let isDragging = false;
  let startX = 0;

  scene.addEventListener("pointerdown", e => {
    isDragging = true;
    startX = e.clientX;
  });

  window.addEventListener("pointerup", () => { isDragging = false; });
  window.addEventListener("pointermove", e => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    rotY += delta * 0.45;
    startX = e.clientX;
  });

  // Tự động xoay êm dịu khi nghỉ
  function animateSphere() {
    if (!isDragging) {
      rotY += 0.22;
    }
    inner.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg)`;
    requestAnimationFrame(animateSphere);
  }
  animateSphere();
}

// ============================================================
// 5. NHẠC CHÚC MỪNG SINH NHẬT (WEB AUDIO API TỰ ĐỘNG)
// ============================================================
let audioCtx = null;
let isMusicPlaying = false;
let musicInterval = null;

function initMusic() {
  const musicBtn = document.getElementById("music-btn");
  musicBtn.addEventListener("click", toggleMusic);
}

function toggleMusic() {
  const musicBtn = document.getElementById("music-btn");
  if (isMusicPlaying) {
    stopBirthdaySong();
    musicBtn.classList.remove("playing");
    isMusicPlaying = false;
  } else {
    playBirthdaySong();
    musicBtn.classList.add("playing");
    isMusicPlaying = true;
  }
}

function playBirthdaySong() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }

  // Nốt nhạc Happy Birthday du dương
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

  let noteIndex = 0;
  function playNextNote() {
    if (!isMusicPlaying) return;
    const note = melody[noteIndex];
    playTone(note.f, note.d);
    noteIndex = (noteIndex + 1) % melody.length;
    musicInterval = setTimeout(playNextNote, note.d * 1000 + 70);
  }
  playNextNote();
}

function playTone(freq, duration) {
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;

    gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (err) {
    // Không làm gián đoạn nếu trình duyệt chặn audio
  }
}

function stopBirthdaySong() {
  if (musicInterval) clearTimeout(musicInterval);
}
