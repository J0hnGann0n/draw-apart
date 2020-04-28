<template>
  <div class="container content">
    <div class="row">
      <div class="col">
        <h5>Draw the {{ bodyPartsList[drawingCount] }}</h5>
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
    <div class="col-12 d-flex edit-buttons">
      <button type="button" class="btn btn-secondary" @click="undo()">
        <font-awesome-icon icon="undo" class="text-dark" />
      </button>
      <button type="button" class="btn btn-secondary" @click="clearCanvas()">
        <font-awesome-icon icon="trash" class="text-dark" />
      </button>
    </div>
    <div class="col-12 d-flex">
      <h5 class="text-center w-100">{{ drawingCount + '/' + bodyPartsList.length }}</h5>
      <button
        type="button"
        class="btn btn-primary ml-auto"
        @click="submitDrawing(bodyPartsList[drawingCount])"
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
      bodyParts: [
        {
          name: "head",
          anchors: [{ side: "bottom", points: [100, 175] }]
        },
        {
          name: "body",
          anchors: [
            { side: "top", points: [100, 175] },
            { side: "bottom", points: [75, 200] }
          ]
        },
        {
          name: "legs",
          anchors: [
            { side: "top", points: [75, 200] },
            { side: "bottom", points: [50, 100, 175, 225] }
          ]
        },
        {
          name: "feet",
          anchors: [{ side: "top", points: [50, 100, 175, 225] }]
        }
      ],
      mouse: {
        skip1: false,
        skip2: false,
        cp1x: 0,
        cp1y: 0,
        cp2x: 0,
        cp2y: 0,
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
      this.drawAnchorPoints();
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
      if (!this.mouse.down) {
        this.vueCanvas.beginPath();
        this.vueCanvas.moveTo(this.currentMouse.x, this.currentMouse.y);
        this.mouse.down = true;
        this.mouse.skip1 = true;
        this.mouse.skip2 = false;
      } else {
        if (this.mouse.skip1) {
          this.mouse.cp1x = this.currentMouse.x;
          this.mouse.cp1y = this.currentMouse.y;
          this.mouse.skip1 = false;
          this.mouse.skip2 = true;
        }
        if (this.mouse.skip2) {
          this.mouse.cp2x = this.currentMouse.x;
          this.mouse.cp2y = this.currentMouse.y;
          this.mouse.skip1 = false;
          this.mouse.skip2 = false;
        } else {
          this.vueCanvas.bezierCurveTo(
            this.mouse.cp1x,
            this.mouse.cp1y,
            this.mouse.cp2x,
            this.mouse.cp2y,
            this.currentMouse.x,
            this.currentMouse.y
          );
          this.mouse.skip1 = true;
          this.mouse.skip2 = false;
        }
      }
      this.vueCanvas.stroke();
    },
    /**
     * Set mouse.down to true (start drawing), move the canvas poiter to the current location and
     * store the current location.
     */
    handleMouseDown: function(event) {
      let pageX = event.touches ? event.touches[0].pageX : event.pageX;
      let pageY = event.touches ? event.touches[0].pageY : event.pageY;
      this.mouse.current = {
        x: pageX,
        y: pageY
      };
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
    },
    /**
     * Takes the anchor points for each bodypart and draws them on the canvas.
     */
    drawAnchorPoints() {
      let currentBodyPart = this.bodyPartsList[this.drawingCount];
      // Loop through each anchor point of each bodypart and draw them on the canvas
      this.bodyParts.forEach(bodyPart => {
        if (bodyPart.name === currentBodyPart) {
          bodyPart.anchors.forEach(anchor => {
            anchor.points.forEach(point => {
              this.drawAnchorPoint(anchor.side, point);
            });
          });
        }
      });
    },
    /**
     * Draw a 5 pixel vertical line from the given side to the given x co-ordinate.
     */
    drawAnchorPoint(side, anchorX) {
      let anchorY = side === "top" ? 0 : this.canvasHeight;
      this.vueCanvas.beginPath();
      let anchorEndPoint = side === "top" ? anchorY + 5 : anchorY - 5;
      this.vueCanvas.moveTo(anchorX, anchorY);
      this.vueCanvas.lineTo(anchorX, anchorEndPoint);
      this.vueCanvas.lineWidth = 3;
      this.vueCanvas.stroke();
    },
    /**
     * Submit empty drawings if the countdown hits 0.
     */
    handleTimeout() {
      if (!this.timeOver) return false;
      this.bodyPartsList.forEach(bodyPart => {
        if (this.drawings && !this.isDrawingComplete(bodyPart)) {
          this.drawings.push({
            imageData: null,
            bodyPart: bodyPart
          });
        }
      });
      this.$store.dispatch("submitDrawings", this.drawings);
      this.$store.dispatch("updatePlayerState", "combination");
      this.$store.dispatch("startCountdown");
    },
    /**
     * Check if the drawing for the given body part is already complete.
     */
    isDrawingComplete(bodyPart) {
      let drawingExists = false;
      this.drawings.forEach(drawing => {
        if (drawing.bodyPart === bodyPart) {
          drawingExists = true;
        }
      });
      return drawingExists;
    }
  },
  computed: {
    /**
     * Calculate current mouse position on the canvas.
     */
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
    /**
     * Return a list of body part names.
     */
    bodyPartsList() {
      let bodyPartsList = [];
      this.bodyParts.forEach(bodyPart => bodyPartsList.push(bodyPart.name));
      return bodyPartsList;
    },
    countdown() {
      return this.$store.getters.getCountdown();
    },
    timeOver() {
      return this.$store.getters.getCountDownFinished;
    }
  },
  watch: {
    timeOver() {
      this.handleTimeout();
    }
  },
  mounted() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.vueCanvas = ctx;
    this.vueCanvas.strokeStyle = "#FFFFFF";
    this.vueCanvas.lineCap = "round";
    this.vueCanvas.lineJoin = "round";
    this.vueCanvas.lineWidth = 2;
    this.drawAnchorPoints();
  }
};
</script>
<style scoped lang="scss">
#canvas {
  border: 2px solid #136f63;
  border-left: 0px;
  border-radius: 10px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  width: 100%;
  height: calc(100vh - 350px);
}
.edit-buttons {
  margin-top: 5px;
}
</style>
