<template>
  <div class="container mt-3 content">
    <!-- titel -->
    <div class="row">
      <div class="col">
        <h1>Name it</h1>
      </div>
    </div>

    <!-- show combination -->
    <div class="row">
      <div class="col-12 d-flex">
        <img class="responsive-height" :src="combinationImage" />
      </div>
      <div class="input-group mb-3 col">
        <input
          type="text"
          class="form-control mt-2"
          id="nameit"
          v-model="name"
          placeholder="Choose a Name"
          aria-describedby="chooseAName"
        />
      </div>
    </div>

    <!-- finish naming -->
    <div class="row justify-content-end pr-3">
      <div class="col-2">
        <button type="button" @click="submitCombination()" class="btn btn-primary">
          <font-awesome-icon icon="check" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CombinationNameInput",
  data() {
    return {
      name: ""
    };
  },
  computed: {
    combinationImage() {
      return this.$store.getters.getCombinationImage;
    },
    countDownFinished() {
      return this.$store.getters.getCountDownFinished;
    }
  },
  methods: {
    submitCombination(name) {
      let combinationName = name ? name : this.name;
      this.$store.dispatch("updatePlayerState", "voting");
      this.$store.dispatch("submitCombination", combinationName);
    },
    handleTimeout() {
      this.submitCombination("Hurrr... Where's my keyboard?");
      this.$store.dispatch("startCountdown");
    }
  },
  watch: {
    countDownFinished() {
      this.handleTimeout();
    }
  },
  created() {
    // If countdown reaches zero, submit the combination with default name.
    if (this.countDownFinished) this.handleTimeout();
  }
};
</script>
1
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>