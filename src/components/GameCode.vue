<template>
  <!-- Share code -->
  <div class="row">
    <div class="col-12">
      <p class="text-center display-4">
        {{game.code}}
        <i class="fas fa-share-alt"></i>
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