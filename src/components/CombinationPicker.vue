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

    <!-- finish combination -->
    <div class="row justify-content-end">
      <div class="col-2">
        <a type="button" class="btn btn-primary" href="nameCombination.html">
          <i class="fas fa-check"></i>
        </a>
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
