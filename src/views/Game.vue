<template>
  <div>
    <Lobby v-if="gameState == 'lobby'" />
    <Vote v-if="gameState == 'vote'" />
  </div>
</template>
<script>
import Lobby from "@/components/Lobby.vue";
import Vote from "@/components/Vote.vue";

export default {
  name: "Game",
  components: {
    Lobby,
    Vote
  },
  data: function() {
    return {
      gameState: "lobby"
    };
  }
};
</script>
