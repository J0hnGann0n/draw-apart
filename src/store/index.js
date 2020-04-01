import Vue from 'vue'
import Vuex from 'vuex'
import axios from "../services/axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    game: {},
    player: {
      name: ""
    }
  },
  mutations: {
    ADD_GAME(state, payload) {
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
        context.commit('ADD_GAME', newGame);
      });
    },
    joinGame(context, payload) {
      let gameCode = payload.gamecode;
      axios.post("/api/game/" + gameCode, payload.playername).then(result => {
        context.commit('ADD_GAME', result.data.game);
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
