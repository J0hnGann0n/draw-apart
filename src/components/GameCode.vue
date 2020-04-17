<template>
  <!-- Share code -->
  <div class="row w-100 justify-content-center game-code">
    <div class="col-12">
      <p class="text-center">
        {{game.code}}
        <font-awesome-icon icon="share-alt" />
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "GameCode",
  props: ["game"]
};
</script>

<style lang="scss">
.game-code {
  font-size: 2rem;
}
</style>