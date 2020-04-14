<template>
  <div class="container mt-3">
    <!-- titel -->
    <div class="row">
      <div class="col">
        <h1>Name it</h1>
      </div>
    </div>

    <!-- show combination -->
    <div class="row">
      <div class="col-12">
        <img :src="combinationImage" />
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
    <div class="row justify-content-end">
      <div class="col-2">
        <button type="button" @click="submitCombination()" class="btn btn-primary">
          <i class="fas fa-check"></i>
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
      return this.$store.state.combination.image;
    }
  },
  methods: {
    submitCombination() {
      this.$store.dispatch("updatePlayerState", "voting");
      this.$store.dispatch("submitCombination", this.name);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>