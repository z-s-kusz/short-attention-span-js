<template>
  <div class="pill-box" :class="boxIsOpenClass">
    <palette-display v-for="palette in palettes" :key="palette.name"
      v-on:click.native="paletteClicked(palette)" v-bind="palette" class="pill">
    </palette-display>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import PaletteHelper from '@/services/palette-helper';
import PaletteDisplay from '@/components/palettes/PaletteDisplay.vue';

interface Palette {
  colors: string[];
  name: string;
}

export default Vue.extend({
  name: 'PalettePicker',
  components: {
    PaletteDisplay,
  },
  data() {
    return {
      palettes: PaletteHelper.palettes,
    };
  },
  computed: {
    boxIsOpenClass(): string {
      return this.boxIsOpen ? '' : 'close-box';
    },
  },
  props: {
    boxIsOpen: Boolean,
  },
  methods: {
    paletteClicked(palette: Palette) {
      PaletteHelper.mutations.setColors(palette.colors);
      PaletteHelper.mutations.setName(palette.name);
    },
  },
});
</script>

<style lang="scss" scoped>
@import '~@/styles/main.scss';

.pill-box {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: space-between;
  margin: 4px 36px 24px 36px;
  width: 100%;

  &.close-box {
    height: 0;
    overflow: hidden;
    margin: 0;
  }
}

.pill {
  flex: 1 1 auto;
}
</style>
