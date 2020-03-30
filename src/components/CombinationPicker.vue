<template>
  <div class="container mt-3">
    <!-- Countdown -->
    <div class="row justify-content-end">
      <div class="col-2 text-left align-content-end">
        <p>40</p>
      </div>
    </div>

    <!-- titel -->
    <div class="row">
      <div class="col">
        <h1>Choose Combination</h1>
      </div>
    </div>

    <CombinationPickerSlider />

    <!-- finish combination -->
    <div class="row justify-content-end">
      <div class="col-2">
        <a type="button" class="btn btn-primary" href="nameCombination.html">
          <i class="fas fa-check"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import CombinationPickerSlider from "@/components/CombinationPickerSlider.vue";

export default {
  name: "CombinationPicker",
  props: {
    msg: String
  },
  data: function() {
    return {};
  },
  components: {
    CombinationPickerSlider
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
