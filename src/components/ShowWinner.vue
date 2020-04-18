<template>
  <div class="row">
    <div class="row">
      <div class="col-12">
        <div class="col-6">
          <img :src="game.winner.image" />
        </div>
      </div>
      <div class="col-12">
        <h2>{{game.winner.name}}</h2>
      </div>
    </div>

    <div class="row">
      <div class="col-2">
        <font-awesome-icon icon="share-alt" />
      </div>
      <div class="col-10">
        <p>Combination von {{game.winner.player}}</p>
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
