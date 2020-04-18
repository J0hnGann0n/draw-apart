<template>
  <div id="app" class="wrapper">
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
  },
  watch: {
    game(to, from) {
      if (from.state === "home") this.$router.push("/game");
    }
  },
  computed: {
    game() {
      return this.$store.getters.getGame;
    }
  }
};
</script>
<style scoped></style>

<style lang="scss">
body {
  background-color: #e0ca3c;
}
</style>
