<template>
  <div class="container content">
    <!-- titel -->
    <div class="row bg-dark text-secondary">
      <div class="col-12 mt-3">
        <h1 class="text-secondary text-center">Invite players</h1>
      </div>
      <GameCode :game="game" />
    </div>
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