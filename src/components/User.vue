<template>
  <div class="row justify-content-start">
    <div class="col-auto">
      <p class="text-left">
        <font-awesome-icon v-if="isHost" icon="crown" class="text-dark" />
        <font-awesome-icon v-else icon="user" class="text-dark" />
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