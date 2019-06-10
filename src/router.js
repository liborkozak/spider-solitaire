import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import HighScore from './views/HighScore.vue';
import Game from './views/Game.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/score/username=:username',
      name: 'score',
      component: HighScore
    },
    {
      path: '/game/level=:level/username=:username',
      name: 'game',
      component: Game
    }
  ]
});
