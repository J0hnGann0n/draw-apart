<template>
  <div class="container">
    <div class="row">
      <div class="col-12 d-flex justify-content-center">
        <img :src="game.winner.imageData" />
      </div>
      <div class="col-12">
        <h4 class="text-primary text-center">{{game.winner.name}}</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <p class="text-right">Combination von {{game.winner.player}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Play",
  props: ["game"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
