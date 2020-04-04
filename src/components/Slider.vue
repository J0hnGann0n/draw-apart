<template>
  <div :id="images[0].bodyPart" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner">
      <div
        class="carousel-item"
        :class="{ active: index === 0 }"
        v-for="(image,index) in images"
        :key="index"
      >
        <img class="d-block w-100" :src="image.imageData" alt="First slide" />
      </div>
    </div>
    <a class="carousel-control-prev" :href="'#'+images[0].bodyPart" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" :href="'#'+images[0].bodyPart" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<script>
export default {
  name: "Slider",
  props: {
    images: {
      type: Array
    }
  },
  data: function() {
    return {};
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>