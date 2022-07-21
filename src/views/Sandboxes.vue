<template>
  <section>
    <pre>
      {{sandbox}}
    </pre>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Sandboxes',
  data() {
    return {
      // dunno why I have to offset the top to make it look good
      sandbox:
        `     I--------I
         |        |
         |  sand  |
         |        |
         I--------I`,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
