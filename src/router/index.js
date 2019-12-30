import Vue from 'vue';
import Router from 'vue-router';
import allRoutes from './AllRoutes';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: allRoutes
});

// router.beforeEach((to, from, next) => {
//   return next();
// });

// Existing export
export default router;
