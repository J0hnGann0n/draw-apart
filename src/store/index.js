import Vue from 'vue'
import Vuex from 'vuex'
import axios from "../services/axios"
import firebase from "../services/firebase";
import test_image from "../../test_image"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    game: {
      code: "abcd",
      state: "play",
      players: ["john"],
      drawings: [
        {
          imageData: test_image,
          player: "bob",
          bodyPart: "head"
        },
        {
          imageData: test_image,
          player: "johmirjamn",
          bodyPart: "body"
        },
        {
          imageData: test_image,
          player: "paul",
          bodyPart: "legs"
        },
        {
          imageData: test_image,
          player: "mary",
          bodyPart: "feet"
        },
        {
          imageData: test_image,
          player: "frank",
          bodyPart: "head"
        },
        {
          imageData: test_image,
          player: "jim",
          bodyPart: "body"
        },
        {
          imageData: test_image,
          player: "john",
          bodyPart: "legs"
        },
        {
          imageData: test_image,
          player: "Jim",
          bodyPart: "feet"
        },
      ],
      combinations: []
    },
    gameKey: '',
    player: {
      name: ""
    }
  },
  mutations: {
    ADD_GAME(state, payload) {
      let newGame = payload;
      state.game = newGame;
    },
    ADD_GAMEKEY(state, payload) {
      let newGameKey = payload;
      state.gameKey = newGameKey;
    },
    ADD_PLAYERNAME(state, payload) {
      let newName = payload;
      state.player.name = newName;
    },
    ADD_DRAWING(state, payload) {
      let drawing = payload;
      state.game.drawings.push(drawing)
    }
  },
  actions: {

    /**
     * Send request to server to create a new game with the given player name.
     * @param {} context 
     * @param {*} payload 
     */
    createGame(context, payload) {
      let player = { name: payload }
      axios({
        method: 'post',
        url: 'https://us-central1-drawapart-84b66.cloudfunctions.net/createGame',
        data: player
      }).then(result => {
        //Store game key in firebase db
        let gameKey = result.data;
        //Add game object reference from firebase db to store
        context.commit('ADD_GAMEKEY', gameKey);
        //get gamedata from firebase
        firebase.database().ref('/games/' + gameKey).on('value', function (snapshot) {
          context.commit('ADD_GAME', snapshot.val());
        })
      });
    },

    /**
     * 
     * @param {*} context 
     * @param {*} payload 
     */
    joinGame(context, payload) {
      axios({
        method: 'post',
        url: 'https://us-central1-drawapart-84b66.cloudfunctions.net/joinGame',
        data: payload
      }).then(result => {
        console.log(result)
        let gameKey = result.data;
        //Add game object reference from firebase db to store
        context.commit('ADD_GAMEKEY', gameKey);
        //get gamedata from firebase
        firebase.database().ref('/games/' + gameKey).on('value', function (snapshot) {
          context.commit('ADD_GAME', snapshot.val());
        })
      })
    },
    addPlayerName(context, payload) {
      context.commit('ADD_PLAYERNAME', payload);
    },
    submitDrawing(context, payload) {
      // TODO: Send post request to firebase with drawing
      context.commit('ADD_DRAWING', payload);
    }
  },
  modules: {
  },
  getters: {
    getGame: state => state.game
  }
})
