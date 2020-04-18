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
            class="row justify-content-around align-items-center"
          >
            <div
              @click="slideBack(bodyPart)"
              :style="{visibility: combination[bodyPart] > 0 ? 'visible' : 'hidden'}"
              class="col-2"
            >
              <font-awesome-icon icon="arrow-left" />
            </div>
            <div class="col-6">
              <img
                :src="drawings[bodyPart][combination[bodyPart]].imageData"
                width="100px"
                height="100px"
              />
            </div>
            <div
              @click="slideForward(bodyPart)"
              :style="{visibility: combination[bodyPart] < drawings[bodyPart].length - 1 ? 'visible' : 'hidden'}"
              class="col-2"
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
    <CombinationNameInput v-if="combinationPicked" />
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
     * update combination object with active image when sliding forward
     */
    slideForward(bodyPart) {
      let currentChoosen = this.combination[bodyPart];
      if (currentChoosen < this.drawings[bodyPart].length) {
        this.combination[bodyPart] = currentChoosen + 1;
      }
    },
    /**
     * update combination object with active image when sliding back
     */
    slideBack(bodyPart) {
      let currentChoosen = this.combination[bodyPart];
      if (currentChoosen > 0) {
        this.combination[bodyPart] = currentChoosen - 1;
      }
    },
    submitCombination() {
      //get canvas
      let canvas = document.getElementById("canvas");
      //get context object to draw images
      let context = canvas.getContext("2d");
      let images = [];

      //for each bodypart get the choosen image and push it into images array
      this.bodyParts.forEach(bodypart => {
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
