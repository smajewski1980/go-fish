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

const cardDisplayNames = {
  1: "Ace",
  2: "Two",
  3: "Three",
  4: "Four",
  5: "Five",
  6: "Six",
  7: "Seven",
  8: "Eight",
  9: "Nine",
  10: "Ten",
  11: "Jack",
  12: "Queen",
  13: "King",
};
const gameFlow = 1000;

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

function handleBookCardClick() {
  // todo: finish this function
  console.log("you clicked on a book card");
}

document.addEventListener("click", (e) => {
  if (e.target.tagName === "P" && e.target.closest("fieldset")) {
    handleBookCardClick();
  }
});

computersHandDiv.addEventListener("click", handleCardChoice);
playersHandDiv.addEventListener("click", handleCardChoice);
drawPile.addEventListener("click", handleDrawPilePick);
