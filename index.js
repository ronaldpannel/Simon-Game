const container = document.getElementById("container");

const redBtn = document.getElementById("red");
const blueBtn = document.getElementById("blue");
const greenBtn = document.getElementById("green");
const yellowBtn = document.getElementById("yellow");
const buttons = document.querySelectorAll(".btn");
const startBtn = document.getElementById("startBtn");

const redAudio = document.getElementById("redAudio");
const blueBtnAudio = document.getElementById("blueAudio");
const greenAudio = document.getElementById("greenAudio");
const yellowAudio = document.getElementById("yellowAudio");
const wrongAudio = document.getElementById("wrongAudio");

let userSequence = [];
let simonSequence = [];
let round = 1;

function generateRandomColor() {
  const colors = ["red", "blue", "green", "yellow"];
  let randomIndex = Math.floor(Math.random() * 4);
  return colors[randomIndex];
}

function playSimonSequence() {
  for (let i = 0; i < simonSequence.length; i++) {
    setTimeout(() => {
      const color = simonSequence[i];
      highlightButton(color);
    }, i * 2000);
  }
  setTimeout(() => {
    userSequence = [];
  }, round * 2000);
}

function highlightButton(color) {
  const button = document.getElementById(color);
  if (button) {
    button.classList.add("active");
    setTimeout(() => {
      button.classList.remove("active");
    }, 500);
  }
}

function handleButtonClick(color) {
  userSequence.push(color);
  highlightButton(color);
  if(highlightButton(color) === 'red'){
    redAudio.play()
  }

  const isEqual = userSequence.every(
    (val, index) => val === simonSequence[index]
  );
  if (isEqual) {
    if (userSequence.length === round) {
      round++;
      simonSequence.push(generateRandomColor());
      setTimeout(() => {
        playSimonSequence();
      }, 3000);
    }
  } else {
    wrongAudio.play();
    console.log("Game Over");
    resetGame();
  }
}

function startGame() {
  simonSequence.push(generateRandomColor());
  playSimonSequence();
}
 console.log("simon", simonSequence);
 console.log("user", userSequence);

function resetGame() {
  simonSequence = [];
  userSequence = [];
  round = 1;
  startGame();
}
startGame()

startBtn.addEventListener("click", (e) => {
  location.reload()
;
});
