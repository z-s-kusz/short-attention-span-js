import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/color-golf',
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => {
      return import('../views/About.vue'); /* webpackChunkName: "about" */
    },
  },
  {
    path: '/color-golf',
    name: 'ColorGolf',
    component: () => {
      return import('../views/ColorGolfParent.vue');
    },
  },
  {
    path: '/mgs-carousel',
    name: 'MgsCarousel',
    component: () => {
      return import('../views/MgsCarouselParent.vue');
    },
  },
  {
    path: '/poetry',
    name: 'AllAuthors',
    component: () => {
      return import('../views/PoemListing.vue');
    },
  },
  // TODO make poetry and emulators sub routes while still using import()
  {
    path: '/poetry/author/:author',
    name: 'PoemsByAuthor',
    component: () => {
      return import('../views/PoemListing.vue');
    },
  },
  {
    path: '/poetry/poem/:title/author/:author',
    name: 'Poem',
    component: () => {
      return import('../views/Poem.vue');
    },
  },
  {
    path: '/Z468-emulator',
    name: 'Emulator',
    component: () => {
      return import('../views/Emulator.vue');
    },
  },
  {
    path: '/Z468-manual',
    name: 'EmulatorManual',
    component: () => {
      return import('../views/EmulatorManual.vue');
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
