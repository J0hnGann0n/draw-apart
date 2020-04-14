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
      timeleft: 0
    };
  },
  props: {
    time: {
      type: Number,
      default: 0
    }
  },
  methods: {
    countDownTimer() {
      if (this.timeleft > 0) {
        setTimeout(() => {
          this.timeleft -= 1;
          this.countDownTimer();
        }, 1000);
      }
    }
  },
  computed: {
    finished() {
      if (this.timeleft == 0) {
        this.$store.dispatch("updateCountdownState");
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {
    this.timeleft = this.time;
    this.countDownTimer();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
