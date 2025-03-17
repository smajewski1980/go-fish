let currentPlayer = 1;
let oppositePlayer = 0;
let canDrawCard = false;

class Game {
  constructor() {
    this.currentDeck = new DeckOfCards();
    this.playerOne = {
      name: "player one",
      hand: [],
      books: [],
    };
    this.playerTwo = {
      name: "player two",
      hand: [],
      books: [],
    };
    this.players = [this.playerOne, this.playerTwo];
  }

  switchCurrentPlayer() {
    currentPlayer === 1 ? (currentPlayer = 0) : (currentPlayer = 1);
    oppositePlayer === 0 ? (oppositePlayer = 1) : (oppositePlayer = 0);

    // later this will move to the draw a card func
    displayCurrPlayerElement.innerText =
      currentPlayer === 0 ? "Computer" : "You";
  }

  welcome() {
    confirm(`The computer will be player 1, push ok to start.`);
  }

  doesOppPlayerHave(card) {
    let checkCard = parseInt(card);
    let doThey = false;
    this.players[oppositePlayer].hand.forEach((card) => {
      if (card.number === checkCard) {
        doThey = true;
      }
    });
    return doThey;
  }

  takeTurn() {
    let message, currPlay;
    if (currentPlayer === 0) {
      currPlay = "Computer";
      message = "Do you";
    } else {
      currPlay = "You";
      message = "Does the Computer";
    }

    messageDiv.innerText = `${message} have a ${currentCardChoice}?`;
    const oppPlayerHas = this.doesOppPlayerHave(currentCardChoice);

    setTimeout(() => {
      oppPlayerHas
        ? (messageDiv.innerText = `Yes, they have a ${currentCardChoice}. Here You go`)
        : (messageDiv.innerText = `Sorry, they don't have a ${currentCardChoice}, draw a card.`);
      if (oppPlayerHas) {
        let xferCard = this.players[oppositePlayer].hand.find((card, idx) => {
          if (card.number === currentCardChoice) {
            return this.players[oppositePlayer].hand.splice(idx, 1);
          }
        });
        this.players[currentPlayer].hand.push(xferCard);
        this.switchCurrentPlayer();
      } else {
        canDrawCard = true;
      }
      this.updateUI();
    }, 2000);
    // have player select card to ask for
    // if computer player, ask for random card
    // see if that card is in opposite players hand
    // if not draw from pile
    // if so, transfer to other players hand
    // check for book
    // if book add book
  }

  drawCard() {
    if (canDrawCard) {
      console.log("drawing a card");
      this.switchCurrentPlayer();
      displayCurrPlayerElement.innerText =
        currentPlayer === 0 ? "Computer" : "You";
      canDrawCard = false;
    }
  }

  updateUI() {
    computersHandDiv.innerHTML = "";
    playersHandDiv.innerHTML = "";
    this.playerOne.hand.forEach((card) => {
      computersHandDiv.innerHTML += `<p data-card-num='${card.number}'>${
        card.number > 10 || card.number === 1 ? card.numberText : card.number
      } ${card.suit}</p>`;
    });
    this.playerTwo.hand.forEach((card) => {
      playersHandDiv.innerHTML += `<p data-card-num='${card.number}'>${
        card.number > 10 || card.number === 1 ? card.numberText : card.number
      } ${card.suit}</p>`;
    });
  }

  playGame() {
    // this.takeTurn(this.players[currentPlayer]);
    this.updateUI();
  }

  deal() {
    for (let i = 1; i < 6; i++) {
      this.playerOne.hand.push(this.currentDeck.shuffledDeck.pop());
      this.playerTwo.hand.push(this.currentDeck.shuffledDeck.pop());
    }
  }
}

const currentGame = new Game();
currentGame.deal();
currentGame.playGame();
