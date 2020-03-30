<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="row justify-content-around align-items-center">
          <div class="col-2">
            <i class="fas fa-arrow-left"></i>
          </div>
          <div class="col-6">
            <img src="https://via.placeholder.com/200" />
          </div>
          <div class="col-2">
            <i class="fas fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-2">
        <a type="button" class="btn btn-primary" href="winner.html">
          <i class="fas fa-check"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DrawingPicker",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
