import idb from '@/api/idb';

export default {
  state: {
    profiles: [],
    defaultProfile: null,
  },
  mutations: {
    refreshProfiles(state, newProfiles) {
      state.profiles = newProfiles;
    }
  },
  actions: {
    getProfiles({commit}) {
      idb.profiles.getAll().then(
        (profiles) => {
          commit('refreshProfiles', profiles);
        },
        (err) => {
          console.log('failed to get profile');
          console.log(err);
        }
      );
    },
    addNewProfile({dispatch}, newProfile) {
      idb.profiles.add(newProfile).then(
        () => { dispatch('getProfiles'); }
      );
    },
    deleteProfile({dispatch}, profileId) {
      idb.profiles.delete(profileId).then(
        () => { dispatch('getProfiles'); }
      );
    },
  }
};
