<template>
  <div class="container content">
    <!-- titel -->
    <div class="row">
      <div class="col-12">
        <h1>Lets Draw</h1>
      </div>
    </div>

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
      </div>
    </div>
    <JoinGame />
    <CreateRoom />
  </div>
</template>

<script>
import JoinGame from "@/components/JoinGame.vue";
import CreateRoom from "@/components/CreateRoom.vue";

export default {
  name: "Home",
  data() {
    return {
      game: {},
      playername: ""
    };
  },
  components: {
    JoinGame,
    CreateRoom
  },
  watch: {
    playername() {
      this.$store.dispatch("addPlayerName", this.playername);
    }
  }
};
</script>

<style lang="scss">
</style>
