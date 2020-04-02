<template>
  <div>
    <div class="row">
      <div class="col">
        <h1>Draw the {{ bodyPart[drawingCount] }}</h1>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <canvas
          id="canvas"
          v-on:mousedown="handleMouseDown"
          v-on:mouseup="handleMouseUp"
          v-on:mousemove="handleMouseMove"
          width="800px"
          height="800px"
        ></canvas>
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
      bodyPart: ["head", "body", "legs", "feet"],
      mouse: {
        current: {
          x: 0,
          y: 0
        },
        previous: {
          x: 0,
          y: 0
        },
        down: false
      }
    };
  },
  computed: {
    currentMouse: function() {
      var c = document.getElementById("canvas");
      var rect = c.getBoundingClientRect();

      return {
        x: this.mouse.current.x - rect.left,
        y: this.mouse.current.y - rect.top
      };
    }
  },
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
    },
    draw: function() {
      // requestAnimationFrame(this.draw);
      if (this.mouse.down) {
        var c = document.getElementById("canvas");

        var ctx = c.getContext("2d");

        ctx.clearRect(0, 0, 800, 800);

        ctx.lineTo(this.currentMouse.x, this.currentMouse.y);
        ctx.strokeStyle = "#F63E02";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    },
    handleMouseDown: function(event) {
      this.mouse.down = true;
      this.mouse.current = {
        x: event.pageX,
        y: event.pageY
      };

      var c = document.getElementById("canvas");
      var ctx = c.getContext("2d");

      ctx.moveTo(this.currentMouse.x, this.currentMouse.y);
    },
    handleMouseUp: function() {
      this.mouse.down = false;
    },
    handleMouseMove: function(event) {
      this.mouse.current = {
        x: event.pageX,
        y: event.pageY
      };

      this.draw(event);
    }
  },
  ready: function() {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.translate(0.5, 0.5);
    ctx.imageSmoothingEnabled = false;
    // this.draw();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
