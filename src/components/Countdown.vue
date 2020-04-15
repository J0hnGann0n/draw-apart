<template>
  <!-- Countdown -->
  <div class="row justify-content-end">
    <div class="col-2 text-left align-content-end">
      <p>{{timeleft}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Countdown",
  data() {
    return {
      timeleft: null
    };
  },
  computed: {
    game() {
      return this.$store.getters.getGame;
    }
  },
  created() {
    this.$store.dispatch("startCountdown");
    this.timeleft = this.game.countDown[this.game.state];
    let countdownCalculation = setInterval(() => {
      if (this.timeleft > 0) {
        let now = +new Date();
        let countdownTime = this.game.countDown[this.game.state];
        let timePassed = now - this.game.countDown.startTime;
        this.timeleft = Math.floor(countdownTime - timePassed / 1000);
      } else {
        this.$store.dispatch("stopCountdown");
        clearInterval(countdownCalculation);
      }
    }, 1000);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
