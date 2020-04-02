<template>
  <div>
    <div class="row">
      <div class="col">
        <h1>Draw the {{ bodyPart[drawingCount] }}</h1>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p>Here comes the drawing panels</p>
      </div>
    </div>
    <div class="col-10">
      <p>{{ drawingCount }}</p>
    </div>
    <div class="col-2">
      <button type="button" class="btn btn-primary" @click="submitDrawing()">
        <i class="fas fa-check"></i>
      </button>
    </div>
  </div>
</template>

<script>
import testImage from "../../test_image";

export default {
  name: "DrawingPanel",
  props: {
    msg: String
  },
  data: function() {
    return {
      drawingCount: 0,
      bodyPart: ["head", "body", "legs", "feet"]
    };
  },
  components: {},
  methods: {
    /**
     * Get canvas image as base64 and send drawing object to store to be submitted.
     */
    submitDrawing(bodyPart) {
      let drawing = {
        imageData: testImage,
        player: "john",
        bodyPart: bodyPart
      };
      this.$store.dispatch("submitDrawing", drawing);
      this.drawingCount++;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
