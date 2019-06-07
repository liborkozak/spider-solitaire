<template>
  <div class="score">
    <div class="score-table-container">
      <h3 class="title">{{loc.personalScore}}</h3>
      <br>
      <ScoreTable personal/>
    </div>
    <div class="score-table-container">
      <h3 class="title">{{loc.score}}</h3>
      <br>
      <ScoreTable/>
    </div>
  </div>
</template>

<script>
import Base from '@/components/Base.vue';
import ScoreTable from '@/components/score/Table.vue';

export default {
  name: 'ViewsHighScore',
  extends: Base,
  props: {
    username: String
  },
  components: {
    ScoreTable
  }
};
</script>

<style scoped>
.score {
  padding: 30px;
}
.score-table-container {
  padding: 0 50px 50px 50px;
}
.title {
  text-transform: uppercase;
}
</style>