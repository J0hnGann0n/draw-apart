<template>
  <div class="row">
    <div class="row">
      <div class="col-12">
        <div class="col-6">
          <img :src="winner.image" />
        </div>
      </div>
      <div class="col-12">
        <h2>{{winner.name}}</h2>
      </div>
    </div>

    <div class="row">
      <div class="col-2">
        <i class="fas fa-share-alt"></i>
      </div>
      <div class="col-10">
        <p>Combination von {{winner.player}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Play",
  props: ["game"],
  computed: {
    winner() {
      return this.$store.state.winner;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
