var async = require('async');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
admin.initializeApp();

exports.createGame = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    let game = {
      code: "abcd",
      state: "lobby",
      players: [],
      drawings: [],
      combinations: []
    }
    game.players.push(request.body.name)
    admin.database().ref('/games/').push(game)
    response.send(game);
  });
})
