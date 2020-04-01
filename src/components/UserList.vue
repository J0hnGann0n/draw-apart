<template>
  <!-- Userlist -->
  <div class="row">
    <div class="col">
      <User v-for="(player, index) in game.players" :player="player" :key="index" />
    </div>
  </div>
</template>
<script>
import User from "@/components/User.vue";
export default {
  name: "UserList",
  props: ["game"],
  components: {
    User
  }
};
</script>