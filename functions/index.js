var async = require('async');

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

exports.createGame = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  let game = {
    players: []
  }
  console.log(request)
  game.players.push(request.body.name)
  admin.database().ref('/games/').push(game)
  response.send(`Hello from Firebase! ${JSON.stringify(request.body)}`);
})
