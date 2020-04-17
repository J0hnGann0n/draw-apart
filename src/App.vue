<template>
  <div id="app">
    <Header />
    <div class="contentContainer d-flex">
      <router-view />
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";

export default {
  name: "App",
  components: {
    Header
  }
};
</script>
<style scoped></style>

<style lang="scss">
body {
  background-color: #e0ca3c;
}
</style>
