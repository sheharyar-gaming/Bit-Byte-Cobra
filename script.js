const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("currentScore");
const highScoreDisplay = document.getElementById("highScore");

let box = 20;
let score = 0;
let highScore = localStorage.getItem("snakeHighScore") || 0;
highScoreDisplay.innerText = highScore;

let snake = [{ x: 5 * box, y: 5 * box }];
let food = { x: Math.floor(Math.random() * 14 + 1) * box, y: Math.floor(Math.random() * 14 + 1) * box };
let d;

// Keyboard Controls
document.addEventListener("keydown", (e) => {
    if (e.keyCode == 37) setDirection("LEFT");
    if (e.keyCode == 38) setDirection("UP");
    if (e.keyCode == 39) setDirection("RIGHT");
    if (e.keyCode == 40) setDirection("DOWN");
});

// Mobile Button Function
function setDirection(newDir) {
    if (newDir == "LEFT" && d != "RIGHT") d = "LEFT";
    if (newDir == "UP" && d != "DOWN") d = "UP";
    if (newDir == "RIGHT" && d != "LEFT") d = "RIGHT";
    if (newDir == "DOWN" && d != "UP") d = "DOWN";
}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "#e94560" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "#00ff41";
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        scoreDisplay.innerText = score;
        food = { x: Math.floor(Math.random() * 14 + 1) * box, y: Math.floor(Math.random() * 14 + 1) * box };
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        if (score > highScore) localStorage.setItem("snakeHighScore", score);
        alert("Game Over!");
        location.reload();
    }
    snake.unshift(newHead);
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) return true;
    }
    return false;
}

let game = setInterval(draw, 150);
