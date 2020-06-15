import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
      return import('../views/ColorGolf.vue');
    },
  },
  {
    path: '/menu',
    name: 'ColorGolfMenu',
    component: () => {
      return import('../views/ColorGolfMenu.vue');
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
