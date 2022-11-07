<template>
  <section>
    <p>
      Stack the colors into a gradient. If your sort isn't perfect you will be given
      the colors in the order you sorted them and a chance to try again.
      Keep trying by changing order you stack the colors in until you win.
    </p>

    <p>
      <span class="highlight">Locked pieces</span>
      are in the
      <span class="highlight">correct place</span>,
      create the stack around those.
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
  padding: 1rem 4rem;
}
.highlight {
  color: rgb(47, 215, 245)
}
</style>
