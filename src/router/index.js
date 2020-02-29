import Vue from 'vue';
import Router from 'vue-router';
import allRoutes from './AllRoutes';
import store from '@/store/store';
import firebase from 'firebase/app';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: allRoutes
});

function getCurrentUser(auth) {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe();
      // do fetch user profile
      if (user) {
        store.dispatch('fetchUserProfile', user).then(() => { resolve(user); });
      } else {
        resolve();
      };
    }, reject);
  });
}

router.beforeEach((to, from, next) => {
  const skipAuth = to.matched.some(x => x.meta.skipAuth);

  if (skipAuth) {
    next();
  } else {
    getCurrentUser(firebase.auth()).then(
      user => {
        if (!user) {
          next('/login');
        } else {
          next();
        }
      }
    ).catch(
      err => {
        next(err);
      }
    );
  }
});

router.onError(err => {
  console.error(err);

  alert(err);
  // go to error page
});

// Existing export
export default router;
