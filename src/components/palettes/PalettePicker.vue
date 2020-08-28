<template>
  <div class="pill-box">
    <palette-display v-for="palette in palettes" :key="palette.name"
      v-on:click.native="paletteClicked(palette)" v-bind="palette" class="pill">
    </palette-display>
  </div>
</template>

<script>
import PaletteHelper from '@/services/palette-helper';
import PaletteDisplay from '@/components/palettes/PaletteDisplay.vue';

export default {
  name: 'PalettePicker',
  components: {
    PaletteDisplay,
  },
  data() {
    return {
      palettes: PaletteHelper.palettes,
    };
  },
  methods: {
    paletteClicked(event) {
      PaletteHelper.mutations.setColors(event.colors);
      PaletteHelper.mutations.setName(event.name);
    },
  },
};
</script>

<style scope>
.pill-box {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: space-between;
  margin: 4px 36px 24px 36px;
}
.pill {
  flex: 1 1 auto;
}
</style>
