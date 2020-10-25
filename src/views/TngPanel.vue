<template>
<main class="panel-screen">
  <tng-banner>Mission Ops</tng-banner>

</main>
</template>
<script lang="ts">
import Vue from 'vue';
import TngBanner from '@/components/tng-panel/TngBanner.vue';

export default Vue.extend({
  components: {
    TngBanner,
  },
});
</script>

<style lang="scss" scoped>
@import '~@/styles/tng.scss';

.panel-screen {
  font-family: 'tng-panel-font', monospace;
  background-color: black;
  padding: $padding;
}
</style>
