<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <mgs-carousel />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import MgsCarousel from '@/components/mgs-carousel/MgsCarousel.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    MgsCarousel,
  },
};
</script>
