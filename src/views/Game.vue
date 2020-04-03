<template>
  <div>
    <Lobby v-if="game.state == 'lobby'" :game="game" />
    <Vote v-if="game.state == 'vote'" />
    <Play v-if="game.state == 'play'" :game="game" />
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
  },
  computed: {
    game() {
      return this.$store.getters.getGame;
    }
  }
};
</script>
