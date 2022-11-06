<template>
  <section>
    <p>
      Sort the colors into a nice gradient. If your sort isn't perfect you will be given
      the colors in the order you sorted them and a chance to try again.
      Keep trying by changing order you stack the colors in until you win.
    </p>
    <button @click="onPlayClick(options)">Play</button>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    onPlayClick: Function,
  },
  data() {
    return {
      options: {},
    };
  },
});
</script>

<style lang="scss" scoped>
p {
  padding: 4rem;
}
</style>
