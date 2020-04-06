<template>
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
</template>

<script>
export default {
  name: "CombinationPickerSlider",
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
    slideForward(bodyPart) {
      let currentChoosen = this.combination[bodyPart];
      if (currentChoosen < this.game.drawings[bodyPart].length) {
        this.combination[bodyPart] = currentChoosen + 1;
      }
    },
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