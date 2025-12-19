/* HERO DIM */
const overlay=document.querySelector(".overlay");
window.addEventListener("scroll",()=>{
  let v=Math.min(scrollY/400,.6);
  overlay.style.background=`rgba(0,0,0,${.3+v})`;
});

/* SCROLL REVEAL */
const reveals=document.querySelectorAll(".reveal");
const revealObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add("active");
  });
},{threshold:.15});
reveals.forEach(r=>revealObs.observe(r));

/* CALCULATOR */
let d=document.getElementById("display");
function add(v){d.value+=v}
function clr(){d.value=""}
function calc(){
  try{d.value=eval(d.value)}
  catch{d.value="Error"}
}

/* ===== COMPLETE 2D SHOOTER GAME ===== */
const canvas = document.getElementById("shooter");
const ctx = canvas.getContext("2d");

let player = { x: canvas.width/2, y: canvas.height-40 };
let bullets = [];
let enemies = [];
let score = 0;
let gameOver = false;

canvas.addEventListener("mousemove", e => {
  const rect = canvas.getBoundingClientRect();
  player.x = e.clientX - rect.left;
});

function shoot() {
  if (!gameOver)
    bullets.push({ x: player.x, y: player.y });
}
setInterval(shoot, 300);

function spawnEnemy() {
  if (!gameOver)
    enemies.push({
      x: Math.random() * (canvas.width - 30),
      y: -30
    });
}
setInterval(spawnEnemy, 900);

function collide(a, b, size = 20) {
  return (
    a.x < b.x + size &&
    a.x + size > b.x &&
    a.y < b.y + size &&
    a.y + size > b.y
  );
}

function resetGame() {
  bullets = [];
  enemies = [];
  score = 0;
  gameOver = false;
  document.getElementById("score").innerText = "Score: 0";
}

canvas.addEventListener("click", () => {
  if (gameOver) {
    resetGame();
  }
});


function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  /* GAME OVER SCREEN */
  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "26px sans-serif";
    ctx.fillText("GAME OVER", canvas.width / 2 - 80, canvas.height / 2);
    ctx.font = "14px sans-serif";
    ctx.fillText("Click to Restart", canvas.width / 2 - 70, canvas.height / 2 + 30);
    requestAnimationFrame(loop); // ✅ KEEP LOOP RUNNING
    return;
  }

  /* PLAYER */
  ctx.fillStyle = "#7f9cff";
  ctx.beginPath();
  ctx.moveTo(player.x, player.y);
  ctx.lineTo(player.x - 12, player.y + 22);
  ctx.lineTo(player.x + 12, player.y + 22);
  ctx.closePath();
  ctx.fill();

  /* BULLETS */
  bullets.forEach(b => b.y -= 6);
  bullets.forEach(b => {
    ctx.fillRect(b.x - 1, b.y, 2, 10);
  });

  /* ENEMIES */
  enemies.forEach(e => e.y += 2.5);
  enemies.forEach(e => ctx.fillText("👾", e.x, e.y));

  /* COLLISIONS */
  bullets.forEach((b, bi) => {
    enemies.forEach((e, ei) => {
      if (collide(b, e)) {
        bullets.splice(bi, 1);
        enemies.splice(ei, 1);
        score += 10;
        document.getElementById("score").innerText = "Score: " + score;
      }
    });
  });

  enemies.forEach(e => {
    if (collide(player, e, 25)) {
      gameOver = true;
    }
  });

  bullets = bullets.filter(b => b.y > 0);
  enemies = enemies.filter(e => e.y < canvas.height + 30);

  requestAnimationFrame(loop);
}
loop();


/* GALLERY IMAGES */

const galleryImages = [
  "1.png",
  "2.png",
  "4.png",
  "5.png",
  "yo.jpg",
    "yo2.jpg",
];

const galleryGrid = document.getElementById("galleryGrid");

galleryImages.forEach(src => {
  const img = new Image();       // Create a new Image object
  img.src = src;                 // Set the source
  img.onload = () => {           // Wait until it loads
    galleryGrid.appendChild(img); // Add to the gallery
  };
  img.alt = "Space Image";       // Accessibility
  img.className = "gallery-img"; // Optional: for CSS styling
});







/* EMAILJS */
document.getElementById("contact-form").addEventListener("submit",e=>{
  e.preventDefault();
  emailjs.sendForm("service_zin33qp","template_rhk6kpp",e.target)
  .then(()=>document.getElementById("status").innerText="Message sent!")
  .catch(()=>document.getElementById("status").innerText="Failed to send");
});

/* ================================
   PARALLAX STARS
================================ */
const starCanvas = document.getElementById("stars");
const sctx = starCanvas.getContext("2d");

function resizeStars() {
  starCanvas.width = window.innerWidth;
  starCanvas.height = window.innerHeight;
}
resizeStars();
window.addEventListener("resize", resizeStars);

const stars = Array.from({ length: 120 }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  r: Math.random() * 1.5 + 0.5,
  speed: Math.random() * 0.3 + 0.1
}));

function drawStars() {
  sctx.clearRect(0, 0, starCanvas.width, starCanvas.height);
  sctx.fillStyle = "rgba(124,245,255,0.7)";
  stars.forEach(star => {
    star.y += star.speed;
    if (star.y > starCanvas.height) star.y = 0;
    sctx.beginPath();
    sctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    sctx.fill();
  });
  requestAnimationFrame(drawStars);
}
drawStars();

/* ================================
   PERFORMANCE SAFETY
================================ */
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    cancelAnimationFrame(drawStars);
  } else {
    drawStars();
  }
});
