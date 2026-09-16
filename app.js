"use strict";
// =====================================================
// CONFIG - SUA O DAY DE CHINH
// =====================================================
const DAD_BIRTHDAY_MONTH = 9;   // thang 9
const DAD_BIRTHDAY_DAY   = 17;  // ngay 17
const PIN_CODE           = "1709"; // mat khau: 1709 (ngay 17 thang 09)

// DU LIEU CUBE - them anh vao thu muc photos/ va cap nhat o day
// Vi du: photos: ["photos/anh1.jpg","photos/anh2.jpg","photos/anh3.jpg"]
const CUBE_DATA = [
  { photos:["photos/p1.jpg","photos/p2.jpg","photos/p3.jpg"], color:"#ff6b9d", icon:"❤️" },
  { photos:["photos/p4.jpg","photos/p5.jpg","photos/p6.jpg"], color:"#ffd93d", icon:"🌟" },
  { photos:["photos/p7.jpg","photos/p8.jpg","photos/p9.jpg"], color:"#4d96ff", icon:"🎂" },
  { photos:["photos/p10.jpg","photos/p11.jpg","photos/p12.jpg"], color:"#6bcb77", icon:"🌿" },
  { photos:["photos/p13.jpg","photos/p14.jpg","photos/p15.jpg"], color:"#a855f7", icon:"💜" },
  { photos:["photos/p16.jpg","photos/p17.jpg","photos/p18.jpg"], color:"#ff9f43", icon:"🎈" },
];

// LOI CHUC - co the them/sua
const MESSAGES = [
  "Bố ơi, con yêu bố nhiều lắm – nhiều hơn tất cả những gì con có thể nói bằng lời ❤️",
  "Mỗi nếp nhăn trên tay bố là một câu chuyện về sự hy sinh thầm lặng dành cho con 💙",
  "Bố là người đàn ông đầu tiên và mãi mãi là người đàn ông con kính yêu nhất đời này 🌟",
  "Tình bố như ngọn núi cao – vững chãi, bền bỉ, che chở con qua mọi giông bão cuộc đời 🏔️",
  "Sinh nhật vui vẻ Bố Như ơi! Chúc bố sức khỏe dồi dào và hạnh phúc mãi không tàn ☀️",
  "Cảm ơn bố đã gánh chịu tất cả để con được sống trọn vẹn và bình an mỗi ngày 🌿",
  "Dù con có đi đến chân trời góc bể nào – về nhà vẫn là về với bố, nơi ấm áp nhất 🏠",
  "Bố là người thầy vĩ đại nhất – không dạy bằng lời mà dạy bằng chính cuộc đời bố sống 📖",
  "Mỗi ngày được gọi một tiếng Bố ơi là mỗi ngày con thấy mình là người may mắn nhất trên đời 🎈",
  "Tình yêu của bố chính là nền tảng vững chắc nhất để con đứng vững và bay cao mỗi ngày 🦋",
  "Chúc bố sinh nhật hạnh phúc – sống thật lâu bên gia đình và những người con yêu thương! 🎂",
  "Không có bố thì cuộc đời con chỉ là trang giấy trắng không có nghĩa lý gì cả ❤️",
  "Happy Birthday Bố Như thân yêu! Bố là tất cả của con! 🎉",
  "Cảm ơn bố vì đã luôn đứng sau lưng con dù con không hay biết nhưng con luôn cảm nhận 💕",
  "Tuổi mới thêm khỏe mạnh, thêm niềm vui và thêm thật nhiều yêu thương bố nhé! 🌺",
  "Bố ơi, nụ cười của bố là điều đẹp nhất mà con được nhìn thấy mỗi ngày! 😊",
  "Con muốn bố biết rằng: mọi thành công của con đều có bàn tay bố trong đó 🏆",
  "Chúc bố luôn mạnh khỏe như cây xanh – trường tồn và tươi mát mãi mãi 🌳",
  "Tình bố là ngọn lửa ấm – chưa bao giờ tắt dù gió có mạnh đến đâu 🔥",
  "Bố Như ơi – sinh nhật này và mọi sinh nhật sau, con luôn ở bên bố! ❤️🎂❤️",
];
// =====================================================

