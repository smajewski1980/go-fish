let currentPlayer = 1;
let oppositePlayer = 0;

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
    console.log(`currentPlayer is: ${this.players[currentPlayer].name}`);
    console.log(`opposite Player is: ${this.players[oppositePlayer].name}`);
    console.log(`current card is: ${currentCardChoice}`);
    let message;
    currentPlayer === 0 ? (currPlay = "Computer") : (currPlay = "You");
    displayCurrPlayerElement.innerText = `${currPlay}`;
    currentPlayer === 0 ? (message = "you") : (message = "Computer");
    messageDiv.innerText = `Does the ${message} have a ${currentCardChoice}?`;
    // console.log(currentCardChoice);
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
      }
      this.updateUI();
      this.switchCurrentPlayer();
    }, 2000);
    // have player select card to ask for
    // if computer player, ask for random card
    // see if that card is in opposite players hand
    // if not draw from pile
    // if so, transfer to other players hand
    // check for book
    // if book add book
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
