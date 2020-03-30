<template>
  <div class="about">
    <Vote>This will be the game view</Vote>
  </div>
</template>

<script>
import Vote from '@/components/Vote.vue'
export default {
  name: 'Game',
  props: {
    msg: String
  },
  components: {
    Vote
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