// ===== LOCK SCREEN =====
let pin = "";
const PIN_LEN = 4;
const dots = [document.getElementById("d0"),document.getElementById("d1"),document.getElementById("d2"),document.getElementById("d3")];

function updateDots() {
  dots.forEach((d, i) => d.classList.toggle("filled", i < pin.length));
}

function handleKey(v) {
  const err = document.getElementById("pin-error");
  err.classList.add("hidden");
  if (v === "C") { pin = ""; }
  else if (v === "X") { pin = pin.slice(0,-1); }
  else if (pin.length < PIN_LEN) { pin += v; }
  updateDots();
  if (pin.length === PIN_LEN) {
    if (pin === PIN_CODE) {
      showSuccess();
    } else {
      err.classList.remove("hidden");
      const card = document.getElementById("lock-card");
      card.style.animation = "shake .4s ease";
      setTimeout(() => {
        pin = "";
        updateDots();
        card.style.animation = "";
      }, 700);
    }
  }
}

document.getElementById("numpad").addEventListener("click", e => {
  const btn = e.target.closest(".nk");
  if (!btn) return;
  handleKey(btn.dataset.v);
});

function showSuccess() {
  const card = document.getElementById("lock-card");
  card.style.transform = "scale(0) rotate(10deg)";
  card.style.opacity = "0";

  setTimeout(() => {
    const suc = document.getElementById("lock-success");
    suc.classList.remove("hidden");

    // Launch celebratory fireworks immediately
    startFireworks();
    for (let i = 0; i < 6; i++) {
      setTimeout(() => triggerBurst(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight * .6
      ), i * 200);
    }

    setTimeout(() => {
      const ls = document.getElementById("lock-screen");
      ls.style.opacity = "0";
      setTimeout(() => {
        ls.classList.add("hidden");
        const mp = document.getElementById("main-page");
        mp.classList.remove("hidden");
        setTimeout(() => {
          mp.classList.add("visible");
          document.getElementById("music-btn").classList.remove("hidden");
          initMainPage();
        }, 50);
      }, 800);
    }, 2600);
  }, 500);
}

// ===== LOCK CANVAS PETALS =====
(function() {
  const container = document.getElementById("lock-petals");
  const colors = ["#ffb3a0","#ffcba4","#ffd6c0","#ff8a80","#ffa07a","#f9b4ab"];
  for (let i = 0; i < 28; i++) {
    const p = document.createElement("div");
    p.className = "petal";
    const sz = Math.random()*14+6;
    const col = colors[Math.floor(Math.random()*colors.length)];
    p.style.cssText = "width:" + sz + "px;height:" + sz + "px;background:" + col + ";left:" + (Math.random()*100) + "%;--pd:" + (Math.random()*8+6) + "s;--dl:-" + (Math.random()*8) + "s;opacity:" + (.5+Math.random()*.5);
    container.appendChild(p);
  }
})();

// ===== FIREWORKS ENGINE =====
let fwCtx, fwW, fwH;
const fwParticles = [];
const fwRockets = [];
let fwRunning = false;

const FW_COLORS = [
  "#ff0066","#ff4400","#ffcc00","#00ff88","#00ccff","#cc00ff",
  "#ff3399","#ff9900","#ffff00","#33ff66","#00ffff","#ff00cc",
  "#ff6644","#ffbb00","#44ff44","#6644ff","#ff44ff","#ffffff",
  "#ff8833","#aaffaa","#aa88ff","#ffaa88","#88ffff","#ffff88",
];

