class DeckOfCards {
  constructor() {
    this.deck = [];
    this.createDeck();
    this.shuffledDeck = this.shuffleDeck(this.deck);
  }

  Card = class Card {
    constructor(numberText, suit, number) {
      this.numberText = numberText;
      this.suit = suit;
      this.number = number;
    }
  };

  createDeck() {
    const suits = ["clubs", "diamonds", "spades", "hearts"];

    suits.forEach((suit) => {
      for (let i = 1; i < 14; i++) {
        let numText;
        switch (i) {
          case 1:
            numText = "ace";
            break;
          case 11:
            numText = "jack";
            break;
          case 12:
            numText = "queen";
            break;
          case 13:
            numText = "king";
            break;
          default:
            numText = `${i}`;
            break;
        }

        this.deck.push(new this.Card(numText, suit, i));
      }
    });
  }

  shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      let random = Math.floor(Math.random() * deck.length);
      let temp = deck[i];
      deck[i] = deck[random];
      deck[random] = temp;
    }

    return deck;
  }
}
