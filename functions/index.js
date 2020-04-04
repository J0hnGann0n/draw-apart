var async = require('async');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
admin.initializeApp();

let ref = admin.database().ref('/');

/**
   * Generates the game code with the definied characters
   * @param {*} length 
   */
function generateCode(length) {
  let result = '';
  let characters = 'abcdefghijklmnopqrstuvwxyz';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
/**
 * Checks if Code is unique
 * @param {*} code 
 */
async function isCodeUniqe(code) {
  let checkDB = await ref.child('games').orderByChild('code').equalTo(code).once('value').then(snapshot => {
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return false;
    }
  }).catch(error => {
    response.send("Etwas ist schief gelaufen")
    return error
  })
  return checkDB;
}

exports.createGame = functions.https.onRequest((request, response) => {
  /**
   * Wrap response in cors header
   */
  cors(request, response, () => {
    let game = {
      code: "",
      state: "lobby",
      players: {},
      drawings: [],
      combinations: []
    }
    let uniqeGameCode = false;
    let gameCode = "";

    //Generate game code

    gameCode = generateCode(4);
    while (uniqeGameCode === false) {
      if (isCodeUniqe(gameCode)) {
        gameCode = generateCode(4)
      } else {
        uniqeGameCode = true;
      }
    }

    if (uniqeGameCode) {
      //add game code
      game.code = gameCode
      //add provided playername to game object
      game.players[request.body.name] = true;
      //push game object to games in db
      let createGameInDB = admin.database().ref('/games/').push(game)
      //return game object
      response.send(createGameInDB.key);
    }

  });
})

exports.joinGame = functions.https.onRequest((request, response) => {
  /**
   * Wrap response in cors header
   */
  cors(request, response, () => {
    let gameCode = request.body.gamecode
    let player = request.body.player

    isCodeUniqe(gameCode).then(res => {
      let gameKey = Object.keys(res)[0]
      //ref.child('games/' + gameKey + '/players').child(player).setValue(true);
      response.send(gameKey)
      return true
    }).catch(error => {
      response.send(error)
      return error
    })
  })
})
