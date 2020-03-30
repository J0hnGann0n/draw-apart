<template>
  <div>
    <Lobby v-if="gameState == 'lobby'" />
    <Vote v-if="gameState == 'vote'" />
    <Play v-if="gameState == 'play'" />
  </div>
</template>
<script>
import Lobby from "@/components/Lobby.vue";
import Vote from "@/components/Vote.vue";
import Play from "@/components/Play.vue";

export default {
  name: "Game",
  components: {
    Lobby,
    Vote,
    Play
  },
  data: function() {
    return {
      gameState: "play"
    };
  }
};
</script>
