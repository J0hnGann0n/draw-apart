<template>
  <div class="container content">
    <DrawingPanel />
  </div>
</template>

<script>
import DrawingPanel from "@/components/DrawingPanel.vue";

export default {
  name: "Drawing",
  components: {
    DrawingPanel
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
