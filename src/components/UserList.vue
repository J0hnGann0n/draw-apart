<template>
  <!-- Userlist -->
  <div class="row mt-3">
    <div class="col-12">
      <h5>Players</h5>
    </div>
    <div class="col">
      <User
        v-for="(player, index) in Object.entries(game.players)"
        :name="player[0]"
        :isHost="player[1].host"
        :key="index"
      />
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