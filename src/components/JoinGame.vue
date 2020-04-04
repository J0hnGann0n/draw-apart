<template>
  <div class="row">
    <div class="input-group mb-3 col">
      <input
        type="text"
        class="form-control"
        placeholder="Enter room code"
        aria-label="Enter room code"
        aria-describedby="basic-addon2"
        v-model="gamecode"
      />
      <div class="input-group-append">
        <button @click="joinGame()" class="input-group-text" id="basic-addon2">Join</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "JoinGame",
  data: function() {
    return {
      gamecode: ""
    };
  },
  methods: {
    joinGame() {
      if (this.gamecode && this.$store.state.player.name) {
        let payload = {
          gamecode: this.gamecode,
          player: this.$store.state.player.name
        };
        this.$store.dispatch("joinGame", payload);
        this.$router.push("/game");
      }
    }
  }
};
</script>