<template>
  <div class="container mt-3">
    <!-- Settings -->
    <div class="row justify-content-end">
      <div class="col-2 text-left align-content-end">
        <font-awesome-icon icon="sliders-h" />
      </div>
    </div>
    <!-- titel -->
    <div class="row">
      <div class="col">
        <h1>Share this code</h1>
      </div>
    </div>
    <GameCode :game="game" />
    <UserList :game="game" />
    <StartGame />
  </div>
</template>
<script>
// @ is an alias to /src
import UserList from "@/components/UserList.vue";
import GameCode from "@/components/GameCode.vue";
import StartGame from "@/components/StartGame.vue";

export default {
  name: "Lobby",
  props: ["game"],
  components: {
    UserList,
    GameCode,
    StartGame
  }
};
</script>