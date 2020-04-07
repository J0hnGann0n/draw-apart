<template>
  <!-- start game -->
  <div class="row">
    <div class="col">
      <a @click="startGame()" type="button" class="btn btn-primary">Start the game</a>
    </div>
  </div>
</template>
<script>
export default {
  name: "StartGame",
  methods: {
    startGame() {
      this.$store.dispatch("startGame");
    }
  }
};
</script>