import auth from "../core/auth";

// export const debug = true;
export const state = _ => ({
  token: null
});

export const mutations = {
  setToken: (state, token) => {
    state.token = token;
  }
};
export const actions = {
  getToken({ commit }) {
    return new Promise((resolve, reject) => {
      auth
        .getTokenAsync()
        .then(res => {
          const token = res.data.body.token;
          commit("setToken", token);
          resolve(res.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  nuxtServerInit({ dispatch, commit, state }, { req, res }) {
    console.log("nuxtServerInit");
  }
};
