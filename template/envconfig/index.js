/*
 * @Author: Jurieo
 * @Date: 2019-08-23 11:58:13
 * @LastEditTime: 2019-09-10 09:50:44
 * @Description: 环境识别
 */
"use strict";

const env = process.env.NODE_ENV;
const envMap = {
  prod: require("./prod.env"),
  test: require("./test.env"),
  dev: require("./dev.env")
};
module.exports = envMap[env] || envMap["prod"];
