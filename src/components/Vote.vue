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

    <DrawingPicker />
  </div>
</template>

<script>
import DrawingPicker from "@/components/DrawingPicker.vue";

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
    DrawingPicker
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
