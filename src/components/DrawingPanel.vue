<template>
  <div>
    <div class="row">
      <div class="col">
        <p>Here comes the drawing panels</p>
      </div>
    </div>
    <div class="col-10">
      <p>1/3</p>
    </div>
    <div class="col-2">
      <a type="button" class="btn btn-primary" href="makeCombination.html">
        <i class="fas fa-check"></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "DrawingPanel",
  props: {
    msg: String
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
