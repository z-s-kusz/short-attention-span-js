<template>
  <div id="app">
    <slide :closeOnNavigation="true" class="slider">
      <router-link to="/about">About</router-link>
      <router-link to="/poetry">Poetry</router-link>
      <router-link to="/mgs-carousel">MGS1 Carousel Demo</router-link>
      <router-link to="/Z468-emulator">Z468</router-link>
      <router-link to="/Z468-manual">Z468 Manual</router-link>
      <router-link to="/color-golf">Color Golf</router-link>
    </slide>

    <div class="nav-lg">
      <router-link to="/about">About</router-link>
      <router-link to="/poetry">Poetry</router-link>
      <router-link to="/mgs-carousel">MGS1 Carousel Demo</router-link>
      <router-link to="/Z468-emulator">Z468</router-link>
      <router-link to="/Z468-manual">Z468 Manual</router-link>
      <router-link to="/color-golf">Color Golf</router-link>
      <span @click="showModal = true" v-show="showColorGolf">How to Play</span>
      <span @click="toggleBoxIsOpen()" v-show="showPoetry"
        class="poem-colors-toggle">
        &#127752;Poem Colors {{ boxIsOpen ? '&uarr;' : '&darr;' }}
      </span>
    </div>
    <div class="nav-sm">
      <span @click="showModal = true" v-show="showColorGolf">How to Play</span>
      <span @click="toggleBoxIsOpen()" v-show="showPoetry">
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
import { Slide } from 'vue-burger-menu';

export default Vue.extend({
  components: {
    DefaultModal,
    PalettePicker,
    Slide,
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
$slider-width: 108px;
$nav-padding: 40px 30px 20px 30px;

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
  height: 100%;
}

.nav-lg {
  margin-left: $slider-width;
  padding: $nav-padding;
  padding-left: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;

  & a {
    color: white;
    margin: 0 20px;
  }

  & .router-link-exact-active, span {
    color: $vue-green;
    cursor: pointer;
    margin: 0 20px;
  }
}

.nav-sm {
  display: none;
  padding: $nav-padding;
  justify-content: center;

  /* keep consistent sizing even without content */
  box-sizing: border-box;
  min-height: 81px;

  & span {
    cursor: pointer;
  }
}

.bm-overlay {
  height: 100%;
}
.bm-burger-bars {
  background-color: white !important;
}
.slider {
  /* nowrap applied to keep the words from changing wrap as drawer opens
  this means links must be less than 20 characters to fit!!! */
  white-space: nowrap;

  & a {
    color: white;
  }

  & .router-link-exact-active, span {
    color: $vue-green;
    cursor: pointer;
  }
}

#palette-picker-menu {
  display: flex;
  align-content: center;
  justify-content: center;
}

@media only screen and (max-width: 899px) {
  .nav-lg {
    display: none;
  }
  .nav-sm {
    display: flex;
  }
}
</style>
