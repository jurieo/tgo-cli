/*
 * @Author: Jurieo
 * @Date: 2019-08-09 11:32:38
 * @LastEditTime: 2019-08-30 09:34:11
 * @Description: 启动文件
 */
const express = require("express");
const consola = require("consola");
const { Nuxt, Builder } = require("nuxt");
const bodyParser = require("body-parser");
const app = express();
const proxy = require("express-http-proxy");

// Import and Set Nuxt.js options
const config = require("../nuxt.config.js");
config.dev = process.env.NODE_ENV !== "prod";

app.use(
  bodyParser.json({
    limit: "2mb"
  })
);
app.use(
  bodyParser.urlencoded({
    limit: "2mb",
    extended: true
  })
);

console.log("当前运行环境:" + process.env.NODE_ENV);
if (process.env.NODE_ENV) {
  const config = require("../envconfig");
  console.log(config);
  process.env.ERP_API = config.ERP_API;
  process.env.ERP_IMG = config.ERP_IMG;
  process.env.CRT_URL = config.CRT_URL;
  process.env.PORT = config.PORT;
}

/**
 * 跨域代理
 */
const PROXY_URL = process.env.ERP_API;
app.use("/erp", proxy(PROXY_URL));

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const { host, port } = nuxt.options.server;

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}
start();
