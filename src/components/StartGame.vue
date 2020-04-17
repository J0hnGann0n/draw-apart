<template>
  <!-- start game -->
  <div class="row">
    <div class="col">
      <p v-if="error">{{errorMessage}}</p>
      <button
        @click="startGame()"
        type="button"
        class="btn btn-primary"
        v-if="this.player.host"
      >Start Game</button>
      <h5 v-if="!this.player.host">waiting for host...</h5>
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
      console.log(Object.keys(this.game.players).length);
      if (Object.keys(this.game.players).length < 2) {
        this.error = true;
        this.errorMessage = "You need at least another player";
      } else {
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
    }
  }
};
</script>