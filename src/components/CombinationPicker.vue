<template>
  <div class="container mt-3">
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
          v-for="(bodyPart, index) in bodyParts"
          :key="index"
          class="row justify-content-around align-items-center"
        >
          <div @click="slideBack(bodyPart)" v-show="combination[bodyPart] > 0" class="col-2">
            <i class="fas fa-arrow-left"></i>
          </div>
          <div class="col-6">
            <img
              :src="game.drawings[bodyPart][combination[bodyPart]].imageData"
              width="100px"
              height="100px"
            />
          </div>
          <div
            @click="slideForward(bodyPart)"
            v-show="combination[bodyPart] < game.drawings[bodyPart].length - 1"
            class="col-2"
          >
            <i class="fas fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
    <canvas id="canvas"></canvas>

    <!-- finish combination -->
    <div class="row justify-content-end">
      <div class="col-2">
        <button @click="submitCombination()" type="button" class="btn btn-primary">
          <i class="fas fa-check"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CombinationPicker",
  props: {
    msg: String
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
      if (currentChoosen < this.game.drawings[bodyPart].length) {
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
      var canvas = document.getElementById("canvas");
      var context = canvas.getContext("2d");

      var img1 = new Image();
      var img2 = new Image();

      img1.width = 100;
      img1.height = 100;
      img2.width = 100;
      img2.height = 100;

      img1.src = this.game.drawings["head"][this.combination["head"]].imageData;
      img2.src = this.game.drawings["feet"][this.combination["feet"]].imageData;

      canvas.width = img1.width;
      canvas.height = img1.height + img2.height;

      context.globalAlpha = 1.0;
      context.drawImage(img1, 0, 0);
      context.globalAlpha = 0.5; //Remove if pngs have alpha
      context.drawImage(img2, 0, 100);

      this.$store.dispatch("submitCombination", this.combination);
    }
  },
  computed: {
    game() {
      return this.$store.getters.getGame;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
