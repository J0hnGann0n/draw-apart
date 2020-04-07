<template>
  <div class="container mt-3">
    <!-- Countdown -->
    <div class="row justify-content-end">
      <div class="col-2 text-left align-content-end">
        <p>40</p>
      </div>
    </div>

    <!-- titel -->
    <div class="row">
      <div class="col">
        <h1>Choose your favorite</h1>
      </div>
    </div>

    <Waiting v-if="voteSubmitted && voting" />
    <DrawingPicker v-if="!voteSubmitted" />
    <ShowWinner v-if="!voting" />
  </div>
</template>

<script>
import DrawingPicker from "@/components/DrawingPicker.vue";
import ShowWinner from "@/components/ShowWinner.vue";
import Waiting from "@/components/Waiting.vue";

export default {
  name: "Vote",
  props: {
    msg: String
  },
  data: function() {
    return {
      voting: false
    };
  },
  components: {
    DrawingPicker,
    ShowWinner,
    Waiting
  },
  computed: {
    voteSubmitted() {
      if (this.$store.vote) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
