const computersHandDiv = document.querySelector(".computers-hand");
const playersHandDiv = document.querySelector(".players-hand");
const messageDiv = document.querySelector(".message");
const drawPile = document.querySelector(".draw-pile span");
const displayCurrPlayerElement = document.querySelector(
  ".display-curr-player span"
);
const booksFields = document.querySelectorAll(".inner-field");
const compBookField = booksFields[0];
const playerBookField = booksFields[1];

let currPlay = "You";
let currentCardChoice = 0;
let currentPlayer = 1;
let oppositePlayer = 0;
let canDrawCard = false;
let message;

function handleCardChoice(e) {
  // when this is working, there is no need to see or be able to select
  // a card from the computers hand
  if (e.target.closest("p")) {
    if (
      e.target.closest("p").closest("div").dataset.player ===
        currentPlayer.toString() &&
      !canDrawCard
    ) {
      currentCardChoice = parseInt(e.target.dataset.cardNum);
      currentGame.takeTurn();
    }
    // console.log(currentCardChoice);
  } else return;
}

function handleDrawPilePick() {
  currentGame.drawCard();
}

computersHandDiv.addEventListener("click", handleCardChoice);
playersHandDiv.addEventListener("click", handleCardChoice);
drawPile.addEventListener("click", handleDrawPilePick);
