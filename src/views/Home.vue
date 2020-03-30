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
    <CreateRoom />
  </div>
</template>

<script>
// @ is an alias to /src
import UserNameInput from "@/components/UserNameInput.vue";
import JoinGame from "@/components/JoinGame.vue";
import CreateRoom from "@/components/CreateRoom.vue";

export default {
  name: "Home",
  components: {
    UserNameInput,
    JoinGame,
    CreateRoom
  }
};
</script>
