<template>
  <div class="pill-box">
    <pallete-display v-for="pallete in palletes" :key="pallete.name"
      v-on:click.native="palleteClicked(pallete)" v-bind="pallete" class="pill">
    </pallete-display>
  </div>
</template>

<script>
import PalleteHelper from '@/services/pallete-helper';
import PalleteDisplay from '@/components/pallets/PalleteDisplay.vue';

export default {
  name: 'PalletePicker',
  components: {
    PalleteDisplay,
  },
  data() {
    return {
      palletes: PalleteHelper.palletes,
    };
  },
  methods: {
    palleteClicked(event) {
      PalleteHelper.mutations.setColors(event.colors);
      PalleteHelper.mutations.setName(event.name);
    },
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
  margin: 4px 36px 24px 36px;
}
.pill {
  flex-basis: 1 0 50%;
}
</style>
