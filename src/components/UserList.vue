<template>
  <!-- Userlist -->
  <div class="row">
    <div class="col">
      <User v-for="(user, index) in users" :user="user" :key="index" />
    </div>
  </div>
</template>
<script>
import User from "@/components/User.vue";
export default {
  name: "UserList",
  components: {
    User
  },
  data: function() {
    return {
      users: {
        1: { name: "john" },
        2: { name: "mirjam" }
      }
    };
  }
};
</script>