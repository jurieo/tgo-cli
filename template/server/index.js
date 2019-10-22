/*
 * @Author: Jurieo
 * @Date: 2019-08-23 11:58:13
 * @LastEditTime: 2019-10-16 10:13:42
 * @Description: 入口文件
 */
const express = require("express");
const consola = require("consola");
const { Nuxt, Builder } = require("nuxt");
const bodyParser = require("body-parser");
const app = express();
const proxy = require("express-http-proxy");
const session = require("express-session");

// redis 模块
// const redis = require("redis");
// const client = redis.createClient();
// const redisStore = require("connect-redis")(session);

/**
 * redisConfig配置说明
 * 
 * host:redis主机名
 * port:默认6379
 * ttl: 过期时间，默认是session.maxAge, 或者是一天
 * disableTTL: 是否允许redis的key有过期时间。这个值优先于ttl
 * db: redis哪个数据库，默认是0
 * pass: 密码
 * prefix: key的前缀，默认是 'sess:'
 * unref: 这个方法作用于底层socket连接，可以在程序没有其他任务后自动退出。
 * serializer: 包含stringify和parse的方法，用于格式化存入redis的值。默认是JSON
 * logErrors: 是否打印redis出错信息，默认false
 * 如果值为true，则会提供一个默认的处理方法（console.error）;
   如果是一个函数，则redis的报错信息由它来处理
   如果值为false，则不处理出错信息
 * 
 */
// 生产环境如需加入redis则解注释
// const redisConfig = {
//   host: "localhost",
//   port: 6379,
//   logError: true,
//   client,
//   ttl: 60 * 60 * 1000 * 12 //单位ms 0.5天
// };

// Import and Set Nuxt.js options
const config = require("../nuxt.config.js");
config.dev = process.env.NODE_ENV !== "prod";

app.use(
  session({
    // store: new redisStore(redisConfig), // (使用redis的存储session)  //本地调试注释此行
    secret: "kNMwTb9ySU2EdXw",
    cookie: {
      maxAge: 60 * 60 * 1000 * 12 //单位ms 0.5天
    },
    resave: true,
    saveUninitialized: false
  })
);
app.use(bodyParser.json({ limit: "2mb" }));
app.use(bodyParser.urlencoded({ limit: "2mb", extended: true }));

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
start().catch(e => {
  console.log(e);
});
