<template>
  <div>
    <div class="row">
      <div class="col">
        <h5>Draw the {{ bodyPart[drawingCount] }}</h5>
      </div>
    </div>
    <div class="row justify-content-center">
      <ColorPicker @select-color="setColor" />
      <div class="col-10 d-flex p-0">
        <canvas
          id="canvas"
          v-on:mousedown="handleMouseDown"
          v-on:mouseup="handleMouseUp"
          v-on:mousemove="handleMouseMove"
          v-touch:start="handleMouseDown"
          v-touch:end="handleMouseUp"
          v-touch:moving="handleMouseMove"
        ></canvas>
      </div>
    </div>
    <div class="col-10">
      <p>{{ drawingCount }}</p>
    </div>
    <div class="col-12 d-flex">
      <button type="button" class="btn btn-secondary" @click="undo()">
        <font-awesome-icon icon="undo" />
      </button>
      <button type="button" class="btn btn-secondary" @click="clearCanvas()">
        <font-awesome-icon icon="trash" />
      </button>
      <button
        type="button"
        class="btn btn-primary ml-auto"
        @click="submitDrawing(bodyPart[drawingCount])"
      >
        <font-awesome-icon icon="check" />
      </button>
    </div>
  </div>
</template>

<script>
import ColorPicker from "./ColorPicker";

export default {
  name: "DrawingPanel",
  props: {
    msg: String
  },
  components: {
    ColorPicker
  },
  data: function() {
    return {
      vueCanvas: null,
      canvasHistory: [],
      canvasWidth: 0,
      canvasHeight: 0,
      drawingCount: 0,
      drawings: [],
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
      var sx = c.scrollWidth / c.width;
      var sy = c.scrollHeight / c.height;


      return {
        x: (this.mouse.current.x - rect.left) / sx,
        y: (this.mouse.current.y - rect.top) / sy
      };
    },
    countdown() {
      return this.$store.getters.getCountdown();
    }
  },
  methods: {
    /**
     * Get canvas image as base64 and send drawing object to store to be submitted.
     */
    submitDrawing(bodyPart) {
      let canvasDOM = document.getElementById("canvas");
      let image = canvasDOM.toDataURL();
      let drawing = {
        imageData: image,
        bodyPart: bodyPart
      };
      this.drawings.push(drawing);
      this.drawingCount++;
      if (this.drawingCount > 3) {
        this.$store.dispatch("submitDrawings", this.drawings);
        this.$store.dispatch("updatePlayerState", "combination");
      }
      this.clearCanvas();
    },
    /**
     * Clears or deletes everything on the canvas
     */
    clearCanvas() {
      this.vueCanvas.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.vueCanvas.beginPath();
    },
    /**
     * Set the stroke color to the selected color
     */
    setColor(color) {
      this.vueCanvas.strokeStyle = color;
    },
    /**
     * Reload the canvas to the previous state stored in the canvas history
     */
    undo() {
      if (this.canvasHistory.length > 1) {
        var reloadData = this.canvasHistory[this.canvasHistory.length - 2];
        this.vueCanvas.putImageData(reloadData, 0, 0);
      } else {
        this.clearCanvas();
      }
      this.canvasHistory.pop();
    },
    /**
     * Draw a line from the point at which mouse down was pressed to the current position.
     */
    draw: function() {
      if (this.mouse.down) {
        this.vueCanvas.lineTo(this.currentMouse.x, this.currentMouse.y);
        this.vueCanvas.lineWidth = 2;
        this.vueCanvas.stroke();
      }
    },
    /**
     * Set mouse.down to true (start drawing), move the canvas poiter to the current location and
     * store the current location.
     */
    handleMouseDown: function(event) {
      this.mouse.down = true;
      let pageX = event.touches ? event.touches[0].pageX : event.pageX;
      let pageY = event.touches ? event.touches[0].pageY : event.pageY;
      this.mouse.current = {
        x: pageX,
        y: pageY
      };
      this.vueCanvas.beginPath();
      this.vueCanvas.moveTo(this.currentMouse.x, this.currentMouse.y);
    },
    /**
     * Set mouse.down to false (stop drawing) and store the current canvas to the canvas history.
     */
    handleMouseUp: function() {
      this.mouse.down = false;
      let data = this.vueCanvas.getImageData(
        0,
        0,
        this.canvasWidth,
        this.canvasHeight
      );

      this.canvasHistory.push(data); // Store state of canvas to history.
    },
    /**
     * Update the current pointer location and draw.
     */
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
  mounted() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let heightRatio = 1.2; // Adjust this to change height of canvas
    canvas.height = canvas.width * heightRatio;
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.vueCanvas = ctx;
    this.vueCanvas.strokeStyle = "#FFFF00";
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#canvas {
  border: 2px solid #136f63;
  border-left: 0px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-radius: 10px;
  width: 100%;
}
</style>
