import VuexPersistence from "vuex-persist";
export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      storage: sessionStorage
    }).plugin(store);
  });
};
