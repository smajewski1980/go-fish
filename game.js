let currentPlayer = 1;
let oppositePlayer;
currentPlayer === 1 ? (oppositePlayer = 0) : (oppositePlayer = 1);

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
  }

  welcome() {
    confirm(`The computer will be player 1, push ok to start.`);
  }

  takeTurn(player) {
    // display players hand
    // have player select card to ask for
    // if computer player, ask for random card
    // see if that card is in opposite players hand
    // if not draw from pile
    // if so, transfer to other players hand
    // check for book
    // if book add book
    this.switchCurrentPlayer();
  }

  updateUI() {
    this.playerOne.hand.forEach((card) => {
      computersHandDiv.innerHTML += `${
        card.number > 10 || card.number === 1 ? card.numberText : card.number
      }&nbsp;${card.suit}&nbsp;&nbsp;&nbsp;`;
    });
    this.playerTwo.hand.forEach((card) => {
      playersHandDiv.innerHTML += `${
        card.number > 10 || card.number === 1 ? card.numberText : card.number
      }&nbsp;${card.suit}&nbsp;&nbsp;&nbsp;`;
    });
  }

  playGame() {
    // this.welcome();
    this.takeTurn(this.players[currentPlayer]);
    this.updateUI();
  }

  deal() {
    for (let i = 1; i < 6; i++) {
      this.playerOne.hand.push(this.currentDeck.shuffledDeck.pop());
      this.playerTwo.hand.push(this.currentDeck.shuffledDeck.pop());
    }
  }

  printCurrentDeck() {
    console.log(this.currentDeck.shuffledDeck);
  }

  printHands() {
    console.log(this.playerOne.hand);
    console.log(this.playerTwo.hand);
  }
}

const currentGame = new Game();
currentGame.deal();
currentGame.playGame();
// currentGame.printHands();
