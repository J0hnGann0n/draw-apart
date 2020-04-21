<template>
  <!-- Share code -->
  <div class="row w-100 justify-content-center game-code">
    <div class="col-12">
      <p class="text-center">
        {{ game.code }}
        <span @click="toggleShareButtons()">
          <font-awesome-icon icon="share-alt" />
        </span>
        <social-sharing
          :url="shareLink"
          title="Play Draw Apart with me"
          :description="shareDescription"
          quote="Draw Apart, the digital version of the paper classic"
          hashtags="play, game, draw apart"
          inline-template
          v-if="showShareButtons"
        >
          <div>
            <network network="whatsapp">
              <img src="../assets/whatsapp-brands.svg" width="40px" class="mr-1" />
            </network>
            <network network="line">
              <img src="../assets/line-brands.svg" width="40px" class="mr-1" />
            </network>
            <network network="skype">
              <img src="../assets/skype-brands.svg" width="40px" class="mr-1" />
            </network>
            <network network="telegram">
              <img src="../assets/telegram-brands.svg" width="40px" />
            </network>
          </div>
        </social-sharing>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "GameCode",
  props: ["game"],
  data() {
    return {
      showShareButtons: false
    };
  },
  methods: {
    toggleShareButtons() {
      this.showShareButtons = !this.showShareButtons;
    }
  },
  computed: {
    shareLink() {
      return `${window.location.origin}/join/${this.game.code}`;
    },
    shareDescription() {
      let players = Object.keys(this.game.players);
      console.log(players);
      let playerString = "";
      players.forEach((player, index) => {
        if (players.length === 1) {
          playerString = `${player} `;
          return true;
        } else if (players.length == 2) {
          playerString = `${players[0]} and ${players[1]} `;
          return true;
        } else if (index === players.length - 1) {
          playerString += `and ${player}`;
        } else {
          playerString += `${player}, `;
        }
      });
      return `${playerString} would like to play Draw Apart with you`;
    }
  }
};
</script>

<style lang="scss">
.game-code {
  font-size: 2rem;
}
</style>