function atualizarRelogio() {
  const dataFixa = new Date("2021-03-28T00:00:00");
  const agora = new Date();

  let diffMs = Math.abs(agora - dataFixa);
  const segundos = Math.floor(diffMs / 1000);
  const minutos = Math.floor(segundos / 60);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);
  const anos = Math.floor(dias / 365.25);

  const diasRestantes = dias % 365.25;
  const horasRestantes = horas % 24;
  const minutosRestantes = minutos % 60;
  const segundosRestantes = segundos % 60;

  document.getElementById("relogio").innerHTML = `<div class="tempo">
        <span>${anos}</span> anos,
        <span>${Math.floor(diasRestantes)}</span> dias,
        <span>${String(horasRestantes).padStart(2, "0")}</span>h :
        <span>${String(minutosRestantes).padStart(2, "0")}</span>m :
        <span>${String(segundosRestantes).padStart(2, "0")}</span>s
      </div>`;
}

setInterval(atualizarRelogio, 1000);
atualizarRelogio();

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let stars = [];
let numStars = 150;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    alpha: Math.random(),
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5,
  });
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  for (let star of stars) {
    ctx.beginPath();
    ctx.globalAlpha = star.alpha;
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();

    star.x += star.dx;
    star.y += star.dy;

    if (star.x < 0 || star.x > canvas.width) star.dx *= -1;
    if (star.y < 0 || star.y > canvas.height) star.dy *= -1;

    star.alpha += (Math.random() - 0.5) * 0.05;
    star.alpha = Math.max(0.1, Math.min(star.alpha, 1));
  }
  requestAnimationFrame(animateStars);
}

animateStars();
