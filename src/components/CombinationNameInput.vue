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
          placeholder="Choose a Name"
          aria-describedby="chooseAName"
        />
      </div>
    </div>

    <!-- finish naming -->
    <div class="row justify-content-end">
      <div class="col-2">
        <a type="button" class="btn btn-primary" href="vote.html">
          <i class="fas fa-check"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CombinationNameInput",
  computed: {
    combinationImage() {
      return this.$store.state.combination.image;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>