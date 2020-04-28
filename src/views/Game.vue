<template>
  <div class="w-100">
    <Lobby v-if="game.state == 'lobby'" :game="game" />
    <Vote v-if="game.state == 'voting' && !waiting" />
    <DrawingPanel v-if="game.state == 'drawing' && !waiting" :game="game" />
    <CombinationPicker v-if="game.state == 'combination' && !waiting" :game="game" />
    <ShowWinner v-if="game.state == 'winner' && !waiting" :game="game" />
    <Waiting v-if="waiting && !(game.state == 'lobby')" />
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
      return true;
      //if (this.game.state != this.player.state) {
      //return true;
      //} else {
      //return false;
      //}
    }
  }
};
</script>
