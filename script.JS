const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Зафарбувати фон холсту
ctx.fillStyle = '#ddd';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Напівпрозорість
ctx.globalAlpha = 0.5;

// Змінні
let isDrawing = false;
let figures = [];

// Функція для генерації випадкового кольору
function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// Функція для генерації випадкового розміру
function getRandomRadius() {
  return Math.floor(Math.random() * 81) + 20;
}

// Функція для малювання шестикутника
function drawHexagon(x, y, radius) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (2 * Math.PI * i) / 6;
    const dx = radius * Math.cos(angle);
    const dy = radius * Math.sin(angle);
    ctx.lineTo(x + dx, y + dy);
  }
  ctx.closePath();
  ctx.fillStyle = getRandomColor();
  ctx.fill();
}

// Функція для оновлення кадру
function update() {
  if (isDrawing) {
    const x = event.clientX;
    const y = event.clientY;
    figures.push({ x, y, radius: getRandomRadius() });
  }

  // Очистка холсту
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Малювання фігур
  for (const figure of figures) {
    drawHexagon(figure.x, figure.y, figure.radius);
  }

  // Відштовхування фігур
  for (let i = 0; i < figures.length; i++) {
    for (let j = i + 1; j < figures.length; j++) {
      const dx = figures[i].x - figures[j].x;
      const dy = figures[i].y - figures[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < figures[i].radius + figures[j].radius) {
        const overlap = (figures[i].radius + figures[j].radius) - distance;
        figures[i].x += dx * overlap / distance;
        figures[i].y += dy * overlap / distance;
        figures[j].x -= dx * overlap / distance;
        figures[j].y -= dy * overlap / distance;
      }
    }
  }

  requestAnimationFrame(update);
}

// Події
canvas.addEventListener('mousedown', () => {
  isDrawing = true;
});

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
});

// Запуск оновлення кадру
requestAnimationFrame(update);