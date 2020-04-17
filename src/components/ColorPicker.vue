<template>
  <div class="btn-toolbar col-1 p-0" role="toolbar" aria-label="Toolbar with button groups">
    <div class="btn-group-vertical" role="group" aria-label="First group">
      <button
        v-for="(color, index) in colors"
        v-bind:key="index"
        type="button"
        class="btn btn-outline-light color color-button"
        v-bind:style="{ backgroundColor: color}"
        @click="selectColor(color)"
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      colors: [
        "#C0C0C0",
        "#808080",
        "#000000",
        "#FF0000",
        "#800000",
        "#FFFF00",
        "#808000",
        "#00FF00"
      ]
    };
  },
  methods: {
    selectColor(color) {
      this.$emit("select-color", color);
    }
  }
};
</script>

<style scoped lang="scss">
.color {
  width: 100%;
}
.btn-group-vertical {
  height: 90%;
}
.color-picker {
  width: 100%;
  border: 1px solid red;
}
</style>