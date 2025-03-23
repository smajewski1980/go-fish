class Game {
  constructor() {
    this.currentDeck = new DeckOfCards();
    this.playerOne = {
      name: "player one",
      hand: [],
      books: [],
      howManyBooks: 0,
    };
    this.playerTwo = {
      name: "player two",
      hand: [],
      books: [],
      howManyBooks: 0,
    };
    this.players = [this.playerOne, this.playerTwo];
  }

  getHowManyBooks(player) {
    return player.howManyBooks;
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

  isHandEmpty() {
    return this.players[currentPlayer].hand.length === 0;
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
        let xferCards = [];
        let xferCardsIndexes = [];
        let hand = this.players[oppositePlayer].hand;
        hand.forEach((card, idx) => {
          if (card.number === currentCardChoice) {
            xferCardsIndexes.push(idx);
          } else return;
        });
        xferCardsIndexes.reverse().forEach((idx) => {
          xferCards.push(hand.splice(idx, 1)[0]);
        });
        xferCards.forEach((card) => {
          this.players[currentPlayer].hand.push(card);
        });
        // this.players[currentPlayer].hand.push(xferCards);

        const bookNum = () => this.checkHandForBook();
        if (bookNum) {
          this.removeBookFromHand(bookNum());
          this.displayBooks();
        }

        this.switchCurrentPlayer();

        if (this.isHandEmpty() && this.cardsLeftInDeck() === 0) {
          this.endOfGame();
          return;
        }
        if (this.isHandEmpty()) {
          console.log("this is after the player switch. the hand is empty");
          this.setCurrPlayerElem();
          this.setMessageText("Your hand is empty, draw a card.");
          return;
        }

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
    // what if hand is dealt a book at start of game
    // if computers turn, have to make it ask for random card
    // finish endOfGame func
    // *can click quick on another card and change current card choice *BUG
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
      if (handCardCount[number] === 4) {
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
        const cardNum = card[0].number;
        this.players[currentPlayer].books.push(card);
      }
    }
    this.players[currentPlayer].howManyBooks++;
    this.updateUI();
    // console.log(this.players[currentPlayer].books);
  }

  displayBooks() {
    compBookField.innerHTML = "<legend>Computer</legend>";
    playerBookField.innerHTML = "<legend>Player</legend>";
    this.playerOne.books.forEach((item) => {
      const card = item[0];
      compBookField.innerHTML += `<p data-card-num='${card.number}'>${
        card.number > 10 || card.number === 1 ? card.numberText : card.number
      } ${card.suit}</p>`;
    });
    this.playerTwo.books.forEach((item) => {
      const card = item[0];
      playerBookField.innerHTML += `<p data-card-num='${card.number}'>${
        card.number > 10 || card.number === 1 ? card.numberText : card.number
      } ${card.suit}</p>`;
    });
  }

  cardsLeftInDeck() {
    return this.currentDeck.shuffledDeck.length;
  }

  drawCard() {
    console.log(this.cardsLeftInDeck());

    if (canDrawCard && this.cardsLeftInDeck() >= 1) {
      // console.log("drawing a card");

      let drawCard = this.currentDeck.shuffledDeck.pop();
      this.players[currentPlayer].hand.push(drawCard);

      // console.log(this.checkHandForBook());
      this.removeBookFromHand(this.checkHandForBook());
      this.displayBooks();

      this.switchCurrentPlayer();
      this.setCurrPlayerElem();
      this.updateUI();
      canDrawCard = false;
      messageDiv.innerText = "Choose a card to ask for.";
      if (this.isHandEmpty()) {
        this.setCurrPlayerElem();
        this.setMessageText("Your hand is empty, draw a card.");
      }
      if (this.isHandEmpty() && this.currentDeck.shuffledDeck.length === 0) {
        this.endOfGame();
        return;
      }
    } else if (this.isHandEmpty() && this.cardsLeftInDeck() === 0) {
      this.endOfGame();
    } else if (this.isHandEmpty()) {
      console.log("the hand is empty");
      let drawCard = this.currentDeck.shuffledDeck.pop();
      this.players[currentPlayer].hand.push(drawCard);
      this.switchCurrentPlayer();
      this.setCurrPlayerElem();
      this.updateUI();
      canDrawCard = false;
      messageDiv.innerText = "Choose a card to ask for.";
      if (this.isHandEmpty()) {
        this.setMessageText("Your hand is empty, draw a card.");
      }
    } else return;
  }

  endOfGame() {
    const computerScore = this.getHowManyBooks(this.playerOne);
    const playerScore = this.getHowManyBooks(this.playerTwo);
    const winner = () => {
      if (computerScore > playerScore) {
        return "computer";
      } else {
        return "player";
      }
    };
    console.log("now we figure out who won");
    messageDiv.innerHTML = `
        Game Over</br>
        The Computer Has ${computerScore} books and the player has ${playerScore} books.</br>
        The ${winner()} is the winner!
        `;
    displayCurrPlayerElement.parentElement.remove();
    drawPile.parentElement.remove();
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
    for (let i = 1; i < 25; i++) {
      this.playerOne.hand.push(this.currentDeck.shuffledDeck.pop());
      this.playerTwo.hand.push(this.currentDeck.shuffledDeck.pop());
    }
  }
}

const currentGame = new Game();
currentGame.deal();
currentGame.playGame();
