import Vue from 'vue';
import cards, { Monstermon } from '@/services/monstermon-cards';

const gameState: 'preGame' |
  'player1Attack' |
  'player2Defend' |
  'player2Attack' |
  'player1Defend' |
  'gameOver' = 'player1Attack';

const store = Vue.observable({
  gameState,
  player1: {
    deck: [] as Monstermon[],
    discard: [] as Monstermon[],
    hand: [] as Monstermon[],
    inPlay: null,
  },
  player2: {
    deck: [] as Monstermon[],
    discard: [] as Monstermon[],
    hand: [] as Monstermon[],
    inPlay: null,
  },
});

const tempDeckBuilder = {
  makeGreenDeck() {
    const deck = [];
    for (let i = 0; i < 10; i++) {
      deck.push(cards.k2GreenMonstermon[i]);
    }
    return deck;
  },
};

export default {
  store,
  tempDeckBuilder,
};
