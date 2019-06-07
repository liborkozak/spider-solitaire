import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loc: {
      ViewsHighScore: {
        personalScore: 'Personal best',
        score: 'High score'
      },
      ViewsHome: {
        errorMsg: 'This field is required',
        highScore: 'High Score',
        play: 'Play',
        username: 'Enter your username...'
      }
    }
  },
  mutations: {

  },
  actions: {

  }
});
