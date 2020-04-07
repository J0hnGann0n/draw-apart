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
      drawings: {
        head: [
          {
            imageData: test_image,
            player: "john",
            bodyPart: "head"
          },
          {
            imageData: test_image,
            player: "phillip",
            bodyPart: "head"
          },
        ],
        body: [
          {
            imageData: test_image,
            player: "mary",
            bodyPart: "body"
          },
          {
            imageData: test_image,
            player: "bill",
            bodyPart: "body"
          },
        ],
        legs: [
          {
            imageData: test_image,
            player: "mark",
            bodyPart: "legs"
          },
          {
            imageData: test_image,
            player: "bob",
            bodyPart: "legs"
          },
        ],
        feet: [
          {
            imageData: test_image,
            player: "paul",
            bodyPart: "feet"
          },
          {
            imageData: test_image,
            player: "tim",
            bodyPart: "feet"
          },
        ]
      }
    },
    gameKey: '',
    player: {
      name: "",
      state: "drawing"
    },
    combination: {
      player: '',
      image: ''
    },
    drawings: []
  },
  mutations: {
    ADD_GAME(state, payload) {
      let newGame = payload;
      newGame.state = "play"
      state.game = newGame;
    },
    ADD_GAMEKEY(state, payload) {
      let newGameKey = payload;
      state.gameKey = newGameKey;
    },
    ADD_COMBINATION(state, payload) {
      let newCombination = payload;
      state.combination = newCombination;
    },
    ADD_PLAYERNAME(state, payload) {
      let newName = payload;
      state.player.name = newName;
    },
    ADD_DRAWING(state, payload) {
      let drawing = payload;
      state.drawings.push(drawing)
    },
    START_GAME(state) {
      state.game.state = "play"
    },
    UPDATE_PLAYER_STATE(state, payload) {
      state.player.state = payload
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
    startGame(context) {
      context.commit('START_GAME');
    },
    /**
     * 
     * @param {*} context snapshot.val()
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
      let bodyPart = payload.bodyPart
      let drawing = {
        imageData: payload.imageData,
        player: payload.player
      }
      firebase.database().ref('/games/' + this.state.gameKey + "/drawings/" + bodyPart).push(drawing)
      context.commit('ADD_DRAWING', payload);
    },
    addCombination(context, payload) {
      let combinationObject = {
        player: this.state.player,
        image: payload
      }
      context.commit('ADD_COMBINATION', combinationObject)
    },
    updatePlayerState(context, payload) {
      context.commit("UPDATE_PLAYER_STATE", payload)
    },
    submitCombination(context, payload) {
      let combinationObject = this.state.combination;
      combinationObject.name = payload;
      context.commit('ADD_COMBINATION', combinationObject);

      // TODO: Write combination into combinations in firebase
    }
  },
  modules: {
  },
  getters: {
    getGame: state => state.game,
    getPlayer: state => state.player
  }
})
