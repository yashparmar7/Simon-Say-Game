let gameSequence = [];
let userSequence = [];
let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highScore = Number(localStorage.getItem("highScore")) || 0;

let h2 = document.querySelector("h2");
let scoreDisplay = document.getElementById("score");
let restartBtn = document.getElementById("restart-btn");

document.addEventListener("keypress", startGame);
document.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault(); // Prevent multiple triggers on touch devices
    startGame();
  },
  { once: true }
); // Ensures event fires only once

restartBtn.addEventListener("click", function () {
  hideRestartButton();
  started = true;
  levelUp();
});

function startGame() {
  if (!started) {
    started = true;
    levelUp();
    hideRestartButton();
  }
}

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => btn.classList.remove("userflash"), 250);
}

function updateScore() {
  scoreDisplay.innerText = `Score: ${level}`;
}

function levelUp() {
  userSequence = [];
  level++;
  updateScore();
  h2.innerText = `Level ${level} | High Score: ${highScore}`;

  let randomIndex = Math.floor(Math.random() * 4);
  let randColor = btns[randomIndex];
  let randBtn = document.querySelector(`.${randColor}`);

  gameSequence.push(randColor);
  gameFlash(randBtn);
}

function checkAns(idx) {
  if (userSequence[idx] === gameSequence[idx]) {
    if (userSequence.length === gameSequence.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    if (level > highScore) {
      highScore = level;
      localStorage.setItem("highScore", highScore);
    }

    h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> High Score: <b>${highScore}</b>`;
    document.body.style.backgroundColor = "red";
    setTimeout(() => (document.body.style.backgroundColor = "white"), 200);

    showRestartButton();
    reset();
  }
}

function btnPress(e) {
  e.preventDefault(); // Prevent unwanted double taps on mobile
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSequence.push(userColor);

  checkAns(userSequence.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
allBtns.forEach((btn) => {
  btn.addEventListener("click", btnPress);
  btn.addEventListener("touchstart", btnPress, { passive: false }); // Allow touch input
});

function reset() {
  started = false;
  gameSequence = [];
  userSequence = [];
  level = 0;
}

function showRestartButton() {
  restartBtn.style.display = "block";
}

function hideRestartButton() {
  restartBtn.style.display = "none";
}
