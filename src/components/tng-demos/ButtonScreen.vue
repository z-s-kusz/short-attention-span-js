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

</section>
</template>

<script lang="ts">
import Vue from 'vue';
import TngBlockButton from '@/components/tng-panel/TngBlockButton.vue';

const buttonData = [
  {
    text: 'D17',
    active: true,
    color: 'orange',
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
    color: 'white',
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
];
export default Vue.extend({
  components: {
    TngBlockButton,
  },
  data() {
    return {
      row1: buttonData.filter((b, i) => i < 4),
      row2: buttonData.filter((b, i) => i >= 4 && i < 8),
      row3: buttonData.filter((b, i) => i >= 8),
    };
  },
});
</script>

<style lang="scss" scoped>
@import '~@/styles/tng.scss';

.container {
  height: 100%;
  box-sizing: border-box;
  padding: $padding;
  overflow: hidden;
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
  width: 160px;
  margin: $padding;
  flex: 1 1 auto;
}
</style>
