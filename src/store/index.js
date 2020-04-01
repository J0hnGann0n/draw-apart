import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    game: {},
    player: {
      name: ""
    }
  },
  mutations: {
    CREATE_GAME(state, payload) {
      let newGame = payload;
      state.game = newGame;
    },
    ADD_PLAYERNAME(state, payload) {
      let newName = payload;
      state.player.name = newName;
    }
  },
  actions: {
    /**
     * Send request to server to create a new game with the given player name.
     * @param {} context 
     * @param {*} payload 
     */
    createGame(context, payload) {
      axios.post("/api/game/create", payload).then(result => {
        let newGame = result.data.game.game;
        context.commit('CREATE_GAME', newGame);
      });
    },
    addPlayerName(context, payload) {
      context.commit('ADD_PLAYERNAME', payload);
    }
  },
  modules: {
  },
  getters: {
    getGame: state => state.game
  }
})
