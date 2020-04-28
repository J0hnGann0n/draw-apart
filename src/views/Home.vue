<template>
  <div class="container content">
    <!-- titel -->
    <div class="row" v-if="!spinner">
      <div class="col-12">
        <h1>{{ titleText }}</h1>
      </div>
    </div>
    <JoinGame :sharedGameCode="sharedGameCode" v-if="!spinner" />
    <CreateRoom v-show="!sharedGameCode && !spinner" />
    <Spinner v-if="spinner" />
  </div>
</template>

<script>
import JoinGame from "@/components/JoinGame.vue";
import CreateRoom from "@/components/CreateRoom.vue";
import Spinner from "@/components/Spinner.vue";

export default {
  name: "Home",
  data() {
    return {
      game: {}
    };
  },
  components: {
    JoinGame,
    CreateRoom,
    Spinner
  },
  computed: {
    sharedGameCode() {
      return this.$route.params["sharedGameCode"];
    },
    titleText() {
      if (this.sharedGameCode) return "Joining '" + this.sharedGameCode + "'";
      return "Lets Draw";
    },
    spinner() {
      return this.$store.getters.getSpinner;
    }
  }
};
</script>

<style lang="scss">
</style>
