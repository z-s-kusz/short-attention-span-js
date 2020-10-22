<template>
<main>
  <input type="text" />
  <colorful-button :buttonId="'test'"></colorful-button>
</main>
</template>

<script lang="ts">
import Vue from 'vue';
import ColorfulButton from '@/components/ColorfulButton.vue';

export default Vue.extend({
  components: {
    ColorfulButton,
  },
});
</script>

<style lang="scss" scoped>

</style>
