<template>
  <main>
    <color-stack-main />
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import ColorStackMain from '@/components/color-stack/ColorStackMain.vue';

export default Vue.extend({
  name: 'ColorGolfParent',
  components: {
    ColorStackMain,
  },
});
</script>

<style lang="scss" scoped>

</style>
