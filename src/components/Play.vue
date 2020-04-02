<template>
  <div>
    <div class="container mt-3">
      <!-- Countdown -->
      <div class="row justify-content-end">
        <div class="col-2 text-left align-content-end">
          <p>40</p>
        </div>
      </div>
      <DrawingPanel v-if="drawing" />
    </div>

    <CombinationPicker v-if="!drawing && ! combinationPicked" />
    <CombinationNameInput v-if="combinationPicked" />
  </div>
</template>

<script>
import DrawingPanel from "@/components/DrawingPanel.vue";
import CombinationPicker from "@/components/CombinationPicker.vue";
import CombinationNameInput from "@/components/CombinationNameInput.vue";

export default {
  name: "Play",
  props: {
    msg: String
  },
  data: function() {
    return {
      drawing: true,
      combinationPicked: false
    };
  },
  components: {
    DrawingPanel,
    CombinationPicker,
    CombinationNameInput
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
