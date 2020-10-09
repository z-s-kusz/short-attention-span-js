<template>
<svg width="100%" height="100%" ref="svg" class="button-svg" @click="emitClick()">
  <!-- top row corners -->
  <rect x="0" y="0" width="50%" height="50%" :fill="color3" rx="6" />
  <rect x="50%" y="0" width="50%" height="50%" :fill="color2" rx="6" />

  <!-- bottom row corners -->
  <rect x="0" y="50%" width="50%" height="50%" :fill="color4" rx="6" />
  <rect x="50%" y="50%" width="50%" height="50%" :fill="color0" rx="6" />

  <!-- top row middle -->
  <rect x="12%" y="0" width="22%" height="50%" :fill="color1" />
  <rect x="34%" y="0" width="18%" height="50%" :fill="color2" />
  <rect x="52%" y="0" width="36%" height="50%" :fill="color4" />

  <!-- bottom row middle -->
  <rect x="8%" y="50%" width="40%" height="50%" :fill="color0" />
  <rect x="48%" y="50%" width="14%" height="50%" :fill="color3" />
  <rect x="62%" y="50%" width="22%" height="50%" :fill="color4" />

  <!-- left middle -->
  <rect x="0" y="12%" width="50%" height="44%" :fill="color1" />
  <rect x="0" y="56%" width="50%" height="26%" :fill="color3" />

  <!-- right middle -->
  <rect x="50%" y="30%" width="50%" height="44%" :fill="color1" />

  <!-- disabled darkening overlay -->
  <rect x=0 y = 0 width="100%" height="100%" fill="black" class="disable" />

  <foreignObject x="0" y="0" width="100%" height="100%">
    <button ref="button">
      <slot>Button</slot>
    </button>
  </foreignObject>
</svg>
</template>

<script lang="ts">
import Vue from 'vue';

interface RefElements {
  svg: HTMLElement;
  button: HTMLElement;
}

export default Vue.extend({
  props: {
    color0: {
      type: String,
      default: '#5433FF',
    },
    color1: {
      type: String,
      default: '#2E82E8',
    },
    color2: {
      type: String,
      default: '#40FFF3',
    },
    color3: {
      type: String,
      default: '#2EE862',
    },
    color4: {
      type: String,
      default: '#92FF33',
    },
  },
  data() {
    return {
      buttonWidth: 140,
      buttonBorderSize: 4,
    };
  },
  mounted() {
    this.setSvgWidth();
    this.setSvgHeight();
  },
  methods: {
    emitClick() {
      this.$emit('buttonClick');
    },
    setSvgHeight() {
      const { svg, button }: any = this.$refs;
      const svgHeight = button.clientHeight + this.buttonBorderSize * 2;
      svg.setAttribute('height', svgHeight);
    },
    setSvgWidth() {
      const { svg, button }: any = this.$refs;
      const svgWidth = button.clientWidth + this.buttonBorderSize * 2;
      svg.setAttribute('width', svgWidth);
    },
  },
});
</script>

<style lang="scss" scoped>
.button-svg:hover {
  cursor: pointer;
}
button {
  border: none;
  margin: 4px;
  border-radius: 4px;
  min-width: 160px;
}
.disable {
  display: none;
  fill-opacity: 0.6;
}

</style>
