import _tgo from "../core/_tgo";
import auth from "../core/auth";

let stores = null;

export default function({ store, $axios, redirect, error }) {
  const axios = $axios;
  if (!stores) stores = store;

  axios.defaults.baseURL = auth.apiUrl();
  // 请求回调
  axios.onRequest(options => {
    const resd = {
      token: store.state.token,
      openid: store.state.openid,
      user_id: store.state.userid,
      spcode: store.state.spcode,
      sale_spcode: store.state.sale_spcode,
      sale_supcode: store.state.sale_supcode,
      shareid: store.state.shareid,
      saleman_id: store.state.saleman_id,

      app_key: _tgo.appKey,
      app_secret: _tgo.SALIT,
      devid: _tgo.cardId,
      ts: _tgo.newDate(),
      sign: _tgo.newSign(),

      type_id: 3
    };
    const opData = options.data;
    options.data = {
      ...resd,
      ...opData
    };
    return options;
  });
  // 返回回调
  axios.onResponse(
    res => {
      let data = res.data;
      let isdev = process.env.NODE_ENV !== "prod";
      if (!isdev) {
        console.log(`请求数据：${res.config.data}`);
        console.log(`返回数据：${JSON.stringify(data)}`);
      }
      if (data.code == "auth_fail") {
        const opt = data.body[0];
        data = store.dispatch("getToken").then(_ => {
          opt.token = store.state.token;
          return new Promise(resolve => {
            axios.post("", opt).then(res => {
              resolve(res);
            });
          });
        });
      }
      return data;
    },
    err => {
      console.log("返回错误：" + err);
    }
  );

  axios.onError(err => {
    const code = parseInt(err.response && err.response.status);
    console.log(
      `请求发生了错误，
      错误信息:${err.message},
      请求地址：${err.config.url},
      请求参数：${err.config.data}`
    );
    // error({ statusCode: code, message: "页面出错了" });
    // redirect("/400");
  });
}

export { stores };
