<template>
  <!-- start game -->
  <div class="row">
    <div class="col">
      <p v-if="error">{{errorMessage}}</p>
      <button @click="startGame()" type="button" class="btn btn-primary" v-if="isHost">Start Game</button>
      <h5 v-if="!isHost">waiting for host...</h5>
    </div>
  </div>
</template>
<script>
export default {
  name: "StartGame",
  data() {
    return {
      error: false,
      errorMessage: ""
    };
  },
  methods: {
    startGame() {
      if (
        Object.keys(this.game.players).length < 2 &&
        !process.env.VUE_APP_DEBUG
      ) {
        this.error = true;
        this.errorMessage = "You need at least another player";
      } else {
        this.error = false;
        this.$store.dispatch("updatePlayerState", "drawing");
        this.$store.dispatch("startGame");
      }
    }
  },
  computed: {
    player() {
      return this.$store.getters.getPlayer;
    },
    game() {
      return this.$store.getters.getGame;
    },
    isHost() {
      if (
        this.game &&
        this.game.players &&
        this.game.players[this.player.name]
      ) {
        return this.game.players[this.player.name].host;
      } else {
        return false;
      }
    }
  }
};
</script>