<template>
  <div class="row justify-content-center">
    <div class="col-auto">
      <p class="text-left">
        <font-awesome-icon v-if="isHost" icon="crown" />
        <font-awesome-icon v-else icon="user-tie" />
        {{name}}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "User",
  props: ["name", "isHost"]
};
</script>