<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="row justify-content-around align-items-center">
          <div
            @click="slideBack()"
            :style="{visibility: currentChoosen > 0 ? 'visible' : 'hidden'}"
            class="col-2 slide-back"
          >
            <font-awesome-icon icon="arrow-left" />
          </div>
          <div class="col-6">
            <img class="responsive-height" :src="imageSrc" />
            <h5>{{imageName }}</h5>
          </div>
          <div
            @click="slideForward()"
            :style="{visibility: currentChoosen < numberOfCombinations - 1 ? 'visible' : 'hidden'}"
            class="col-2 slide-forward"
          >
            <font-awesome-icon icon="arrow-right" />
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-end pr-3">
      <div class="col-2">
        <button @click="submitVote()" type="button" class="btn btn-primary">
          <font-awesome-icon icon="check" />
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
    },
    timeOver() {
      return this.$store.getters.getCountDownFinished;
    }
  },
  watch: {
    timeOver() {
      this.submitVote();
      this.$store.dispatch("startCountdown");
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
    /**
     * Send vote object to store with ID of selected combination.
     */
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
