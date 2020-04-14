<template>
  <div>
    <div class="container mt-3">
      <!-- Countdown -->
      <Countdown />
      <DrawingPanel />
    </div>
  </div>
</template>

<script>
import DrawingPanel from "@/components/DrawingPanel.vue";
import Countdown from "@/components/Countdown.vue";

export default {
  name: "Drawing",
  props: {
    msg: String
  },
  components: {
    DrawingPanel,
    Countdown
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
