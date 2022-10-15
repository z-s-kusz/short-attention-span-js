<template>
  <div class="box-group-container">
    <div class="box-group">
      <color-stack-box-vue v-for="colorBox in startStack" :key="colorBox.index"
        :index="colorBox.index" :hsl="colorBox.hsl"
        :isAnchor="colorBox.isAnchor" :active="colorBox.active"
        :onBoxClick="onStartBoxClick" />
    </div>
    <div class="box-group">
      <color-stack-box-vue v-for="colorBox in finalStack" :key="colorBox.index"
        :index="colorBox.index" :hsl="colorBox.hsl"
        :isAnchor="colorBox.isAnchor" :active="colorBox.active"
        :onBoxClick="onEndBoxClick" />
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
        {
          hsl: 'hsl(227, 59%, 27%)', index: 0, isAnchor: true, active: true,
        }, // dark blue 0
        {
          hsl: 'hsl(240, 100%, 75%)', index: 1, isAnchor: false, active: false,
        }, // blue 1
        {
          hsl: 'hsl(254, 61%, 73%)', index: 2, isAnchor: false, active: false,
        }, // purple 2
        {
          hsl: 'hsl(286, 37%, 72%)', index: 3, isAnchor: false, active: false,
        }, // pink 3
        {
          hsl: 'hsl(334, 50%, 46%)', index: 4, isAnchor: true, active: false,
        }, // dark pink 4
      ] as ColorStackBoxModel[],
      finalStack: [
        {
          hsl: 'hsl(0, 100%, 100%)', index: 0, isAnchor: false, active: false,
        },
        {
          hsl: 'hsl(240, 100%, 75%)', index: 1, isAnchor: false, active: false,
        },
        {
          hsl: 'hsl(0, 100%, 100%)', index: 2, isAnchor: false, active: false,
        },
        {
          hsl: 'hsl(286, 37%, 72%)', index: 3, isAnchor: false, active: false,
        },
        {
          hsl: 'hsl(0, 100%, 100%)', index: 4, isAnchor: false, active: false,
        },
      ] as ColorStackBoxModel[],
      selectedBoxIndex: 0,
    };
  },
  methods: {
    onStartBoxClick(index: number) {
      this.startStack[this.selectedBoxIndex].active = false;
      this.selectedBoxIndex = index;
      this.startStack[index].active = true;
    },
    onEndBoxClick(targetIndex: number) {
      this.finalStack[targetIndex].hsl = this.startStack[this.selectedBoxIndex].hsl;
      this.incrementSelectedBoxIndex();
    },
    incrementSelectedBoxIndex() {
      this.startStack[this.selectedBoxIndex].active = false;

      if (this.selectedBoxIndex < this.startStack.length - 1) {
        this.selectedBoxIndex++;
      } else {
        this.selectedBoxIndex = 0; // need to restart the level
      }
      this.startStack[this.selectedBoxIndex].active = true;
    },
  },
});
</script>

<style lang="scss" scoped>
.box-group-container {
  display: flex;
  justify-content: space-between;
}
.box-group {
  border: 1px solid black;
}
</style>
