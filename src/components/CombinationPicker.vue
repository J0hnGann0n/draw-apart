<template>
  <div>
    <div class="container mt-3 content" v-if="!combinationPicked">
      <!-- titel -->
      <div class="row">
        <div class="col">
          <h1>Choose Combination</h1>
        </div>
      </div>

      <!-- drawing combination -->
      <div class="row">
        <div class="col-12">
          <div
            v-for="(bodyPart, index) in Object.keys(drawings)"
            :key="index"
            :ref="'bodypart-slider-'+index"
            class="row justify-content-around align-items-center"
          >
            <div
              @click="slideBack(bodyPart)"
              :style="{visibility: combination[bodyPart] > 0 ? 'visible' : 'hidden'}"
              class="col-2 slideBack"
            >
              <font-awesome-icon icon="arrow-left" />
            </div>
            <div class="col-6">
              <img
                class="combination-image"
                :src="drawings[bodyPart][combination[bodyPart]].imageData"
              />
            </div>
            <div
              @click="slideForward(bodyPart)"
              :style="{visibility: combination[bodyPart] < drawings[bodyPart].length - 1 ? 'visible' : 'hidden'}"
              class="col-2 slideForward"
            >
              <font-awesome-icon icon="arrow-right" />
            </div>
          </div>
        </div>
      </div>
      <canvas id="canvas" class="d-none"></canvas>

      <!-- finish combination -->
      <div class="row justify-content-end pr-3">
        <div class="col-2">
          <button @click="submitCombination()" type="button" class="btn btn-primary">
            <font-awesome-icon icon="check" />
          </button>
        </div>
      </div>
    </div>
    <CombinationNameInput v-if="combinationPicked" ref="nameInput" />
  </div>
</template>

<script>
import CombinationNameInput from "@/components/CombinationNameInput.vue";
export default {
  name: "CombinationPicker",
  components: {
    CombinationNameInput
  },
  data: function() {
    return {
      bodyParts: ["head", "body", "legs", "feet"],
      combination: {
        head: 0,
        body: 0,
        legs: 0,
        feet: 0
      }
    };
  },
  methods: {
    /**
     * Update combination object with active image when sliding forward
     */
    slideForward(bodyPart) {
      let currentChoosen = this.combination[bodyPart];
      if (currentChoosen < this.drawings[bodyPart].length) {
        this.combination[bodyPart] = currentChoosen + 1;
      }
    },
    /**
     * Update combination object with active image when sliding back
     */
    slideBack(bodyPart) {
      let currentChoosen = this.combination[bodyPart];
      if (currentChoosen > 0) {
        this.combination[bodyPart] = currentChoosen - 1;
      }
    },
    /**
     * Get Canvas from DOM
     */
    getCanvasDOM() {
      return document.getElementById("canvas");
    },
    /**
     * Create one image from the selected combination and commit it to the store.
     */
    submitCombination() {
      //get canvas
      let canvas = this.getCanvasDOM();
      //get context object to draw images
      let context = canvas.getContext("2d");
      let images = [];

      //for each bodypart get the choosen image and push it into images array
      let bodyParts = Object.keys(this.drawings);
      bodyParts.forEach(bodypart => {
        let img = new Image();
        let drawings = this.drawings[bodypart];
        let key = Object.keys(drawings)[this.combination[bodypart]];
        img.src = drawings[key].imageData;
        images.push(img);
      });

      //set widt and height of canvas
      canvas.width = 100;
      canvas.height = this.bodyParts.length * 100;

      //draw each image
      for (const [i, v] of images.entries()) {
        context.drawImage(v, 0, i * 100, 100, 100);
      }

      //Save canvas as base64
      let combinationImage = canvas.toDataURL();
      this.$store.dispatch("addCombination", combinationImage);
    }
  },
  watch: {
    countDownFinished() {
      this.submitCombination();
    }
  },
  computed: {
    game() {
      return this.$store.getters.getGame;
    },
    drawings() {
      return this.$store.getters.getDrawingsByBodyPart;
    },
    combinationPicked() {
      if (this.$store.state.combination.image) {
        return true;
      } else {
        return false;
      }
    },
    countDownFinished() {
      return this.$store.getters.getCountDownFinished;
    }
  }
};
</script>

<style scoped lang="scss">
.combination-image {
  height: calc((100vh - 300px) / 4);
  width: calc((100vh - 300px) / 4);
}
</style>
