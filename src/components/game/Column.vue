<template>
  <div class="card-column">
    <v-img
      v-for="(card, i) in cardsList"
      :key="`card-${i}`"
      :class="getCardCls(i)"
      position="top top"
      :src="getCardSrc(card)"
      draggable="true"
      @dragstart="dragStart(i, $event)"
      @dragover.prevent
      @dragend="dragEnd()"
      @drop="dragFinish()"
      @dblclick.native="dblClick(card, i)"
    ></v-img>
  </div>
</template>

<script>
export default {
  name: "ComponentsGameColumn",
  props: {
    cards: Array,
    additionalCards: Array
  },
  data() {
    return {
      cardsList: [],
      dragging: -1
    };
  },
  watch: {
    additionalCards: function() {
      this.cardsList = this.cardsList.concat(this.additionalCards);
    }
  },
  created() {
    this.cardsList = this.cards;
  },
  methods: {
    addCards(cards) {
      this.cardsList = this.cardsList.concat(cards);
    },
    checkCompleteness() {
      let complete = false;
      let done;
      let current;
      let item = this.cardsList.length;
      let cardToCheck;
      while (item-- && !done) {
        current = this.cardsList[item];
        if (current.covered) {
          done = true;
        } else {
          cardToCheck = this.cardsList[item - 1];
          if (cardToCheck && cardToCheck.value - current.value === 1) {
            complete = cardToCheck.value === 13;
          } else {
            done = true;
          }
        }
      }
      if (complete) {
        this.cardsList.splice(item + 1);
        let lastCard = this.cardsList[this.cardsList.length - 1];
        if (lastCard) {
          lastCard.covered = false;
        }
        this.$parent.updatePoints(true);
      }
      return complete;
    },
    dblClick(card, cardIndex) {
      if (card.value === 13) {
        let cards = this.cardsList.slice(cardIndex);
        let moved = this.$parent.moveCards(cards);
        if (moved) {
          this.cardsList.splice(cardIndex);
          let lastCard = this.cardsList[this.cardsList.length - 1];
          if (lastCard) {
            lastCard.covered = false;
          }
        }
      }
    },
    dragStart(index, ev) {
      let card = this.cardsList[index];
      let allowed = this.isDragAllowed(card, index);
      if (allowed) {
        this.$parent.dragInfo = {
          cards: this.cardsList.slice(index, this.cardsList.length),
          index: index
        };
        this.dragging = index;
      } else {
        ev.preventDefault();
      }
    },
    dragEnd() {
      let dragInfo = this.$parent.dragInfo;
      if (dragInfo.done) {
        this.cardsList.splice(dragInfo.index);
        let lastCard = this.cardsList[this.cardsList.length - 1];
        if (lastCard) {
          lastCard.covered = false;
        }
      }
      this.dragging = -1;
    },
    dragFinish() {
      let dragInfo = this.$parent.dragInfo;
      let dragCards = dragInfo.cards;

      let lastCard = this.cardsList[this.cardsList.length - 1];
      let cardToCheck = dragCards[0];
      let allowed = this.isDropAllowed(cardToCheck, lastCard);

      if (allowed) {
        let lastDragCard = dragCards[dragCards.length - 1];
        let isAce = lastDragCard.value === 1;
        let complete = false;
        if (isAce) {
          complete = this.checkCompleteness();
        }

        if (!complete) {
          this.addCards(dragCards);
          this.$parent.updatePoints();
        }

        dragInfo.done = true;
      }
    },
    getCardSrc(card) {
      return "/cards/" + (card.covered ? "cardBack_blue5.png" : card.src);
    },
    getCardCls(index) {
      return index !== this.cardsList.length - 1 ? "not-last-card" : "";
    },
    isDragAllowed(card, cardIndex) {
      let allowed = !card.covered;
      let cardsCount = this.cardsList.length - 1;
      let isLastCard = cardIndex === cardsCount;
      if (allowed && !isLastCard) {
        let cardsBellow = this.cardsList.slice(cardIndex + 1);
        let cardToCheck = card;
        let sameGroup;
        let current;
        let item = 0;
        while (item < cardsBellow.length) {
          current = cardsBellow[item];
          sameGroup = this.isSameGroup(cardToCheck.index, current.index);
          if (sameGroup && cardToCheck.value - current.value === 1) {
            cardToCheck = current;
          } else {
            allowed = false;
          }
          item++;
        }
      }

      return allowed;
    },
    isDropAllowed(from, to) {
      let allowed = !to;
      if (!allowed) {
        allowed = to.value - from.value === 1;
      }
      return allowed;
    },
    isSameGroup(from, to) {
      let same = false;
      let current;
      let range = this.$store.getters.range;
      for (let group in range) {
        if (range.hasOwnProperty(group)) {
          current = range[group];
          if (
            from >= current.min &&
            from <= current.max &&
            to >= current.min &&
            to <= current.max
          ) {
            same = true;
            break;
          }
        }
      }
      return same;
    }
  }
};
</script>
<style scoped>
.not-last-card {
  height: 50px;
  border-top: 1px solid white;
}
</style>
