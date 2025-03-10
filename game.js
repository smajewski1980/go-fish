class Game {
  constructor() {
    this.currentDeck = new DeckOfCards();
    this.handOne = [];
    this.handTwo = [];
  }

  deal() {
    for (let i = 1; i < 6; i++) {
      this.handOne.push(this.currentDeck.shuffledDeck.pop());
      this.handTwo.push(this.currentDeck.shuffledDeck.pop());
    }
  }

  printCurrentDeck() {
    console.log(this.currentDeck.shuffledDeck);
  }

  printHands() {
    console.log(this.handOne);
    console.log(this.handTwo);
  }
}

const currentGame = new Game();
currentGame.deal();
currentGame.printHands();
