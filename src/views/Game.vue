<template>
  <div class="w-100">
    <Lobby v-if="game.state.name == 'lobby'" :game="game" />
    <Vote v-if="game.state.name == 'voting' && !waiting" />
    <DrawingPanel v-if="game.state.name == 'drawing' && !waiting" :game="game" />
    <CombinationPicker v-if="game.state.name == 'combination' && !waiting" :game="game" />
    <ShowWinner v-if="game.state.name == 'winner' && !waiting" :game="game" />
    <Waiting v-if="waiting && !(game.state.name == 'lobby')" />
  </div>
</template>
<script>
import Lobby from "@/components/Lobby.vue";
import Vote from "@/components/Vote.vue";
import DrawingPanel from "@/components/DrawingPanel.vue";
import CombinationPicker from "@/components/CombinationPicker.vue";
import ShowWinner from "@/components/ShowWinner.vue";
import Waiting from "@/components/Waiting.vue";

export default {
  name: "Game",
  components: {
    Lobby,
    Vote,
    CombinationPicker,
    DrawingPanel,
    Waiting,
    ShowWinner
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
      if (this.game.state.name != this.player.state) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
