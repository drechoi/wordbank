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
  // const currentUser = await getCurrentUser(firebase.auth());
  if (requiresAuth) {
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
  } else {
    next();
  }
});

router.onError(err => {
  console.error(err);

  alert(err);
  // go to error page
});

// Existing export
export default router;
