document.addEventListener('DOMContentLoaded', initGame);

function initGame() {
  const deck = createDeck();
  shuffleDeck(deck);
  dealCards(deck);
  setupStockClick();
}

function createDeck() {
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const values = [
    'A',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
  ];
  const deck = [];

  for (const suit of suits) {
    for (const value of values) {
      deck.push({ suit, value });
    }
  }

  return deck;
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function dealCards(deck) {
  const tableau = document.querySelectorAll('.tableau');
  const stock = document.getElementById('stock');

  // Deal cards to tableau
  for (let i = 0; i < tableau.length; i++) {
    for (let j = 0; j <= i; j++) {
      const card = deck.pop();
      const cardElement = createCardElement(card);
      if (j === i) {
        cardElement.classList.add('face-up');
      } else {
        cardElement.classList.add('face-down');
      }
      tableau[i].appendChild(cardElement);
    }
  }

  // Remaining cards go to stock
  while (deck.length) {
    const card = deck.pop();
    const cardElement = createCardElement(card);
    cardElement.classList.add('face-down');
    stock.appendChild(cardElement);
  }
}

function createCardElement(card) {
  const cardElement = document.createElement('div');
  cardElement.classList.add('card');
  cardElement.dataset.suit = card.suit;
  cardElement.dataset.value = card.value;
  cardElement.textContent = `${card.value} of ${card.suit}`;

  // Set color for hearts and diamonds
  if (card.suit === 'hearts' || card.suit === 'diamonds') {
    cardElement.classList.add('red');
  } else [cardElement.classList.add('black')];

  return cardElement;
}

function getSuitSymbole(suit) {
  switch (suit) {
    case 'hearts':
      return '♥';
    case 'diamonds':
      return '♦';
    case 'clubs':
      return '♣';
    case 'spades':
      return '♠';
    default:
      return '';
  }
}
function setupStockClick() {
  const stock = document.getElementById('stock');
  const waste = document.getElementById('waste');

  stock.addEventListener('click', function () {
    const topCard = stock.lastElementChild;
    if (topCard) {
      topCard.classList.remove('face-down');
      topCard.classList.add('face-up');
      waste.appendChild(topCard);
    }
  });
}