function triggerBurst(x, y) {
  const baseColor = FW_COLORS[Math.floor(Math.random()*FW_COLORS.length)];
  const count = Math.floor(Math.random()*50+80);
  const type = Math.floor(Math.random()*3);
  for (let i = 0; i < count; i++) {
    let angle, speed;
    if (type === 0) {
      angle = (Math.PI*2*i)/count; speed = Math.random()*5+4;
    } else if (type === 1) {
      angle = (Math.PI*2*i)/count; speed = (i%3===0) ? Math.random()*8+6 : Math.random()*2+1;
    } else {
      angle = Math.random()*Math.PI*2; speed = Math.random()*9+2;
    }
    const c = Math.random()>.25 ? baseColor : FW_COLORS[Math.floor(Math.random()*FW_COLORS.length)];
    fwParticles.push({
      x,y,
      vx: Math.cos(angle)*speed,
      vy: Math.sin(angle)*speed,
      size: Math.random()*5+2.5,
      color:c, life:1,
      decay: Math.random()*.014+.011,
      isStar: Math.random()>.55,
      trail:[]
    });
  }
  // Secondary small burst (white center)
  for (let i = 0; i < 15; i++) {
    const a = Math.random()*Math.PI*2, sp = Math.random()*3+1;
    fwParticles.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,size:2,color:"#ffffff",life:1,decay:.035,isStar:false,trail:[]});
  }
}

function launchRocket() {
  const sx = Math.random()*fwW*.85 + fwW*.075;
  fwRockets.push({
    x:sx, y:fwH+5,
    vy: -(Math.random()*14+12),
    vx: (Math.random()-.5)*3,
    peakY: Math.random()*fwH*.45 + fwH*.05,
    color: FW_COLORS[Math.floor(Math.random()*FW_COLORS.length)],
    trail:[]
  });
}

function startFireworks() {
  if (fwRunning) return;
  fwRunning = true;
  const canvas = document.getElementById("fireworks-canvas");
  fwCtx = canvas.getContext("2d");
  fwW = canvas.width = window.innerWidth;
  fwH = canvas.height = window.innerHeight;
  window.addEventListener("resize", () => {
    fwW = canvas.width = window.innerWidth;
    fwH = canvas.height = window.innerHeight;
  });
  // Launch rockets continuously - NEVER STOP
  for (let i = 0; i < 3; i++) setTimeout(launchRocket, i*120);
  setInterval(launchRocket, 380);

  function drawFrame() {
    // Partial clear for trail effect
    fwCtx.fillStyle = "rgba(6,2,15,.18)";
    fwCtx.fillRect(0,0,fwW,fwH);

    // Rockets
    for (let i = fwRockets.length-1; i >= 0; i--) {
      const r = fwRockets[i];
      r.trail.push({x:r.x,y:r.y});
      if (r.trail.length>10) r.trail.shift();
      r.x += r.vx; r.y += r.vy;
      r.vy += .25;
      if (r.y <= r.peakY || r.vy >= 0) {
        triggerBurst(r.x,r.y);
        fwRockets.splice(i,1);
        continue;
      }
      if (r.y > fwH+20) { fwRockets.splice(i,1); continue; }
      // Draw rocket trail
      for (let t=0; t<r.trail.length-1; t++) {
        const al = ((t+1)/r.trail.length)*.9;
        fwCtx.beginPath();
        fwCtx.moveTo(r.trail[t].x,r.trail[t].y);
        fwCtx.lineTo(r.trail[t+1].x,r.trail[t+1].y);
        fwCtx.strokeStyle = r.color;
        fwCtx.globalAlpha = al;
        fwCtx.lineWidth = 2.5;
        fwCtx.shadowBlur = 10;
        fwCtx.shadowColor = r.color;
        fwCtx.stroke();
      }
      fwCtx.globalAlpha=1; fwCtx.shadowBlur=0;
    }

    // Particles
    for (let i=fwParticles.length-1; i>=0; i--) {
      const p = fwParticles[i];
      p.trail.push({x:p.x,y:p.y});
      if (p.trail.length>6) p.trail.shift();
      p.x+=p.vx; p.y+=p.vy;
      p.vy+=.09; p.vx*=.985;
      p.life-=p.decay;
      if (p.life<=0) { fwParticles.splice(i,1); continue; }

      fwCtx.save();
      fwCtx.shadowBlur = 20;
      fwCtx.shadowColor = p.color;
      fwCtx.globalAlpha = p.life;

      if (p.isStar) {
        const t = Date.now()*.002;
        fwCtx.beginPath();
        for (let s=0;s<4;s++) {
          const a = s*Math.PI/2 + t;
          fwCtx.moveTo(p.x,p.y);
          fwCtx.lineTo(p.x+Math.cos(a)*p.size*3*p.life, p.y+Math.sin(a)*p.size*3*p.life);
        }
        fwCtx.strokeStyle = p.color;
        fwCtx.lineWidth = 2;
        fwCtx.stroke();
      } else {
        // Trail
        for (let t=0; t<p.trail.length-1; t++) {
          const al = (t/p.trail.length)*p.life*.5;
          fwCtx.globalAlpha = al;
          fwCtx.beginPath();
          fwCtx.moveTo(p.trail[t].x,p.trail[t].y);
          fwCtx.lineTo(p.trail[t+1].x,p.trail[t+1].y);
          fwCtx.strokeStyle = p.color;
          fwCtx.lineWidth = p.size*.7;
          fwCtx.lineCap = "round";
          fwCtx.stroke();
        }
        fwCtx.globalAlpha = p.life;
        fwCtx.beginPath();
        fwCtx.arc(p.x, p.y, p.size*p.life, 0, Math.PI*2);
        fwCtx.fillStyle = p.color;
        fwCtx.fill();
      }
      // White hot center
      fwCtx.beginPath();
      fwCtx.arc(p.x,p.y, p.size*.45*p.life, 0, Math.PI*2);
      fwCtx.fillStyle="#ffffff";
      fwCtx.globalAlpha = p.life*.65;
      fwCtx.fill();
      fwCtx.restore();
    }
    requestAnimationFrame(drawFrame);
  }
  drawFrame();
}

