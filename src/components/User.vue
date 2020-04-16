<template>
  <div class="row">
    <div class="col-2">
      <font-awesome-icon v-if="isHost" icon="crown" />
      <font-awesome-icon v-else icon="user-tie" />
    </div>
    <div class="col-10">
      <p>{{name}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "User",
  props: ["name", "isHost"]
};
</script>