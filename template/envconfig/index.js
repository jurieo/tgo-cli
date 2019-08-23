"use strict";

let config = {};

const env = process.env.NODE_ENV;
const envMap = {
  prod: require("./prod.env"),
  test: require("./test.env"),
  dev: require("./dev.env")
};
config = envMap[env];
module.exports = config;
