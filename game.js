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
    this.setTurnVerbiage();
    this.setMessageText(
      `${message} have a ${cardDisplayNames[currentCardChoice]}?`
    );
    const oppPlayerHas = this.doesOppPlayerHave(currentCardChoice);

    setTimeout(() => {
      oppPlayerHas
        ? this.setMessageText(
            `Yes, they have a ${cardDisplayNames[currentCardChoice]}. Here You go`
          )
        : this.setMessageText(
            `Sorry, they don't have a ${cardDisplayNames[currentCardChoice]}, draw a card.`
          );
      if (oppPlayerHas) {
        let xferCard = this.players[oppositePlayer].hand.find((card, idx) => {
          if (card.number === currentCardChoice) {
            return this.players[oppositePlayer].hand.splice(idx, 1);
          }
        });
        this.players[currentPlayer].hand.push(xferCard);

        console.log(this.checkHandForBook());
        const bookNum = () => this.checkHandForBook();
        if (bookNum) {
          this.removeBookFromHand(bookNum());
          this.displayBooks();
        }

        this.switchCurrentPlayer();

        setTimeout(() => {
          this.setCurrPlayerElem();
          this.setMessageText("Choose a card to ask for.");
        }, gameFlow);
      } else {
        canDrawCard = true;
      }

      setTimeout(() => {
        this.updateUI();
      }, gameFlow);
    }, gameFlow);
    // todo's:
    // handle asking for a number that is in a book
    // handle if 4th of a book is in hand
    // later also need to handle when the fourth of a book is received
    // handle exception for empty hand
    // what if hand is dealt a book
    // if computers turn, have to make it ask for random card
  }

  checkHandForBook() {
    let bookNumber = null;
    let handCardCount = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
      12: 0,
      13: 0,
    };
    const hand = this.players[currentPlayer].hand;
    hand.forEach((card) => {
      handCardCount[card.number] += 1;
    });
    for (let number in handCardCount) {
      if (handCardCount[number] >= 3) {
        bookNumber = number;
      }
    }
    return bookNumber;
  }

  removeBookFromHand(number) {
    if (!number) return;
    const hand = this.players[currentPlayer].hand;

    for (let i = hand.length - 1; i >= 0; i--) {
      if (hand[i].number === parseInt(number)) {
        const card = hand.splice(i, 1);
        this.players[currentPlayer].books.push(card);
      }
    }

    this.updateUI();
    console.log(this.players[currentPlayer].books);
  }

  displayBooks() {
    compBookField.innerHTML = "<legend>Computer</legend>";
    playerBookField.innerHTML = "<legend>Player</legend>";
    this.playerOne.books.forEach((item) => {
      const card = item[0];
      compBookField.innerHTML += `<p>${
        card.number > 10 || card.number === 1 ? card.numberText : card.number
      } ${card.suit}</p>`;
    });
    this.playerTwo.books.forEach((item) => {
      const card = item[0];
      playerBookField.innerHTML += `<p'>${
        card.number > 10 || card.number === 1 ? card.numberText : card.number
      } ${card.suit}</p>`;
    });
  }

  drawCard() {
    if (canDrawCard) {
      console.log("drawing a card");

      let drawCard = this.currentDeck.shuffledDeck.pop();
      this.players[currentPlayer].hand.push(drawCard);

      console.log(this.checkHandForBook());
      this.removeBookFromHand(this.checkHandForBook());
      this.displayBooks();

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
