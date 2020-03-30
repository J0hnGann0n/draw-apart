<template>
  <div class="container mt-3">
    <!-- Instructions -->
    <div class="row justify-content-end">
      <div class="col-2 text-left align-content-end">
        <i class="far fa-question-circle"></i>
      </div>
    </div>
    <!-- titel -->
    <div class="row">
      <div class="col">
        <h1>Welcome</h1>
      </div>
    </div>
    <UserNameInput />
    <JoinGame />
    <StartGame />
  </div>
</template>

<script>
// @ is an alias to /src
import UserNameInput from "@/components/UserNameInput.vue";
import JoinGame from "@/components/JoinGame.vue";
import StartGame from "@/components/StartGame.vue";

export default {
  name: "Home",
  components: {
    UserNameInput,
    JoinGame,
    StartGame
  }
};
</script>
