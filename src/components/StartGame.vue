<template>
  <!-- start game -->
  <div class="row">
    <div class="col">
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
  methods: {
    startGame() {
      this.$store.dispatch("updatePlayerState", "drawing");
      this.$store.dispatch("startGame");
    }
  },
  computed: {
    player() {
      return this.$store.getters.getPlayer;
    }
  }
};
</script>