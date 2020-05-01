<template>
  <div class="row mt-2">
    <label class="col-12" for="username">Choose your player name*:</label>
    <div class="input-group mb-1 col-12">
      <input
        type="text"
        class="form-control"
        id="username"
        aria-describedby="emailHelp"
        v-model="playername"
      />
      <div class="input-group-append" v-if="sharedGameCode">
        <button
          @click="joinGame()"
          :disabled="joinDisabled"
          class="input-group-text"
          id="joinGameWithSharedCode"
        >Join</button>
      </div>
    </div>
    <label class="col-12">{{ joinGameText }}</label>
    <div class="input-group col">
      <input
        v-show="!sharedGameCode"
        type="text"
        class="form-control"
        aria-describedby="joinGame"
        v-model="gamecode"
      />
      <div class="input-group-append" v-if="!sharedGameCode">
        <button
          @click="joinGame()"
          :disabled="joinDisabled"
          class="input-group-text"
          id="joinGame"
        >Join</button>
      </div>
    </div>
    <small class="form-text text-muted col-12 mb-3 error" v-if="error">{{errorMessage}}</small>
  </div>
</template>
<script>
export default {
  name: "JoinGame",
  props: {
    sharedGameCode: String
  },
  data: function() {
    return {
      gamecode: "",
      error: false,
      errorMessage: "",
      playername: "",
      joinDisabled: false
    };
  },
  methods: {
    joinGame() {
      this.joinDisabled = true;
      let gameCode = this.gamecode ? this.gamecode : this.sharedGameCode;
      if (gameCode && this.player.name) {
        this.$store.dispatch("toggleSpinner");
        this.error = false;
        let payload = {
          gamecode: gameCode.toLowerCase(),
          player: this.player.name
        };
        this.$store.dispatch("joinGame", payload);
      } else if (!this.player.name) {
        this.error = true;
        this.joinDisabled = false;
        this.errorMessage = "You need to choose a username first";
      } else if (!gameCode) {
        this.error = true;
        this.joinDisabled = false;
        this.errorMessage = "You need fill in the game code to join";
      }
    }
  },
  watch: {
    playername() {
      this.$store.dispatch("addPlayerName", this.playername);
    }
  },
  computed: {
    joinGameText() {
      if (this.sharedGameCode) return "";
      return "Enter a code to join a game:";
    },
    player() {
      return this.$store.getters.getPlayer;
    }
  }
};
</script>