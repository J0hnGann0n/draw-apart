<template>
  <div class="row">
    <div class="col-2">
      <i class="fas" :class="{ 'fa-crown': player.host, 'fa-user-tie': !player.host }"></i>
    </div>
    <div class="col-10">
      <p>{{player}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "User",
  props: ["player"]
};
</script>