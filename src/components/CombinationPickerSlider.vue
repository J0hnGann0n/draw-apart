<template>
  <!-- drawing combination -->
  <div class="row">
    <div class="col-12">
      <Slider />
      <Slider />
      <Slider />
      <Slider />
    </div>
  </div>
</template>

<script>
import Slider from "@/components/Slider.vue";

export default {
  name: "CombinationPickerSlider",
  props: {
    msg: String
  },
  data: function() {
    return {};
  },
  components: {
    Slider
  },
  computed: {
    game() {
      return this.$store.getters.getGame;
    },
    headDrawings() {
      return this.game.drawings.filter(drawing => drawing.bodyPart == "head");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>