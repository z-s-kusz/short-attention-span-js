<template>
<main class="panel-screen">
  <tng-banner class="mission-ops">Mission Ops</tng-banner>

  <div class="nav">
    <tng-block-button class="nav-button-sm" :color="'plum'">
      7890
    </tng-block-button>
    <tng-block-button class="nav-button-md" :color="'portage'" :textPosition="'br'">
      3400
    </tng-block-button>
    <tng-block-button class="nav-button-lg">
      Data
    </tng-block-button>
    <tng-block-button class="nav-button-md" :color="'steel-blue'" :textPosition="'br'">
      8518
    </tng-block-button>
    <tng-block-button class="nav-button-md">
      0010
    </tng-block-button>
  </div>

  <div class="screen-1">
    <tng-border-wrap-around :accentX="true">
      <button-screen></button-screen>
    </tng-border-wrap-around>
  </div>

  <div class="screen-2">
    <tng-border-wrap-around :borderColor="'portage'" :accentY="'orange'">
    </tng-border-wrap-around>
  </div>
</main>
</template>
<script lang="ts">
import Vue from 'vue';
import TngBanner from '@/components/tng-panel/TngBanner.vue';
import TngBlockButton from '@/components/tng-panel/TngBlockButton.vue';
import TngBorderWrapAround from '@/components/tng-panel/TngBorderWrapAround.vue';

import ButtonScreen from '@/components/tng-demos/ButtonScreen.vue';

export default Vue.extend({
  components: {
    ButtonScreen,

    TngBanner,
    TngBlockButton,
    TngBorderWrapAround,
  },
});
</script>

<style lang="scss" scoped>
@import '~@/styles/tng.scss';

.panel-screen {
  font-family: 'tng-panel-font', monospace;
  background-color: black;
  padding: $padding;

  display: grid;
  grid-template-columns: $overhang-width 1fr;
  grid-template-rows: $banner-height 1fr 1fr;
}

.mission-ops {
  grid-area: 1 / 1 / 2 / 3;
}

.nav {
  grid-area: 2 / 1 / 4 / 2;
}

.screen-1 {
  grid-area: 2 / 2 / 3 / 3;
  padding-left: $padding;
}

.screen-2 {
  grid-area: 3 / 2 / 4 / 3;
  padding-top: $padding;
  padding-left: $padding;
}

.nav-button {
  &-sm {
    height: 80px;
    padding-top: $gap;
  }
  &-md {
    height: 140px;
    padding-top: $gap;
  }
  &-lg {
    height: 180px;
    padding-top: $gap;
  }
}
</style>
