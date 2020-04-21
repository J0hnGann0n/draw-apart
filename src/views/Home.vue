<template>
  <div class="container content">
    <!-- titel -->
    <div class="row">
      <div class="col-12">
        <h1>{{ titleText }}</h1>
      </div>
    </div>
    <JoinGame :sharedGameCode="sharedGameCode" />
    <CreateRoom v-show="!sharedGameCode" />
  </div>
</template>

<script>
import JoinGame from "@/components/JoinGame.vue";
import CreateRoom from "@/components/CreateRoom.vue";

export default {
  name: "Home",
  data() {
    return {
      game: {}
    };
  },
  components: {
    JoinGame,
    CreateRoom
  },
  computed: {
    sharedGameCode() {
      return this.$route.params["sharedGameCode"];
    },
    titleText() {
      if (this.sharedGameCode) return "Joining '" + this.sharedGameCode + "'";
      return "Lets Draw";
    }
  }
};
</script>

<style lang="scss">
</style>
