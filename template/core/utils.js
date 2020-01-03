/*
 * @Author: Jurieo
 * @Date: 2019-06-17 11:02:20
 * @LastEditTime: 2019-08-30 09:20:03
 * @Description: 辅助方法
 */
import Vue from "vue";
import { stores } from "../plugins/axios";
import auth from "./auth";
const Cookies = require("js-cookie");

const $ = {
  ajax: options => {
    let successFun = function(idata) {
      const data = idata;
      options.success(data);
    };
    let errorFun = function(idata) {
      // console.log("出错了，请求数据:" + idata.config.data);
      options.error && options.error(idata);
    };

    let method = options.type || "post",
      isGet = options.type == "get" ? 1 : 0,
      params = isGet ? { params: options.data } : options.data;

    stores.$axios[method](options.data.api, params)
      .then(successFun)
      .catch(errorFun);
  },
  removeCookie: key => {
    return Cookies.remove(key);
  },
  getCookie: key => {
    return Cookies.get(key);
  },
  setCookie: (key, value, days = 30) => {
    return Cookies.set(key, value, {
      expires: days
    });
  },
  toJson: string => {
    const obj = {};
    if (string) {
      const cookieArr = string.split("; ");

      cookieArr.forEach(i => {
        const arr = i.split("=");
        obj[arr[0]] = arr[1];
      });
      return obj;
    }
  }
};

Vue.prototype.$erpImg = auth.erpImg;
Vue.prototype.$getUrl = $.getUrl;

export default $;
