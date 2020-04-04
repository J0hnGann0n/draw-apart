<template>
  <!-- drawing combination -->
  <div class="row">
    <div class="col-12">
      <Slider :images="headDrawings" />
      <Slider :images="bodyDrawings" />
      <Slider :images="legsDrawings" />
      <Slider :images="feetDrawings" />
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
    },
    bodyDrawings() {
      return this.game.drawings.filter(drawing => drawing.bodyPart == "body");
    },
    legsDrawings() {
      return this.game.drawings.filter(drawing => drawing.bodyPart == "legs");
    },
    feetDrawings() {
      return this.game.drawings.filter(drawing => drawing.bodyPart == "feet");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>