<template>
<main class="panel-screen">
  <tng-banner class="mission-ops">Mission Ops</tng-banner>

  <div class="nav-tng-large">
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
  <div class="nav-tng-small">
    <tng-block-button class="nav-button-sm" :color="'plum'"></tng-block-button>
    <tng-block-button class="nav-button-md"
      :color="'portage'" :textPosition="'br'">
    </tng-block-button>
    <tng-block-button class="nav-button-lg"></tng-block-button>
    <tng-block-button class="nav-button-md"
      :color="'steel-blue'" :textPosition="'br'">
    </tng-block-button>
    <tng-block-button class="nav-button-md"></tng-block-button>
  </div>

  <div class="screen-1">
    <tng-border-wrap-around :accentX="true">
      <div class="flex">
        <button-screen class="flex-half"></button-screen>
        <text-printer class="flex-half"></text-printer>
      </div>
    </tng-border-wrap-around>
  </div>

  <div class="screen-2">
    <tng-border-wrap-around :color="'portage'" :accentY="'orange'" :sides="'br'">
      <table-screen></table-screen>
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
import TableScreen from '@/components/tng-demos/TableScreen.vue';
import TextPrinter from '@/components/tng-demos/TextPrinter.vue';

export default Vue.extend({
  components: {
    ButtonScreen,
    TableScreen,
    TextPrinter,

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

.nav-tng-large {
  grid-area: 2 / 1 / 4 / 2;
}
.nav-tng-small {
  grid-area: 2 / 1 / 4 / 2;
  display: none;
}

.screen-1 {
  grid-area: 2 / 2 / 3 / 3;
  padding-left: $padding;
  height: 350px;
  box-sizing: border-box;
}

.screen-2 {
  grid-area: 3 / 2 / 4 / 3;
  padding-top: $padding / 2;
  padding-left: $padding;
  height: 350px;
  box-sizing: border-box;
}

.nav-button {
  &-sm {
    height: 80px;
    margin-top: $gap;
  }
  &-md {
    height: 140px;
    margin-top: $gap;
  }
  &-lg {
    height: 180px;
    margin-top: $gap;
  }
}
.flex {
  display: flex;
}
.flex-half {
  flex: 1 1 50%;
  margin: 0 ($padding / 2)
}

@media only screen and (max-width: 899px) {
  .panel-screen {
    padding: $gap;
    grid-template-columns: $overhang-width-sm 1fr;
    grid-template-rows: $banner-height-sm 1fr 1fr;
  }
  .nav-tng-large {
    display: none;
  }
  .nav-tng-small {
    display: initial;
  }
  .screen-1 {
    padding: $padding / 2;
    padding-top: 0;
  }
  .screen-2 {
    padding: $padding / 2;
  }
  .flex {
    flex-direction: column;
  }
}
</style>
