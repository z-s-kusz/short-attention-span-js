<template>
  <section class="center-flex">
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
  .center-flex {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }
</style>
