<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex v-for="i in 10" :key="`column-${i}`" xs1>
        <GameColumn :cards="cards[i]" :additionalCards="additionalCards[i]"/>
      </v-flex>
    </v-layout>
    <v-btn
      absolute
      fab
      bottom
      right
      v-for="(cards, i) in restOfCards"
      :style="{ right: 50 + i * 8 + 'px' }"
      class="deck"
      :key="`card-from-deck-${i}`"
      @click="dealCards()"
    >
      <v-img src="/cards/cardBack_blue5.png"></v-img>
    </v-btn>
    <v-bottom-nav :value="true" absolute color="transparent">
      <v-flex class="game-bottom-bar">
        <!-- <v-btn>
          <span>{{loc.undo}}</span>
          <v-icon>history</v-icon>
        </v-btn>-->
        <span class="game-info score-points">{{loc.scorePoints}} {{scorePoints}}</span>
        <span class="game-info move-points">{{loc.movePoints}} {{movePoints}}</span>
      </v-flex>
    </v-bottom-nav>
  </v-container>
</template>
<script>
import Base from "@/components/Base.vue";
import GameColumn from "@/components/game/Column.vue";

export default {
  name: "ComponentsGameTable",
  extends: Base,
  components: {
    GameColumn
  },
  data() {
    return {
      additionalCards: {},
      cards: {},
      dragInfo: {},
      restOfCards: [],
      scorePoints: 500,
      movePoints: 0
    };
  },
  created() {
    this.parseCards();
  },
  methods: {
    getCards(difficulty) {
      let cards = this.$store.getters["lvl" + difficulty];
      let cardsList = [];
      let value = 13;
      let index = cards.length;
      while (index--) {
        cardsList.push({
          src: cards[index],
          value: value--,
          index: index,
          covered: true
        });
        if (!value) {
          value = 13;
        }
      }
      return cardsList;
    },
    dealCards() {
      let cards = this.restOfCards.pop();
      let current;
      let item = cards.length;
      let additionalCards = {};
      while (item--) {
        current = cards[item];
        current.covered = false;
        additionalCards[item + 1] = [current];
      }
      this.additionalCards = additionalCards;
    },
    moveCards(cards) {
      let moved = false;
      let current;
      for (let card in this.cards) {
        if (this.cards.hasOwnProperty(card)) {
          current = this.cards[card];
          if (!current.length) {
            for (let item in cards) {
              if (cards.hasOwnProperty(item)) {
                this.cards[card].push(cards[item]);
              }
            }
            moved = true;
            break;
          }
        }
      }
      return moved;
    },
    parseCards() {
      let difficulty = this.$route.params.level;
      let cards = this.getCards(difficulty);
      let cardsDeck = this.prepareDeck(cards);

      let cardsMap = {
        "1": 6,
        "2": 6,
        "3": 6,
        "4": 6,
        "5": 5,
        "6": 5,
        "7": 5,
        "8": 5,
        "9": 5,
        "10": 5
      };
      let cardsSet;
      for (let prop in cardsMap) {
        if (cardsMap.hasOwnProperty(prop)) {
          this.additionalCards[prop] = [];
          cardsSet = cardsDeck.splice(0, cardsMap[prop]);
          cardsMap[prop] = this.prepareCardsSet(cardsSet);
        }
      }

      let restOfCards = [];
      let step = 10;
      let item = cardsDeck.length;
      while (item) {
        restOfCards.push(cardsDeck.splice(0, 10));
        item = item - step;
      }
      this.restOfCards = restOfCards;
      this.cards = cardsMap;
    },
    prepareCardsSet(cardsSet) {
      let cardsSetClone = [];
      let item = cardsSet.length;
      while (item--) {
        cardsSetClone.push({
          src: cardsSet[item].src,
          value: cardsSet[item].value,
          index: cardsSet[item].index,
          covered: item !== 0
        });
      }
      return cardsSetClone;
    },
    prepareDeck(cards) {
      let item = cards.length;
      while (item !== 104) {
        cards = cards.concat(cards);
        item += item;
      }
      cards = this.shuffleDecks(cards);
      return cards;
    },
    shuffleDecks(cards) {
      return cards.sort(this.sortCards.bind(this));
    },
    sortCards() {
      return Math.random() - 0.5;
    },
    updatePoints(increase) {
      let points = increase ? 100 : -1;
      this.scorePoints += points;
      this.movePoints++;
    }
  }
};
</script>
<style scoped lang="scss">
.deck {
  height: 120px;
  width: 120px;
  bottom: 110px !important;
}
.game-bottom-bar {
  text-align: left;
}
.game-info {
  position: absolute;
  top: 16px;
  font-size: 1.2em;
  text-transform: uppercase;
}
.move-points {
  right: 100px;
}
.score-points {
  right: 330px;
}
</style>