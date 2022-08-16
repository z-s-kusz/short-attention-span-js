<template>
  <div>
    <div class="box-group">
      <color-stack-box-vue v-for="colorBox in startStack" :key="colorBox.index"
      :index="colorBox.index" :hsl="colorBox.hsl" :isAnchor="colorBox.isAnchor" />
    </div>
    <div class="box-group">
      <color-stack-box-vue v-for="colorBox in finalStack" :key="colorBox.index"
      :index="colorBox.index" :hsl="colorBox.hsl" :isAnchor="colorBox.isAnchor" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ColorStackBoxVue from '@/components/color-stack/ColorStackBox.vue';
import ColorStackBoxModel from '@/models/ColorStackBoxModel';

export default Vue.extend({
  name: 'ColorStackMain',
  components: {
    ColorStackBoxVue,
  },
  data() {
    return {
      startStack: [
        { hsl: 'hsl(227, 59%, 27%)', index: 0, isAnchor: true }, // dark blue 0
        { hsl: 'hsl(240, 100%, 75%)', index: 1, isAnchor: false }, // blue 1
        { hsl: 'hsl(254, 61%, 73%)', index: 2, isAnchor: false }, // purple 2
        { hsl: 'hsl(286, 37%, 72%)', index: 3, isAnchor: false }, // pink 3
        { hsl: 'hsl(334, 50%, 46%)', index: 4, isAnchor: true }, // dark pink 4
      ] as ColorStackBoxModel[],
      finalStack: [
        { hsl: 'hsl(0, 100%, 100%)', index: 0, isAnchor: false },
        { hsl: 'hsl(240, 100%, 75%)', index: 1, isAnchor: false },
        { hsl: 'hsl(0, 100%, 100%)', index: 2, isAnchor: false },
        { hsl: 'hsl(286, 37%, 72%)', index: 3, isAnchor: false },
        { hsl: 'hsl(0, 100%, 100%)', index: 4, isAnchor: false },
      ] as ColorStackBoxModel[],
    };
  },
});
</script>

<style lang="scss" scoped>
.box-group {
  border: 1rem solid black;
}
</style>