// ===== MAIN PAGE INIT =====
function initMainPage() {
  document.getElementById("footer-year").textContent = "© " + new Date().getFullYear();
  initCountdown();
  initCubes();
  initMessages();
  tryAutoMusic();
}

// ===== COUNTDOWN =====
function initCountdown() {
  function upd() {
    const n = new Date();
    let next = new Date(n.getFullYear(), DAD_BIRTHDAY_MONTH-1, DAD_BIRTHDAY_DAY);
    if (n.getMonth()===DAD_BIRTHDAY_MONTH-1 && n.getDate()===DAD_BIRTHDAY_DAY) {
      document.getElementById("cd-msg").classList.remove("hidden"); return;
    }
    if (n >= next) next.setFullYear(n.getFullYear()+1);
    const diff = next - n;
    const td = Math.floor(diff/864e5);
    const mo = Math.floor(td/30), dy = td%30;
    const hr = Math.floor((diff%864e5)/36e5);
    const mi = Math.floor((diff%36e5)/6e4);
    const sc = Math.floor((diff%6e4)/1e3);
    document.getElementById("cd-months").textContent = String(mo).padStart(2,"0");
    document.getElementById("cd-days").textContent   = String(dy).padStart(2,"0");
    document.getElementById("cd-hours").textContent  = String(hr).padStart(2,"0");
    document.getElementById("cd-mins").textContent   = String(mi).padStart(2,"0");
    document.getElementById("cd-secs").textContent   = String(sc).padStart(2,"0");
  }
  upd(); setInterval(upd,1000);
}

// ===== ORBITING CUBES =====
const ORBIT_PARAMS = [
  { rx:290,ry:80, speed:.003,   angle:0,       yOff:-35, sz:120, sd:7  },
  { rx:370,ry:100,speed:-.0022, angle:1.05,    yOff:55,  sz:140, sd:9  },
  { rx:240,ry:65, speed:.0042,  angle:2.09,    yOff:-65, sz:100, sd:6  },
  { rx:410,ry:110,speed:-.0018, angle:3.14,    yOff:75,  sz:150, sd:11 },
  { rx:270,ry:72, speed:.0035,  angle:4.19,    yOff:-30, sz:115, sd:8  },
  { rx:340,ry:92, speed:-.003,  angle:5.24,    yOff:45,  sz:130, sd:10 },
];

