<template>
<section class="container">
  <div class="flex-row">
    <tng-block-button v-for="(button, i) in row1" :key="i"
      class="button-array-item" :color="button.color" :textPosition="button.textPosition"
      :roundSides="button.roundSides">
      {{ button.text }}
    </tng-block-button>
  </div>

  <div class="flex-row">
    <tng-block-button v-for="(button, i) in row2" :key="i"
      class="button-array-item" :color="button.color" :textPosition="button.textPosition"
      :roundSides="button.roundSides">
      {{ button.text }}
    </tng-block-button>
  </div>

  <div class="flex-row">
    <tng-block-button v-for="(button, i) in row3" :key="i"
      class="button-array-item" :color="button.color" :textPosition="button.textPosition"
      :roundSides="button.roundSides">
      {{ button.text }}
    </tng-block-button>
  </div>

  <div class="flex-row">
    <tng-block-button v-for="(button, i) in row4" :key="i"
      class="button-array-item" :color="button.color" :textPosition="button.textPosition"
      :roundSides="button.roundSides">
      {{ button.text }}
    </tng-block-button>
  </div>
</section>
</template>

<script lang="ts">
import Vue from 'vue';
import TngBlockButton from '@/components/tng-panel/TngBlockButton.vue';

const buttonData = [
  {
    text: 'D17',
    active: true,
    color: 'red',
    roundSides: 'left',
    textPosition: 'tr',
  },
  {
    text: 'Hdr',
    active: false,
    color: 'orange',
    roundSides: 'none',
    textPosition: 'tr',
  },
  {
    text: '001',
    active: true,
    color: 'red',
    roundSides: 'none',
    textPosition: 'tr',
  },
  {
    text: '501',
    active: false,
    color: 'orange',
    roundSides: 'right',
    textPosition: 'tr',
  },
  {
    text: 'OLT',
    active: true,
    color: 'light-blue',
    roundSides: 'left',
    textPosition: 'tr',
  },
  {
    text: 'DIR9',
    active: true,
    color: 'orange',
    roundSides: 'none',
    textPosition: 'tr',
  },
  {
    text: 'CD1',
    active: true,
    color: 'steel-blue',
    roundSides: 'none',
    textPosition: 'tr',
  },
  {
    text: 'OUT2-4',
    active: true,
    color: 'plum',
    roundSides: 'right',
    textPosition: 'tr',
  },
  {
    text: '1-200',
    active: false,
    color: 'orange',
    roundSides: 'left',
    textPosition: 'tr',
  },
  {
    text: 'DRK5',
    active: false,
    color: 'orange',
    roundSides: 'none',
    textPosition: 'tr',
  },
  {
    text: '7366',
    active: false,
    color: 'steel-blue',
    roundSides: 'none',
    textPosition: 'tr',
  },
  {
    text: '897',
    active: false,
    color: 'steel-blue',
    roundSides: 'right',
    textPosition: 'tr',
  },
  {
    text: 'D17',
    active: true,
    color: 'plum',
    roundSides: 'left',
    textPosition: 'tr',
  },
  {
    text: 'Hdr',
    active: false,
    color: 'portage',
    roundSides: 'none',
    textPosition: 'tr',
  },
  {
    text: '011',
    active: true,
    color: 'portage',
    roundSides: 'none',
    textPosition: 'tr',
  },
  {
    text: '589001',
    active: false,
    color: 'light-blue',
    roundSides: 'right',
    textPosition: 'tr',
  },
];
export default Vue.extend({
  components: {
    TngBlockButton,
  },
  data() {
    return {
      row1: buttonData.filter((b, i) => i < 4),
      row2: buttonData.filter((b, i) => i >= 4 && i < 8),
      row3: buttonData.filter((b, i) => i >= 8 && i < 12),
      row4: buttonData.filter((b, i) => i >= 12 && i < 16),
    };
  },
});
</script>

<style lang="scss" scoped>
@import '~@/styles/tng.scss';

.container {
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.flex-row {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
}
.button-array-item {
  height: 60px;
  width: 100px;
  margin: 8px;
  flex: 1 1 auto;
}
</style>
