<template>
  <div class="pill-box">
    <pallete-display v-for="pallete in palletes" :key="pallete.name"
    v-bind="pallete" class="pill">
    </pallete-display>
  </div>
</template>

<script>
import palleteHelper from '@/services/pallete-helper';
import PalleteDisplay from '@/components/pallets/PalleteDisplay.vue';

export default {
  name: 'PalletePicker',
  components: {
    PalleteDisplay,
  },
  data() {
    return {
      palletes: palleteHelper.palletes,
    };
  },
};
</script>

<style>
.pill-box {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: space-between;
}
.pill {
  flex-basis: 1 0 50%;
}
</style>
