var async = require('async');

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

exports.createGame = functions.https.onRequest((request, response) => {
  console.log("Test Request");
  response.set('Access-Control-Allow-Origin', '*');
  response.send("figg di hert")
})
