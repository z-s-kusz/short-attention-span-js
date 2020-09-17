<template>
  <div id="app">
    <div id="nav">
      <router-link to="/about">About</router-link>
      <router-link to="/poetry">Poetry</router-link>
      <router-link to="/mgs-carousel">MGS1 Carousel Demo</router-link>
      <router-link to="/Z468-emulator">Z468</router-link>
      <router-link to="/color-golf">Color Golf</router-link>
      <span @click="showModal = true" v-show="showColorGolf">How to Play</span>
      <span @click="toggleBoxIsOpen()" v-show="showPoetry"
        class="poem-colors-toggle" :style="poemColorsToggle">
        &#127752;Poem Colors {{boxIsOpen ? '&uarr;' : '&darr;'}}
      </span>
    </div>
    <div id="palette-picker-menu" v-show="showPoetry">
      <palette-picker v-bind:box-is-open="boxIsOpen"></palette-picker>
    </div>
    <default-modal v-if="showModal" :body="modalBody" :header="modalHeader"
      v-on:close-modal="showModal = false" />
    <router-view :key="$route.path" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import DefaultModal from '@/components/DefaultModal.vue';
import PalettePicker from '@/components/palettes/PalettePicker.vue';
import PaletteHelper from '@/services/palette-helper';

export default Vue.extend({
  components: {
    DefaultModal,
    PalettePicker,
  },
  data() {
    return {
      boxIsOpen: true,
      modalHeader: 'How To Play Color Golf',
      modalBody: `<p>Adjust the 3 color levels to create the color shown.</p>
                  <p>The color you create will appear on the right
                  of the target color after you hit 'enter.'</p>
                  <p>Use your color and the 'diff' to help your next guess.</p>
                  <p>The goal is to get your diff as low as possible.
                  0 distance means you got a perfect match.</p>
                  <p>Getting within the target range or exceeding 9 attempts
                  ends your turn.</p>`,
      showModal: false,
    };
  },
  computed: {
    poemColorsToggle() {
      return {
        color: PaletteHelper.store.colors[2],
        'background-color': PaletteHelper.store.colors[3],
      };
    },
    showColorGolf(): boolean {
      return this.$route.fullPath.includes('/color-golf');
    },
    showPoetry(): boolean {
      return this.$route.fullPath.includes('/poetry');
    },
  },
  methods: {
    toggleBoxIsOpen(): void {
      this.boxIsOpen = !this.boxIsOpen;
    },
  },
});
</script>

<!-- these styles should be the only ones not scoped in this project!
  becuase of that use highly specific css like id -->
<style lang="scss">
@import '~@/styles/main.scss';

body {
  background-color: #333;
  margin: 0;
}
#app {
  font-family: 'Roboto Mono', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-color: #333;
}

#nav {
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;

  & a {
    color: white;
    margin: 0 20px;
  }
  & .router-link-exact-active, span {
    color: #9aecc7;
    cursor: pointer;
    margin: 0 20px;
  }
}

#palette-picker-menu {
  display: flex;
  align-content: center;
  justify-content: center;
}

.poem-colors-toggle {
  border-radius: 4px;
  padding-right: 4px;
  &:active {
    /* important to override inline vue set styles */
    background-color: white !important;
  }
}
</style>
