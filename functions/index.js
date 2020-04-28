var async = require('async');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
let serviceAccountFile = require("../drawapart-84b66-firebase-adminsdk-wq5pu-518e4e491f.json")

if (functions.config().vue.vue_app_debug) {
  // Initialize Firebase Admin SDK for connection to local realtime database emulator
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountFile),
    databaseUrl: functions.config().vue.vue_app_firebase_database_url
  });
} else {
  admin.initializeApp();
}

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
    return false
  })
  return checkDB;
}

/**
 * Compares two values
 * @param {*} a 
 * @param {*} b 
 */
function compare(a, b) {
  let votesA = 0;
  let votesB = 0;
  if (a.votes) {
    votesA = Object.keys(a.votes).length;
  } else if (b.votes) {
    votesB = Object.keys(b.votes).length;
  }
  let comparison = 0;
  if (votesA > votesB) {
    comparison = -1;
  } else if (votesA < votesB) {
    comparison = 1;
  }
  return comparison;
}

/**
 * Deletes the main game object to allow a new game to be played with the same code
 * @param {The unique key for the game to be reset} gameKey 
 */
function resetGame(gameKey) {
  ref.child('games/' + gameKey).child("combinations").remove();
  ref.child('games/' + gameKey).child("drawings").remove();
  ref.child('games/' + gameKey).child("winner").remove();
}

/**
 * Checks if given name is in given player list and generates a unique name if it is.
 * @param {*} playerName 
 */
function getUniqueName(playerName, players) {
  let potentialName = playerName
  nameModifier = 2
  while (players.includes(potentialName)) {
    matchedName = players.find(name => name === potentialName)
    if (matchedName.split('(')[1]) nameModifier = parseInt(matchedName.split('(')[1][0]) + 1
    potentialName = `${potentialName.split('(')[0]} (${nameModifier})`
    nameModifier++
  }

  return potentialName
}

exports.startGame = functions.https.onRequest((request, response) => {
  /**
   * Wrap response in cors header
   */
  cors(request, response, () => {
    let gameKey = request.body.gameKey
    resetGame(gameKey)
    let date = new Date();
    let startTime = date.getTime();
    ref.child('games/' + gameKey).child('state').set('drawing')
    ref.child('games/' + gameKey + '/countDown/startTime').set(startTime);
    response.status(200).send()
  });
})

exports.createGame = functions.https.onRequest((request, response) => {
  /**
   * Wrap response in cors header
   */
  cors(request, response, () => {
    let game = {
      code: "",
      state: "lobby",
      countDown: {
        drawing: 5,
        combination: 5,
        voting: 5,
        startTime: ""
      },
      players: {},
      drawings: {
        head: [],
        body: [],
        legs: [],
        feet: [],
      },
      combinations: {}
    }
    //Generate game code
    game.code = generateCode(4);
    //add provided playername to game object
    game.players[request.body.name] = { host: true };
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
    let playerName = request.body.player

    ref.child('games').orderByChild('code').equalTo(gameCode).once('value').then(res => {
      let gameKey = Object.keys(res.val())[0]
      let game = res.val()[gameKey]
      let players = Object.keys(game.players)
      playerName = getUniqueName(playerName, players)
      if (game.state !== "lobby") {
        response.status(400).send({ errorCode: 4002 })
      }
      if (gameKey) {
        ref.child('games/' + gameKey + '/players').child(playerName).set({ host: false });
        response.send(gameKey)
        return true
      } else {
        response.status(400).send({ errorCode: 4001 })
        return false
      }
    }).catch(error => {
      response.status(400).send({ errorCode: 4001 })
      return false
    })
  })
})

exports.playAgain = functions.https.onRequest((request, response) => {
  /**
   * Wrap response in cors header
   */
  cors(request, response, () => {
    let gameCode = request.body.gamecode
    let player = request.body.player

    ref.child('games').orderByChild('code').equalTo(gameCode).once('value').then(res => {
      let gameKey = Object.keys(res.val())[0]
      let game = res.val()[gameKey];
      let players = {}

      if (gameKey) {
        if (!game.players) {
          players[player] = { host: true };
          ref.child('games/' + gameKey + '/players').child(player).set({ host: true });
        } else {
          ref.child('games/' + gameKey + '/players').child(player).set({ host: false });
        }
        //Set State to lobby
        ref.child('games/' + gameKey).child("state").set("lobby");
        response.send(gameKey)
        return true
      } else {
        response.status(400).send({ errorCode: 4001, errorText: "No game exists with this code" })
        return false
      }
    }).catch(error => {
      response.status(400).send({ errorCode: 4001, errorText: "No game exists with this code" })
      return false
    })
  })
})


exports.setState = functions.database.ref('/games/{gameKey}')
  .onUpdate((snapshot, context) => {
    // Grab the current value of what was written to the Realtime Database.
    let game = snapshot.after.val()
    let previousGameState = snapshot.before.val().state
    let gameKey = context.params.gameKey
    const playersFinishedDrawing = game.drawings ? Object.keys(game.drawings).length : 0
    const playersFinishedCombination = game.combinations ? Object.keys(game.combinations).length : 0
    const playersFinishedVoting = game.votes ? Object.keys(game.votes).length : 0
    const players = game.players ? Object.keys(game.players).length : 0
    let date = new Date();
    let startTime = date.getTime();

    if (game.state === "drawing" && players === playersFinishedDrawing) {
      ref.child('games/' + gameKey).child("state").set("combination");
      ref.child('games/' + gameKey + '/countDown/startTime').set(startTime);
    } else if (game.state === "combination" && players === playersFinishedCombination) {
      ref.child('games/' + gameKey).child("state").set("voting");
      ref.child('games/' + gameKey + '/countDown/startTime').set(startTime);
    } else if (game.state === "voting" && players === playersFinishedVoting) {
      ref.child('games/' + gameKey).child("state").set("winner");
      ref.child('games/' + gameKey + '/countDown/startTime').set(startTime);
    }
    return true
  });


/**
 * Find the most voted combination and save it into winner object
 */
exports.findWinner = functions.database.ref('/games/{gameKey}')
  .onUpdate((snapshot, context) => {
    let game = snapshot.after.val();
    if (game.state ===
      'voting') {
      // Grab the current value of what was written to the Realtime Database.
      let combinations = game.combinations
      let gameKey = context.params.gameKey

      //converte object to array for sorting
      let combinationArray = Object.values(combinations);
      let votesTotal = 0;
      let players = Object.keys(game.players).length

      combinationArray.forEach(combination => {
        if (combination.votes) {
          votesTotal += Object.keys(combination.votes).length;
        }
      })

      if (votesTotal === players) {

        //find the combination with the most votes
        combinationArray.sort(compare);

        let winner = {
          player: combinationArray[0].player,
          votes: combinationArray[0].votes,
          imageData: combinationArray[0].image,
          name: combinationArray[0].name
        };
        //Save winner object into game
        ref.child('games/' + gameKey + '/winner').set(winner);


        ref.child('games/' + gameKey).child("state").set("winner");
        ref.child('games/' + gameKey + '/players').remove();
      }
    }
    return true
  });