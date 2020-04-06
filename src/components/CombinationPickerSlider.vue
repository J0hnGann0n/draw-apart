<template>
  <!-- drawing combination -->
  <div class="row">
    <div class="col-12">
      <div class="row justify-content-around align-items-center">
        <div @click="slideBack(headDrawings)" v-show="combination.head > 0" class="col-2">
          <i class="fas fa-arrow-left"></i>
        </div>
        <div class="col-6">
          <img :src="headDrawings[combination.head].imageData" width="100px" height="100px" />
        </div>
        <div
          @click="slideForward(headDrawings)"
          v-show="combination.head < headDrawings.length"
          class="col-2"
        >
          <i class="fas fa-arrow-right"></i>
        </div>
      </div>
      <div class="row justify-content-around align-items-center">
        <div class="col-2">
          <i class="fas fa-arrow-left"></i>
        </div>
        <div class="col-6">
          <img src="https://via.placeholder.com/100" />
        </div>
        <div class="col-2">
          <i class="fas fa-arrow-right"></i>
        </div>
      </div>
      <div class="row justify-content-around align-items-center">
        <div class="col-2">
          <i class="fas fa-arrow-left"></i>
        </div>
        <div class="col-6">
          <img src="https://via.placeholder.com/100" />
        </div>
        <div class="col-2">
          <i class="fas fa-arrow-right"></i>
        </div>
      </div>
      <div class="row justify-content-around align-items-center">
        <div class="col-2">
          <i class="fas fa-arrow-left"></i>
        </div>
        <div class="col-6">
          <img src="https://via.placeholder.com/100" />
        </div>
        <div class="col-2">
          <i class="fas fa-arrow-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CombinationPickerSlider",
  props: {
    msg: String
  },
  data: function() {
    return {
      combination: {
        head: 0,
        body: 0,
        legs: 0,
        feet: 0
      }
    };
  },
  methods: {
    slideForward(bodyPart) {
      let currentChoosen = this.combination[bodyPart[0].bodyPart];
      console.log(currentChoosen);
      if (currentChoosen < bodyPart.length) {
        this.combination[bodyPart[0].bodyPart] = currentChoosen + 1;
      }
    },
    slideBack(bodyPart) {
      let currentChoosen = this.combination[bodyPart[0].bodyPart];
      if (currentChoosen > 0) {
        this.combination[bodyPart[0].bodyPart] = currentChoosen - 1;
      }
    }
  },
  computed: {
    game() {
      return this.$store.getters.getGame;
    },
    headDrawings() {
      return this.game.drawings.filter(drawing => (drawing.bodyPart = "head"));
    },
    bodyDrawings() {
      return this.game.drawings.filter(drawing => (drawing.bodyPart = "body"));
    },
    legsDrawings() {
      return this.game.drawings.filter(drawing => (drawing.bodyPart = "legs"));
    },
    feetDrawings() {
      return this.game.drawings.filter(drawing => (drawing.bodyPart = "feet"));
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>