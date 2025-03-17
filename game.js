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

  // will still need adjusting later on, just sets certain words dependent on whose turn it is
  setTurnVerbiage() {
    if (currentPlayer === 0) {
      currPlay = "Computer";
      message = "Do you";
    } else {
      currPlay = "You";
      message = "Does the Computer";
    }
  }

  setMessageText(text) {
    messageDiv.innerText = text;
  }

  setCurrPlayerElem() {
    displayCurrPlayerElement.innerText =
      currentPlayer === 0 ? "Computer" : "You";
  }

  takeTurn() {
    // if computers turn, have to make it ask for random card

    this.setTurnVerbiage();
    this.setMessageText(`${message} have a ${currentCardChoice}?`);
    const oppPlayerHas = this.doesOppPlayerHave(currentCardChoice);

    setTimeout(() => {
      oppPlayerHas
        ? this.setMessageText(
            `Yes, they have a ${currentCardChoice}. Here You go`
          )
        : this.setMessageText(
            `Sorry, they don't have a ${currentCardChoice}, draw a card.`
          );
      if (oppPlayerHas) {
        let xferCard = this.players[oppositePlayer].hand.find((card, idx) => {
          if (card.number === currentCardChoice) {
            return this.players[oppositePlayer].hand.splice(idx, 1);
          }
        });
        this.players[currentPlayer].hand.push(xferCard);
        this.switchCurrentPlayer();

        setTimeout(() => {
          this.setCurrPlayerElem();
          this.setMessageText("Choose a card to ask for.");
        }, 2000);
      } else {
        canDrawCard = true;
      }

      setTimeout(() => {
        this.updateUI();
      }, 2000);
    }, 2000);
    // todo's:
    // check for book
    // if book add book
  }

  drawCard() {
    if (canDrawCard) {
      console.log("drawing a card");

      let drawCard = this.currentDeck.shuffledDeck.pop();
      this.players[currentPlayer].hand.push(drawCard);

      this.switchCurrentPlayer();
      this.setCurrPlayerElem();
      this.updateUI();
      canDrawCard = false;
      messageDiv.innerText = "Choose a card to ask for.";
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
