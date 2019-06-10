import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cards: {
      clubs: [
        'cardClubsA.png',
        'cardClubs2.png',
        'cardClubs3.png',
        'cardClubs4.png',
        'cardClubs5.png',
        'cardClubs6.png',
        'cardClubs7.png',
        'cardClubs8.png',
        'cardClubs9.png',
        'cardClubs10.png',
        'cardClubsJ.png',
        'cardClubsQ.png',
        'cardClubsK.png'
      ],
      diamonds: [
        'cardDiamondsA.png',
        'cardDiamonds2.png',
        'cardDiamonds3.png',
        'cardDiamonds4.png',
        'cardDiamonds5.png',
        'cardDiamonds6.png',
        'cardDiamonds7.png',
        'cardDiamonds8.png',
        'cardDiamonds9.png',
        'cardDiamonds10.png',
        'cardDiamondsJ.png',
        'cardDiamondsQ.png',
        'cardDiamondsK.png'
      ],
      hearts: [
        'cardHeartsA.png',
        'cardHearts2.png',
        'cardHearts3.png',
        'cardHearts4.png',
        'cardHearts5.png',
        'cardHearts6.png',
        'cardHearts7.png',
        'cardHearts8.png',
        'cardHearts9.png',
        'cardHearts10.png',
        'cardHeartsJ.png',
        'cardHeartsQ.png',
        'cardHeartsK.png'
      ],
      spades: [
        'cardSpadesA.png',
        'cardSpades2.png',
        'cardSpades3.png',
        'cardSpades4.png',
        'cardSpades5.png',
        'cardSpades6.png',
        'cardSpades7.png',
        'cardSpades8.png',
        'cardSpades9.png',
        'cardSpades10.png',
        'cardSpadesJ.png',
        'cardSpadesQ.png',
        'cardSpadesK.png'
      ]
    },
    cardsRange: {
      clubs: {
        min: 0,
        max: 12
      },
      diamonds: {
        min: 13,
        max: 25
      },
      hearts: {
        min: 26,
        max: 38
      },
      spades: {
        min: 39,
        max: 51
      }
    },
    loc: {
      ComponentsGameTable: {
        scorePoints: 'Score points:',
        movePoints: 'Move points:',
        undo: 'Undo'
      },
      ViewsHighScore: {
        personalScore: 'Personal best',
        score: 'High score'
      },
      ViewsHome: {
        errorMsg: 'This field is required',
        highScore: 'High Score',
        play: 'Play',
        username: 'Enter your username...',
        lvl1: '1 Suit',
        lvl2: '2 Suits',
        lvl3: '4 Suits'
      }
    }
  },
  mutations: {

  },
  actions: {

  },
  getters: {
    /**
     * @param {Object} state 
     * @return {Object} Just spades group of cards
     */
    lvl1: function (state) {
      return state.cards.spades;
    },
    /**
     * @param {Object} state 
     * @return {Object} Spades and hearts group of cards
     */
    lvl2: function (state) {
      let cards = state.cards;
      return cards.spades.concat(cards.hearts);
    },
    /**
     * @param {Object} state 
     * @return {Object} All cards
     */
    lvl3: function (state) {
      let cards = state.cards;
      return cards.spades.concat(cards.hearts, cards.clubs, cards.diamonds);
    },
    /**
     * @param {Object} state 
     * @return {Object} Cards range
     */
    range: function(state){
      return state.cardsRange;
    }
  }
});
