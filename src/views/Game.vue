<template>
  <div>
    <Lobby v-if="game.state == 'lobby' && !waiting" :game="game" />
    <Vote v-if="game.state == 'vote' && !waiting" />
    <Drawing v-if="game.state == 'drawing' && !waiting" :game="game" />
    <CombinationPicker v-if="game.state == 'combination' && !waiting" :game="game" />
    <Waiting v-if="waiting" />
  </div>
</template>
<script>
import Lobby from "@/components/Lobby.vue";
import Vote from "@/components/Vote.vue";
import Drawing from "@/components/Drawing.vue";
import CombinationPicker from "@/components/CombinationPicker.vue";
import Waiting from "@/components/Waiting.vue";

export default {
  name: "Game",
  components: {
    Lobby,
    Vote,
    CombinationPicker,
    Drawing,
    Waiting
  },
  data: function() {
    return {
      gameState: "play"
    };
  },
  computed: {
    game() {
      return this.$store.getters.getGame;
    },
    player() {
      return this.$store.getters.getPlayer;
    },
    waiting() {
      if(this.game.state != this.player.state) {
        return true
      } else {
        return false
      }
    }
  }
};
</script>
