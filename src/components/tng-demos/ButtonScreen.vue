<template>
<section class="container">
  <div class="flex-row">
    <div v-for="(button, i) in row1" :key="i" class="button-array-item">
      <tng-button v-if="button.active"
        :color="button.color" :textPosition="button.textPosition"
        :roundSides="button.roundSides">
        {{ button.text }}
      </tng-button>
      <div v-else></div>
    </div>
  </div>

  <div class="flex-row">
    <div v-for="(button, i) in row2" :key="i" class="button-array-item">
      <tng-button v-if="button.active"
        :color="button.color" :textPosition="button.textPosition"
        :roundSides="button.roundSides">
        {{ button.text }}
      </tng-button>
      <div v-else></div>
    </div>
  </div>

  <div class="flex-row">
    <div v-for="(button, i) in row3" :key="i" class="button-array-item">
      <tng-button v-if="button.active"
        :color="button.color" :textPosition="button.textPosition"
        :roundSides="button.roundSides">
        {{ button.text }}
      </tng-button>
      <div v-else></div>
    </div>
  </div>

  <div class="flex-row">
    <div v-for="(button, i) in row4" :key="i" class="button-array-item">
      <tng-button v-if="button.active"
        :color="button.color" :textPosition="button.textPosition"
        :roundSides="button.roundSides">
        {{ button.text }}
      </tng-button>
      <div v-else></div>
    </div>
  </div>
</section>
</template>

<script lang="ts">
import Vue from 'vue';
import TngButton from '@/components/tng-panel/TngButton.vue';

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
    active: true,
    color: 'orange',
    roundSides: 'none',
    textPosition: 'tr',
  },
  {
    text: '001',
    active: false,
    color: 'red',
    roundSides: 'none',
    textPosition: 'tr',
  },
  {
    text: '501',
    active: true,
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
    text: 'OUT-4',
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
    active: true,
    color: 'orange',
    roundSides: 'none',
    textPosition: 'tr',
  },
  {
    text: '7366',
    active: true,
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
    text: '5801',
    active: true,
    color: 'light-blue',
    roundSides: 'right',
    textPosition: 'tr',
  },
];
export default Vue.extend({
  components: {
    TngButton,
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
@media only screen and (max-width: 899px) {
  .button-array-item {
    height: 50px;
    width: 64px;
    margin: 4px 8px;
  }
}
</style>