function initCubes() {
  const layer = document.getElementById("cubes-layer");
  const isMob = window.innerWidth < 700;
  const scFactor = isMob ? .55 : 1;

  CUBE_DATA.forEach((data, ci) => {
    const op = ORBIT_PARAMS[ci];
    const sz = Math.round(op.sz * scFactor);
    const half = sz/2;

    const wrap = document.createElement("div");
    wrap.className = "orbit-cube-wrap";
    wrap.style.cssText = "transform:translate(-50%,-50%)";

    const cube = document.createElement("div");
    cube.className = "photo-cube";
    cube.style.cssText = "width:" + sz + "px;height:" + sz + "px;--sd:" + op.sd + "s";

    // 6 faces
    const faces = [
      {cls:"f",  tx:"translateZ(" + half + "px)"},
      {cls:"bk", tx:"rotateY(180deg) translateZ(" + half + "px)"},
      {cls:"l",  tx:"rotateY(-90deg) translateZ(" + half + "px)"},
      {cls:"r",  tx:"rotateY(90deg) translateZ(" + half + "px)"},
      {cls:"t",  tx:"rotateX(90deg) translateZ(" + half + "px)"},
      {cls:"bt", tx:"rotateX(-90deg) translateZ(" + half + "px)"},
    ];
    const photoList = [...data.photos, data.photos[0]||"", data.photos[1]||"", data.photos[2]||""];

    faces.forEach((fc, fi) => {
      const face = document.createElement("div");
      face.className = "cube-face";
      face.style.cssText = "width:" + sz + "px;height:" + sz + "px;transform:" + fc.tx + ";border-color:" + data.color + "60";

      const photoSrc = photoList[fi % photoList.length] || "";
      const img = document.createElement("img");
      img.src = photoSrc;
      img.alt = "photo";
      img.onerror = function() {
        this.style.display = "none";
        const ph = document.createElement("div");
        ph.className = "cube-ph";
        ph.style.background = "linear-gradient(135deg," + data.color + "22," + data.color + "55)";
        ph.style.cssText += ";width:100%;height:100%;position:absolute;inset:0";
        ph.innerHTML = "<span class='cube-ph-icon'>" + data.icon + "</span>";
        face.appendChild(ph);
      };
      face.appendChild(img);
      cube.appendChild(face);
    });

    wrap.appendChild(cube);
    layer.appendChild(wrap);
  });

  const wraps = layer.querySelectorAll(".orbit-cube-wrap");
  ORBIT_PARAMS.forEach(op => op.angle_cur = op.angle);

  function animOrbits() {
    ORBIT_PARAMS.forEach((op, i) => {
      op.angle_cur += op.speed;
      const x = Math.cos(op.angle_cur) * op.rx * scFactor;
      const y = Math.sin(op.angle_cur) * op.ry * scFactor + op.yOff * scFactor;
      const depth = Math.sin(op.angle_cur);
      const sc = .42 + (depth+1)*.34;
      const zi = Math.round((depth+1)*200+10);
      const el = wraps[i];
      if (el) {
        el.style.left = "calc(50% + " + Math.round(x) + "px)";
        el.style.top  = "calc(50% + " + Math.round(y) + "px)";
        el.style.transform = "translate(-50%,-50%) scale(" + sc.toFixed(3) + ")";
        el.style.zIndex = zi;
        el.style.filter = depth < 0 ? "brightness(" + (.55+(depth+1)*.35).toFixed(2) + ")" : "brightness(1)";
      }
    });
    requestAnimationFrame(animOrbits);
  }
  animOrbits();
}

