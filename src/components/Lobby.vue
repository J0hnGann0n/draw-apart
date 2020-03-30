<template>
  <div class="container mt-3">
    <!-- Settings -->
    <div class="row justify-content-end">
      <div class="col-2 text-left align-content-end">
        <i class="fas fa-sliders-h"></i>
      </div>
    </div>
    <!-- titel -->
    <div class="row">
      <div class="col">
        <h1>Share this code</h1>
      </div>
    </div>
    <GameCode />
    <UserList />
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
  components: {
    UserList,
    GameCode,
    StartGame
  }
};
</script>