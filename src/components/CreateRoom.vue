<template>
  <div class="row mt-2">
    <p class="form-text text-muted col-12 mb-3 error" v-if="error">{{errorMessage}}</p>
    <div class="col">
      <button type="button" class="btn btn-primary" @click="createGame()">Create a game</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "CreateRoom",
  data() {
    return {
      error: false,
      errorMessage: ""
    };
  },
  computed: {
    player() {
      return this.$store.getters.getPlayer;
    }
  },
  methods: {
    /**
     * Dispatch action to store to create a new game.
     */
    createGame() {
      if (this.player.name) {
        this.error = false;
        this.$store.dispatch("toggleSpinner");
        this.$store.dispatch("createGame", this.player.name);
      } else {
        this.error = true;
        this.errorMessage = "Choose a name first";
      }
    }
  }
};
</script>