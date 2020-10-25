<template>
<main class="panel-screen">
  <tng-banner class="mission-ops">Mission Ops</tng-banner>
  <div class="nav">
  <tng-block-button class="nav-button-sm" :bgColor="'plum'">
    7890
  </tng-block-button>
  <tng-block-button class="nav-button-md" :bgColor="'portage'">
    3400
  </tng-block-button>
  <tng-block-button class="nav-button-lg">
    Data
  </tng-block-button>
  <tng-block-button class="nav-button-md" :bgColor="'steel-blue'">
    8518
  </tng-block-button>
  <tng-block-button class="nav-button-md">
    0010
  </tng-block-button>
  </div>
</main>
</template>
<script lang="ts">
import Vue from 'vue';
import TngBanner from '@/components/tng-panel/TngBanner.vue';
import TngBlockButton from '@/components/tng-panel/TngBlockButton.vue';

export default Vue.extend({
  components: {
    TngBanner,
    TngBlockButton,
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

.nav-button {
  &-sm {
    height: 80px;
    padding-top: $small-gap;
  }
  &-md {
    height: 140px;
    padding-top: $small-gap;
  }
  &-lg {
    height: 180px;
    padding-top: $small-gap;
  }
}
</style>
