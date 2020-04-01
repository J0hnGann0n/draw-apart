import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    game: {}
  },
  mutations: {
    CREATE_GAME(state, payload) {
      let newGame = payload;
      state.game = newGame;
    }
  },
  actions: {
    createGame(context, payload) {
      axios.post("/api/game/create", payload).then(result => {
        let newGame = result.data.game.game;
        newGame.state = "lobby";
        context.commit('CREATE_GAME', newGame);
      });
    }
  },
  modules: {
  },
  getters: {
    getGame: state => state.game
  }
})
