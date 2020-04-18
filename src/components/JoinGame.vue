<template>
  <div class="row mt-2">
    <label class="col-12">Enter a code to join a game:</label>
    <div class="input-group mb-3 col">
      <input type="text" class="form-control" aria-describedby="basic-addon2" v-model="gamecode" />
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
      }
    }
  }
};
</script>