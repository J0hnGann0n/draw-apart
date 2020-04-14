<template>
  <div>
    <Lobby v-if="game.state == 'lobby'" :game="game" />
    <Vote v-if="game.state == 'vote'" />
    <Drawing v-if="game.state == 'play'" :game="game" />
    <CombinationPicker v-if="game.state == 'combination'" :game="game" />
  </div>
</template>
<script>
import Lobby from "@/components/Lobby.vue";
import Vote from "@/components/Vote.vue";
import Drawing from "@/components/Drawing.vue";
import CombinationPicker from "@/components/CombinationPicker.vue";

export default {
  name: "Game",
  components: {
    Lobby,
    Vote,
    CombinationPicker,
    Drawing
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
