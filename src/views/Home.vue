<template>
  <div class="container mt-3">
    <!-- Instructions -->
    <div class="row justify-content-end">
      <div class="col-2 text-left align-content-end">
        <font-awesome-icon icon="question-circle" />
      </div>
    </div>
    <!-- titel -->
    <div class="row">
      <div class="col">
        <h1>Welcome</h1>
      </div>
    </div>
    <div class="row">
      <div class="input-group mb-3 col">
        <input
          type="text"
          class="form-control"
          id="username"
          placeholder="Choose your username"
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