// ===== FLOATING MESSAGES =====
function initMessages() {
  const layer = document.getElementById("messages-layer");
  const W = window.innerWidth, H = window.innerHeight;

  function spawn() {
    const el = document.createElement("div");
    el.className = "floating-msg";
    const txt = MESSAGES[Math.floor(Math.random()*MESSAGES.length)];
    el.textContent = txt;
    const dur = Math.random()*5+6;
    const lp = Math.max(2, Math.random()*70+5);
    const tp = Math.max(3, Math.random()*70+5);
    el.style.cssText = "left:" + lp + "%;top:" + tp + "%;--mdur:" + dur + "s";
    layer.appendChild(el);
    setTimeout(() => { try { layer.removeChild(el); } catch(e){} }, dur*1000+200);
  }

  // Stagger initial messages
  for (let i=0; i<6; i++) setTimeout(spawn, i*500);
  setInterval(spawn, 1600);
}

// ===== MUSIC =====
let audioCtx, musicOn = false, musicNodes = [];
const NOTES = [
  [392,.4],[392,.4],[440,.8],[392,.8],[523,.8],[494,1.6],
  [392,.4],[392,.4],[440,.8],[392,.8],[587,.8],[523,1.6],
  [392,.4],[392,.4],[784,.8],[659,.8],[523,.8],[494,.8],[440,1.6],
  [698,.4],[698,.4],[659,.8],[523,.8],[587,.8],[523,1.6]
];
const BPS = 60/108;
const TOTAL_DUR = NOTES.reduce((s,n)=>s+n[1]*BPS,0)*1000;

function playBirthday() {
  const c = audioCtx;
  if (!c || c.state==="suspended") return;
  musicNodes.forEach(n=>{try{n.stop();}catch(e){}});
  musicNodes=[];
  const mg = c.createGain(); mg.gain.setValueAtTime(.18,c.currentTime); mg.connect(c.destination);
  let t = c.currentTime+.05;
  NOTES.forEach(([fr,beats])=>{
    const dur=beats*BPS;
    ["sine","triangle"].forEach((type,ti)=>{
      const osc=c.createOscillator(), g=c.createGain();
      osc.type=type;
      osc.frequency.setValueAtTime(ti===1?fr*1.498:fr,t);
      const vol=ti===0?.7:.12;
      g.gain.setValueAtTime(0,t);
      g.gain.linearRampToValueAtTime(vol,t+.03);
      g.gain.setValueAtTime(vol,t+dur*.65);
      g.gain.linearRampToValueAtTime(0,t+dur*.9);
      osc.connect(g);g.connect(mg);osc.start(t);osc.stop(t+dur);
      musicNodes.push(osc);
    });
    t+=dur;
  });
  setTimeout(()=>{if(musicOn) playBirthday();}, TOTAL_DUR+80);
}

function startMusic() {
  if (!audioCtx) audioCtx = new (window.AudioContext||window.webkitAudioContext)();
  if (audioCtx.state==="suspended") audioCtx.resume();
  musicOn=true;
  document.getElementById("music-btn").classList.add("playing");
  playBirthday();
}

function stopMusic() {
  musicOn=false;
  document.getElementById("music-btn").classList.remove("playing");
  musicNodes.forEach(n=>{try{n.stop();}catch(e){}});
  musicNodes=[];
}

function tryAutoMusic() {
  if (!audioCtx) audioCtx = new (window.AudioContext||window.webkitAudioContext)();
  const tryPlay = () => {
    audioCtx.resume().then(()=>{ if(!musicOn) startMusic(); });
  };
  if (audioCtx.state==="running") { startMusic(); }
  else {
    ["click","touchstart","keydown"].forEach(evt=>{
      document.addEventListener(evt, function unlock(){
        tryPlay();
        document.removeEventListener(evt,unlock);
      }, {once:true});
    });
  }
  document.getElementById("music-btn").addEventListener("click",()=>{
    if (musicOn) stopMusic(); else startMusic();
  });
}
