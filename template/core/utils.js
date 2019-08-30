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
    const successFun = function(idata) {
      const data = idata;
      if (data.code == "auth_fail") {
        auth
          .getTokenAsync()
          .then(res => {
            const token = res.data.body.token;
            options.data.token = token;
            $.ajax(options);
          })
          .catch(err => {
            console.log("发生错误了:" + err);
          });
      } else {
        options.success(data);
      }
    };
    const errorFun = function(err) {
      console.log(
        `请求发生错误，
      错误信息:${err.message},
      请求地址：${err.config.url},
      请求参数：${err.config.data}`
      );
      options.error && options.error();
    };

    stores.$axios
      .post("", options.data)
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
