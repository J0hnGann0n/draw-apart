<template>
  <div class="row mt-2">
    <label class="col-12">Enter a code to join a game:</label>
    <div class="input-group col">
      <input type="text" class="form-control" aria-describedby="basic-addon2" v-model="gamecode" />
      <div class="input-group-append">
        <button @click="joinGame()" class="input-group-text" id="basic-addon2">Join</button>
      </div>
    </div>
    <small class="form-text text-muted col-12 mb-3" v-if="error">{{errorMessage}}</small>
  </div>
</template>
<script>
export default {
  name: "JoinGame",
  data: function() {
    return {
      gamecode: "",
      error: false,
      errorMessage: ""
    };
  },
  methods: {
    joinGame() {
      if (this.gamecode && this.$store.state.player.name) {
        this.error = false;
        let payload = {
          gamecode: this.gamecode,
          player: this.$store.state.player.name
        };
        this.$store.dispatch("joinGame", payload);
      } else if (!this.$store.state.player.name) {
        this.error = true;
        this.errorMessage = "You need to choose a username first";
      } else if (!this.gamecode) {
        this.error = true;
        this.errorMessage = "You need fill in the game code to join";
      }
    }
  }
};
</script>