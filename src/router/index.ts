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
    name: 'Poetry',
    component: () => {
      return import('../views/PoetryParent.vue');
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
