<template>
  <!-- start game -->
  <div class="row">
    <div class="col">
      <button
        @click="startGame()"
        type="button"
        class="btn btn-primary"
        :disabled="!this.player.host"
      >{{ startGameText }}</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "StartGame",
  methods: {
    startGame() {
      this.$store.dispatch("updatePlayerState", "drawing");
      this.$store.dispatch("startGame");
    }
  },
  computed: {
    startGameText() {
      return this.player.host ? "Start Game" : "Waiting for host";
    },
    player() {
      return this.$store.getters.getPlayer;
    }
  }
};
</script>