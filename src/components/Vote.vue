<template>
  <div class="container mt-3">
    <!-- Countdown -->
    <Countdown />

    <!-- titel -->
    <div class="row">
      <div class="col">
        <h1>Choose your favorite</h1>
      </div>
    </div>

    <DrawingPicker />
  </div>
</template>

<script>
import DrawingPicker from "@/components/DrawingPicker.vue";
import Countdown from "@/components/Countdown.vue";

export default {
  name: "Vote",
  data: function() {
    return {
      voting: false
    };
  },
  components: {
    DrawingPicker,
    Countdown
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
