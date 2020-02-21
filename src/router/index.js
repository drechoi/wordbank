import Vue from 'vue';
import Router from 'vue-router';
import allRoutes from './AllRoutes';
import firebase from 'firebase';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: allRoutes
});

function getCurrentUser(auth) {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
}

router.beforeEach(async(to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  // const currentUser = await firebase.getCurrentUser();
  const currentUser = await getCurrentUser(firebase.auth());

  if (requiresAuth && !currentUser) {
    next('/login');
  // } else if (requiresAuth && currentUser) {
  //   next();
  } else {
    next();
  }

  // return next();
});

// Existing export
export default router;
