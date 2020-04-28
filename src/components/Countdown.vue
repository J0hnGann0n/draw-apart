<template>
  <!-- Countdown -->
  <div class="row justify-content-center">
    <div class="col-2 text-left align-content-end">
      <h3>{{timeleft}}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "Countdown",
  data() {
    return {
      timeleft: null,
      countdownCalculation: null
    };
  },
  computed: {
    game() {
      return this.$store.getters.getGame;
    },
    startTime() {
      return this.game.countDown.startTime;
    }
  },
  watch: {
    startTime(newStartTime) {
      clearInterval(this.countdownCalculation);
      this.startCountdown(newStartTime);
    }
  },
  methods: {
    startCountdown(startTime) {
      this.$store.dispatch("startCountdown");
      this.timeleft = this.game.countDown[this.game.state];

      // Every second calclate time left until countdown time for the current game state.
      // Set game.countDownFinished to true when countdown is finished.
      this.countdownCalculation = setInterval(() => {
        if (this.timeleft > 0) {
          let now = new Date();
          let countdownTime = this.game.countDown[this.game.state];
          let timePassed = now - startTime;
          this.timeleft = Math.floor(countdownTime - timePassed / 1000);
        } else {
          this.$store.dispatch("stopCountdown");
          clearInterval(this.countdownCalculation);
        }
      }, 1000);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
