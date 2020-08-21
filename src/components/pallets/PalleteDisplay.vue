<template>
  <div class="container">
    <p class="label">"{{ name }}"</p>
    <svg width="160" viewBox="0 0 18.5 6.5">
      <rect v-for="(color, i) in colors" :key="i"
        :x="i * 3 + 0.25" y="0.25" width="9" height="6" :fill="color"
        :stroke="color" stroke-width="0" ry="3" rx="3" />
      <rect x="0.25" y="0.25" width="18" height="6" fill-opacity="0"
        stroke="white" stroke-width="0.25" ry="3" rx="3" />
    </svg>
</div>
</template>

<script>
export default {
  name: 'PalleteDisplay',
  props: {
    colors: Array,
    name: String,
  },
};
</script>

<style scoped>
.label {
  margin: 6px 0 1px 0;
}
.container:hover {
  font-weight: bold;
  cursor: pointer;
}
</style>
