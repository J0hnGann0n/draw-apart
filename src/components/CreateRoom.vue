<template>
  <div class="row">
    <div class="col">
      <button type="button" class="btn btn-primary" @click="createGame()">Create a game</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "CreateRoom",
  methods: {
    /**
     * Dispatch action to store to create a new game.
     */
    createGame() {
      if (this.$store.state.player.name) {
        this.$store.dispatch("createGame", this.$store.state.player.name);
      } else {
        //TODO:
      }
    }
  }
};
</script>