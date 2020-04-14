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
async function codeExists(code) {
  let checkDB = await ref.child('games').orderByChild('code').equalTo(code).once('value').then(snapshot => {
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return false;
    }
  }).catch(error => {
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
      drawings: {
        head: [],
        body: [],
        legs: [],
        feet: [],
      },
      combinations: []
    }
    //Generate game code
    game.code = generateCode(4);
    //add provided playername to game object
    game.players[request.body.name] = true;
    //push game object to games in db
    let createGameInDB = admin.database().ref('/games/').push(game)
    //return game object
    response.send(createGameInDB.key);

  });
})

exports.joinGame = functions.https.onRequest((request, response) => {
  /**
   * Wrap response in cors header
   */
  cors(request, response, () => {
    let gameCode = request.body.gamecode
    let player = request.body.player

    codeExists(gameCode).then(res => {
      let gameKey = Object.keys(res)[0]
      ref.child('games/' + gameKey + '/players').child(player).set(true);
      response.send(gameKey)
      return true
    }).catch(error => {
      response.send(error)
      return error
    })
  })
})


exports.setState = functions.database.ref('/games/{gameKey}')
    .onUpdate((snapshot, context) => {
      // Grab the current value of what was written to the Realtime Database.
      let game = snapshot.after.val()
      const playersFinishedDrawing = Object.keys(game.drawings).length
      const players = Object.keys(game.players).length
      if (players === playersFinishedDrawing) {
        ref.child('games/' + gameKey).child("state").set("combination");
      }
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
      // return snapshot.ref.parent.child('uppercase').set(uppercase);
      return true
    });