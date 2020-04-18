<template>
  <div class="container">
    <div class="header row pt-4 pb-4 pl-2 pr-2">
      <div class="col-9">
        <h4 class="mb-0">Draw Apart</h4>
      </div>
      <div class="col-3">
        <Countdown v-if="showCountdown" />
      </div>
    </div>
  </div>
</template>

<script>
import Countdown from "@/components/Countdown.vue";

export default {
  name: "Header",
  components: {
    Countdown
  },
  computed: {
    game() {
      return this.$store.getters.getGame;
    },
    showCountdown() {
      if (!this.game) return false
      if (this.game.state == "lobby" || this.game.state == "winner") {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style lang="scss">
.header {
  background-color: #136f63;
  color: #e0ca3c;
}
</style>