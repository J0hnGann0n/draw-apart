<template>
  <div>
    <div class="container mt-3">
      <!-- Countdown -->
      <div class="row justify-content-end">
        <div class="col-2 text-left align-content-end">
          <p>40</p>
        </div>
      </div>
      <DrawingPanel />
    </div>
  </div>
</template>

<script>
import DrawingPanel from "@/components/DrawingPanel.vue";

export default {
  name: "Drawing",
  props: {
    msg: String
  },
  components: {
    DrawingPanel
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
