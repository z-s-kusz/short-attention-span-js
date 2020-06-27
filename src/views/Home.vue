<template>
  <div class="home">
    <mgs-carousel />
  </div>
</template>

<script>
// @ is an alias to /src
import MgsCarousel from '@/components/mgs-carousel/MgsCarousel.vue';

export default {
  name: 'Home',
  components: {
    MgsCarousel,
  },
};
</script>
