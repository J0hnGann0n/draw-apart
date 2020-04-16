<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="row justify-content-around align-items-center">
          <div @click="slideBack()" v-show="currentChoosen > 0" class="col-2">
            <i class="fas fa-arrow-left"></i>
          </div>
          <div class="col-6">
            <img :src="imageSrc" />
            <p>{{imageName }}</p>
          </div>
          <div
            @click="slideForward()"
            v-show="currentChoosen < numberOfCombinations - 1"
            class="col-2"
          >
            <i class="fas fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-2">
        <button @click="submitVote()" type="button" class="btn btn-primary">
          <i class="fas fa-check"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DrawingPicker",
  data() {
    return {
      currentChoosen: 0
    };
  },
  computed: {
    game() {
      return this.$store.getters.getGame;
    },
    player() {
      return this.$store.getters.getPlayer;
    },
    imageSrc() {
      let key = Object.keys(this.game.combinations)[this.currentChoosen];
      return this.game.combinations[key].image;
    },
    imageName() {
      let key = Object.keys(this.game.combinations)[this.currentChoosen];
      return this.game.combinations[key].name;
    },
    numberOfCombinations() {
      return Object.keys(this.game.combinations).length;
    }
  },
  methods: {
    /**
     * update combination object with active image when sliding forward
     */
    slideForward() {
      if (this.currentChoosen < this.numberOfCombinations) {
        this.currentChoosen++;
      }
    },
    /**
     * update combination object with active image when sliding back
     */
    slideBack() {
      if (this.currentChoosen > 0) {
        this.currentChoosen--;
      }
    },
    submitVote() {
      let voteId = Object.keys(this.game.combinations)[this.currentChoosen];
      let vote = {
        id: voteId,
        player: this.player.name
      };
      this.$store.dispatch("submitVote", vote);
      this.$store.dispatch("updatePlayerState", "winner");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
