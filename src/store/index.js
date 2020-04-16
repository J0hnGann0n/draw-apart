import Vue from 'vue'
import Vuex from 'vuex'
import axios from "../services/axios"
import firebase from "../services/firebase";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    game: {
      code: "abcd",
      state: "lobby",
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
      state: "combination"
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
    START_GAME(state) {
      state.game.state = "drawing"
    },
    UPDATE_PLAYER_STATE(state, payload) {
      state.player.state = payload
    },
    UPDATE_TIME_COUNTDOWN(state) {
      state.countdown.timeleft -= 1;
    },
    STOP_COUNTDOWN(state) {
      state.countDownFinished = true;
    },
    START_COUNTDOWN(state) {
      state.countDownFinished = false;
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
    updateCountdownState(context) {
      context.commit('UPDATE_COUNTDOWN_STATE');
    },
    startCountdown(context) {
      context.commit('START_COUNTDOWN');
    },
    stopCountdown(context) {
      context.commit('STOP_COUNTDOWN');
    },
    updateTimeCountdown(context) {
      context.commit('UPDATE_TIME_COUNTDOWN')
    },
    startGame(context) {
      firebase.database().ref('/games/' + this.state.gameKey + "/state/").set("drawing", function (error) {
        if (error) {
          // The write failed...
        } else {
          context.commit('START_GAME');
        }
      })
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
      firebase.database().ref('/games/' + this.state.gameKey + "/votes/").push(payload)
    }
  },
  modules: {
  },
  getters: {
    getGame: state => state.game,
    getPlayer: state => state.player,
    getDrawingsByBodyPart: state => {
      let drawings = {
        head: [],
        body: [],
        legs: [],
        feet: [],
      }
      for (let playerDrawings of Object.values(state.game.drawings)) {
        for (let drawing of Object.values(playerDrawings)) {
          drawings[drawing.bodyPart].push(drawing)
        }
      }
      return drawings
    }
  }
})
