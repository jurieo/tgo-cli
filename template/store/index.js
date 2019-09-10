/*
 * @Author: Jurieo
 * @Date: 2019-06-13 14:14:07
 * @LastEditTime: 2019-08-19 09:44:56
 * @Description: store
 */

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
  getToken({ commit, state }) {
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
  }

  // nuxtServerInit({ dispatch, commit, state }, { req, res }) {
  //   console.log("nuxtServerInit");
  //   console.log("url:"+req.headers.host);
  // },
};
