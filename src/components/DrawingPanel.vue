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
          v-touch:start="handleMouseDown"
          v-touch:end="handleMouseUp"
          v-touch:moving="handleMouseMove"
          width="300px"
          height="400px"
          style="border-color: black;"
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
      var c = document.getElementById("canvas");
      let image = c.toDataURL();
      let drawing = {
        imageData: image,
        player: "john",
        bodyPart: bodyPart
      };
      this.$store.dispatch("submitDrawing", drawing);
      this.drawingCount++;
    },
    draw: function() {
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
      let pageX = event.touches ? event.touches[0].pageX : event.pageX;
      let pageY = event.touches ? event.touches[0].pageY : event.pageY;
      this.mouse.current = {
        x: pageX,
        y: pageY
      };
      var c = document.getElementById("canvas");
      var ctx = c.getContext("2d");

      ctx.moveTo(this.currentMouse.x, this.currentMouse.y);
    },
    handleMouseUp: function() {
      this.mouse.down = false;
    },
    handleMouseMove: function(event) {
      let pageX = event.touches ? event.touches[0].pageX : event.pageX;
      let pageY = event.touches ? event.touches[0].pageY : event.pageY;
      this.mouse.current = {
        x: pageX,
        y: pageY
      };

      this.draw(event);
    }
  },
  ready: function() {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.translate(0.5, 0.5);
    ctx.imageSmoothingEnabled = false;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
