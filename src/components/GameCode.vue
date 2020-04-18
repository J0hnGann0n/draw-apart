<template>
  <!-- Share code -->
  <div class="row w-100 justify-content-center game-code">
    <div class="col-12">
      <p class="text-center">
        {{game.code}}
        <span @click="toggleShareButtons()">
          <font-awesome-icon icon="share-alt" />
        </span>
        <social-sharing
          url="https://draw-apart.surelookatusnow.ch"
          title="Play Draw Apart with me"
          :description="game.code"
          quote="Vue is a progressive framework for building user interfaces."
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
  }
};
</script>

<style lang="scss">
.game-code {
  font-size: 2rem;
}
</style>