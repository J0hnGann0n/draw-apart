import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    game: {
      users: {},
      code: ''
    }
  },
  mutations: {
    ADD_USER(state, payload) {
      let newUser = payload;
      state.game.users.push(newUser);

    }
  },
  actions: {
    addUser(context, payload) {
      context.commit('ADD_USER', payload);
    }
  },
  modules: {
  }
})
