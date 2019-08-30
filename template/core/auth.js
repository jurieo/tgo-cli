/*
 * @Author: Jurieo
 * @Date: 2019-04-28 17:23:44
 * @LastEditTime: 2019-08-30 09:26:32
 * @Description: auth
 */
import _tgo from "./_tgo";
const Axios = require("axios");

const auth = {
  cUrl: process.env.CRT_URL,
  apiUrl: _ => auth.cUrl + "/erp",
  erpImg: process.env.ERP_IMG,
  getTokenAsync() {
    const send = {
      app_key: _tgo.appKey,
      app_secret: _tgo.SALIT,
      devid: _tgo.cardId,
      ts: _tgo.newDate(),
      sign: _tgo.newSign(),
      api: "open.token"
    };
    const url = this.apiUrl();
    return Axios.post(url, send).catch(err => {
      console.log(
        `获取token错误，
        错误信息:${err.message},
        请求地址：${err.config.url},
        请求参数：${err.config.data}`
      );
    });
  }
};

export default auth;
