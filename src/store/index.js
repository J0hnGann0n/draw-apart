import Vue from 'vue'
import Vuex from 'vuex'
import axios from "../services/axios"
import firebase from "../services/firebase";
import { removeEmptyLists } from '../helpers'
import { firebaseFunctionsUrl } from '../constants'
//import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  //plugins: [createPersistedState({
  //  storage: window.sessionStorage,
  //})],
  state: {
    game: {
      code: "abcd",
      state: "home",
      players: ["john"],
      drawings: {},
      countDown: {}
    },
    winner: {
      image: '',
      name: '',
      player: ''
    },
    countDownFinished: false,
    gameKey: '',
    player: {
      name: "",
      state: "drawing",
      host: false
    },
    combination: {
      player: '',
      image: ''
    },
    drawings: [],
    vote: ''
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
    ADD_COMBINATION(state, payload) {
      let newCombination = payload;
      state.combination = newCombination;
    },
    ADD_PLAYERNAME(state, payload) {
      let newName = payload;
      state.player.name = newName;
    },
    ADD_DRAWINGS(state, payload) {
      let drawing = payload;
      state.drawings.push(drawing)
    },
    UPDATE_PLAYER_STATE(state, payload) {
      state.player.state = payload
    },
    STOP_COUNTDOWN(state) {
      state.countDownFinished = true;
    },
    START_COUNTDOWN(state) {
      state.countDownFinished = false;
    },
    SET_PLAYER_HOST(state) {
      state.player.host = true
    },
    ADD_VOTE(state, payload) {
      state.vote = payload;
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
        url: firebaseFunctionsUrl + 'createGame',
        data: player
      }).then(result => {
        //Store game key in firebase db
        let gameKey = result.data;
        //Add game object reference from firebase db to store
        context.commit('ADD_GAMEKEY', gameKey);
        //get gamedata from firebase
        firebase.database().ref('/games/' + gameKey).on('value', function (snapshot) {
          context.commit('ADD_GAME', snapshot.val());
          context.commit('SET_PLAYER_HOST');
        })
      });
    },
    /**
     * 
     * @param {*} context snapshot.val()
     * @param {*} payload 
     */
    joinGame(context, payload) {
      axios.post(firebaseFunctionsUrl + 'joinGame', payload)
        .then(result => {
          let gameKey = result.data;

          //Add game object reference from firebase db to store
          context.commit('ADD_GAMEKEY', gameKey);
          //get gamedata from firebase
          firebase.database().ref('/games/' + gameKey).on('value', function (snapshot) {
            context.commit('ADD_GAME', snapshot.val());
          })
        }).catch(function () {
          return false
        })
    },
    startGame() {
      axios.post(firebaseFunctionsUrl + 'startGame', { gameKey: this.state.gameKey })
        .then(result => {
          console.log(result)
          return true
        }).catch(function () {
          return false
        })
    },
    updateCountdownState(context) {
      context.commit('UPDATE_COUNTDOWN_STATE');
    },
    startCountdown(context) {
      context.commit('START_COUNTDOWN');
    },
    stopCountdown(context) {
      context.commit('STOP_COUNTDOWN');
    },
    addPlayerName(context, payload) {
      context.commit('ADD_PLAYERNAME', payload);
    },
    submitDrawings(context, payload) {
      firebase.database().ref('/games/' + this.state.gameKey + "/drawings/").child(this.state.player.name).set(payload, function (error) {
        if (error) {
          // The write failed...
        } else {
          context.commit('ADD_DRAWINGS', payload);
        }
      })
    },
    /**
     * action adds combination to store
     * @param {} context 
     * @param {*} payload 
     */
    addCombination(context, payload) {
      let combinationObject = {
        player: this.state.player.name,
        image: payload
      }
      context.commit('ADD_COMBINATION', combinationObject)
    },
    updatePlayerState(context, payload) {
      context.commit("UPDATE_PLAYER_STATE", payload)
    },
    /**
     * submits combination to firebase
     * @param {} context 
     * @param {*} payload 
     */
    submitCombination(context, payload) {
      let combinationObject = this.state.combination;
      combinationObject.name = payload;
      context.commit('ADD_COMBINATION', combinationObject);

      // writes combination into firebase
      firebase.database().ref('/games/' + this.state.gameKey + "/combinations/").push(combinationObject)

      // JUST FOR DEV
      this.state.game.state = 'vote'
    },
    submitVote(context, payload) {
      context.commit('ADD_VOTE', payload);

      //write vote into firebase
      firebase.database().ref('/games/' + this.state.gameKey + "/combinations/" + payload.id + "/votes/").push(payload.player)
    }
  },
  modules: {
  },
  getters: {
    getGame: state => state.game,
    getPlayer: state => state.player,
    getCountDownFinished: state => state.countDownFinished,
    getDrawingsByBodyPart: state => {
      let drawings = {
        head: [],
        body: [],
        legs: [],
        feet: [],
      }
      for (let playerDrawings of Object.values(state.game.drawings)) {
        for (let drawing of Object.values(playerDrawings)) {
          if (drawing.imageData) drawings[drawing.bodyPart].push(drawing)
        }
      }
      let cleanedrawings = removeEmptyLists(drawings)
      return cleanedrawings
    }
  }
})
