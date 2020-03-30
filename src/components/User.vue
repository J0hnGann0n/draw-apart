<template>
  <div class="row">
    <div class="col-2">
      <i class="fas fa-user-tie"></i>
    </div>
    <div class="col-10">
      <p>{{user.name}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "User",
  props: ["user"]
};
</script>