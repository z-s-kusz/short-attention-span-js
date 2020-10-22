<template>
<!-- transition appear hides pop in becuase javascript sizing -->
<transition name="fade" appear>
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
    <rect x="0" y ="0" width="100%" height="100%" fill="black" class="disable" />

    <foreignObject x="0" y="0" width="100%" height="100%" :id="buttonId" tabindex="-1">
      <button ref="button" class="inner-button">
        <slot>Button</slot>
      </button>
    </foreignObject>

    <!-- shining lights animation -->
    <!-- top light -->
    <circle cx="-10%" cy="2%" :r="buttonBorderSize" :fill="color1">
      <animate attributeName="cx"
        :begin="animationBegin" :end="animationEnd"
        repeatDur="indefinite" dur="5s"
        restart="whenNotActive"
        calcMode="spline" values="2%; 96%"
        keyTimes="0; 1" keySplines=".2 .31 .56 .78" />
      <animate attributeName="fill" repeatDur="indefinite" dur="4.3s"
        :values="`${color1}; white; ${color1}`"/>
    </circle>

    <!-- bottom light -->
    <circle cx="-10%" cy="98%" :r="buttonBorderSize" :fill="color2" id="#test">
      <animate attributeName="cx"
        :begin="animationBegin" :end="animationEnd"
        repeatDur="indefinite" dur="4s"
        restart="whenNotActive"
        calcMode="spline" values="98%; 4%"
        keyTimes="0; 1" keySplines=".26 .66 .62 .89" />
      <animate attributeName="fill" repeatDur="indefinite" dur="3.1s"
        :values="`${color2}; white; ${color2}`"/>
    </circle>

  </svg>
</transition>

<!--
  shining lights info becuase I know I will need it later:
  *begin and end tell animation when to start and stop. each needs a target id
    which is why we set them via vuejs
  *repeatDur: allows animation to loop infinitly.
  *restart="whenNotActive": keeps animation from restarting when
    user mouses over and clicks.
    becuase clicking focuses it, and focusing it triggers a start.
  *calc-mode="spline" along with values, keyTimes and keySplines allows
    anmating with cubic-bezier curves.
  *values are what we are animating to/from.
  -->
  <!-- TODO I would like the shining lights animations to have
    some pauses between instead of constantly going -->
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
    buttonId: {
      type: String,
      required: true,
      default: 'id',
      validator(value) {
        if (value.includes('-')) {
          console.error('buttonId can\'t contain minus "-" as it breaks the svg '
          + 'event selectors. camelCase values are recomended.');
          return false;
        }
        return true;
      },
    },
    // TODO prevent twinkle effect while disabled
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      buttonWidth: 140,
      buttonBorderSize: 4,
    };
  },
  computed: {
    animationBegin(): string {
      return `${this.buttonId}.mouseenter; ${this.buttonId}.focusin`;
    },
    animationEnd(): string {
      return `${this.buttonId}.mouseleave; ${this.buttonId}.focusout`;
    },
  },
  mounted() {
    this.setSvgWidth();
    this.setSvgHeight();
  },
  methods: {
    emitClick() {
      if (!this.disabled) this.$emit('buttonClick');
    },
    setSvgHeight() {
      const { svg, button }: any = this.$refs;
      const svgHeight = button.clientHeight + this.buttonBorderSize * 2;
      // setTimeout is to asure size is locked when setting attribute
      // ran into inconsistent sizing issues without it
      setTimeout(() => {
        svg.setAttribute('height', svgHeight);
      }, 0);
    },
    setSvgWidth() {
      const { svg, button }: any = this.$refs;
      const svgWidth = button.clientWidth + this.buttonBorderSize * 2;
      setTimeout(() => {
        svg.setAttribute('width', svgWidth);
      }, 0);
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
// override chrome focus styles on button and svg
:focus {
  outline: none !important;
}
.inner-button:focus {
  background-color: #333;
}
.fade-enter-active {
  transition: opacity 400ms;
}
.fade-enter {
  opacity: 0;
}
</style>
