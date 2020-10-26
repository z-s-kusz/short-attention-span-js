<template>
<section>
  <div class="flex-row">
    <tng-block-button v-for="(button, i) in row1" :key="i"
      class="button-array-item" :bgColor="button.color">
      {{ button.text }}
    </tng-block-button>
  </div>

  <div class="flex-row">
    <tng-block-button v-for="(button, i) in row2" :key="i"
      class="button-array-item" :bgColor="button.color">
      {{ button.text }}
    </tng-block-button>
  </div>

  <div class="flex-row">
    <tng-block-button v-for="(button, i) in row3" :key="i"
      class="button-array-item" :bgColor="button.color">
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
    size: 'sm',
  },
  {
    text: 'Hdr',
    active: false,
    color: 'orange',
    size: 'lg',
  },
  {
    text: '001',
    active: true,
    color: 'red',
    size: 'md',
  },
  {
    text: '501',
    active: false,
    color: 'orange',
    size: 'lg',
  },
  {
    text: 'OLT',
    active: true,
    color: 'white',
    size: 'md',
  },
  {
    text: 'DIR9',
    active: true,
    color: 'orange',
    size: 'lg',
  },
  {
    text: 'CD1',
    active: true,
    color: 'steel-blue',
    size: 'sm',
  },
  {
    text: 'OUT2-4',
    active: true,
    color: 'plum',
    size: 'lg',
  },
  {
    text: '1-200',
    active: false,
    color: 'orange',
    size: 'lg',
  },
  {
    text: 'DRK5',
    active: false,
    color: 'orange',
    size: 'lg',
  },
  {
    text: '7366',
    active: false,
    color: 'steel-blue',
    size: 'lg',
  },
  {
    text: '897',
    active: false,
    color: 'steel-blue',
    size: 'lg',
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

.flex-box {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
}
.button-array-item {
  height: 60px;
  width: 160px;
  margin: $padding;
}
</style>
