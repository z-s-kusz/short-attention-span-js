<template>
  <section>
    <h1>You Win!</h1>
    <button @click="handleRestart()">Play Again?</button>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    handleRestart: Function,
  },
});
</script>

<style lang="scss" scoped>

</style>
