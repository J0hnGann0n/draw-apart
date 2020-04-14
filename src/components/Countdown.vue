<template>
  <!-- Countdown -->
  <div class="row justify-content-end">
    <div class="col-2 text-left align-content-end">
      <p>{{countdown.timeleft}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Countdown",
  methods: {
    countDownTimer() {
      if (this.countdown.timeleft > 0) {
        if (!this.countdown.started) this.$store.dispatch("startCountdown");
        setTimeout(() => {
          this.$store.dispatch("updateTimeCountdown");
          this.countDownTimer();
        }, 1000);
      } else {
        this.$store.dispatch("stopCountdown");
      }
    }
  },
  computed: {
    countdown() {
      return this.$store.getters.getCountdown;
    }
  },

  created() {
    this.$store.dispatch("updateTimeCountdown", this.time);
    this.countDownTimer();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
