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
    createGame() {
      this.$store.dispatch('createGame', "Username")
    }
  }
};
</script>