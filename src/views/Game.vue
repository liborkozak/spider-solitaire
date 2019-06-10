<template>
  <div class="game">
    <GameTable/>
  </div>
</template>

<script>
import Base from "@/components/Base.vue";
import GameTable from "@/components/game/Table.vue";

export default {
  name: "ViewsGame",
  extends: Base,
  components: {
    GameTable
  }
};
</script>