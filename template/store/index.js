/*
 * @Author: Jurieo
 * @Date: 2019-06-13 14:14:07
 * @LastEditTime: 2019-08-19 09:44:56
 * @Description: store
 */
/*
 */
import auth from "../core/auth";

// export const debug = true;
export const state = _ => ({
  token: null,
  shopNum: null,
  userid: null,
  openid: null,
  origin: "wx.qg",
  spcode: "0003",
  sale_spcode: "300",
  sale_supcode: "300100",
  shareid: null,
  saleman_id: null //智慧互联的销售人员id
});

export const mutations = {
  setToken: (state, token) => {
    state.token = token;
  },
  setShopNum: (state, shopNum) => {
    state.shopNum = shopNum * 1 ? shopNum : null;
  },
  setOpenid: (state, openid) => {
    state.openid = openid;
  },
  setUserid: (state, userid) => {
    state.userid = userid;
  },
  setSpcode: (state, spcode) => {
    state.spcode = spcode;
  },
  setSale_spcode: (state, sale_spcode) => {
    state.sale_spcode = sale_spcode;
  },
  setSale_supcode: (state, sale_supcode) => {
    state.sale_supcode = sale_supcode;
  },
  setShareid: (state, shareid) => {
    state.shareid = shareid;
  },
  setSalemanid: (state, saleman_id) => {
    state.saleman_id = saleman_id;
  },
  setOrigin: (state, origin) => {
    state.origin = origin;
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
  },
  async updateShopNum({ commit, state }) {
    let _this = this;
    return new Promise((resolve, reject) => {
      let data = {
        api: "carts.items.skus"
      };
      _this.$axios.post("", data).then(res => {
        let body = res.body;
        commit("setShopNum", body.skus);
        resolve();
      });
    });
  }
  // nuxtServerInit({ dispatch, commit, state }, { req, res }) {
  //   debugger
  //   console.log("nuxtServerInit");
  //   console.log("url:"+req.headers.host);
  // },
};
