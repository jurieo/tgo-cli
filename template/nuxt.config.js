/*
 * @Author: Jurieo
 * @Date: 2019-07-31 20:02:37
 * @LastEditTime: 2019-10-15 17:19:10
 * @Description: nuxt配置文件
 */
const pkg = require("./package");
const path = require("path");
const config = require("./envconfig");

module.exports = {
  mode: "universal",

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    titleTemplate: `%s - ${pkg.name}`, //
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=0"
      },
      { hid: "description", name: "description", content: pkg.description },
      { httpEquiv: "X-UA-Compatible", name: "IE=edge, chrome=1" },
      { name: "format-detection", content: "telphone=no, email=no" }, //忽略页面中的数字识别为电话，忽略email识别
      { name: "apple-mobile-web-app-status-bar-style", content: "black" }, //苹果工具栏颜色
      { name: "apple-mobile-web-app-capable", content: "yes" }, //启用 WebApp 全屏模式，删除苹果默认的工具栏和菜单栏
      { name: "msapplication-tap-highlight", content: "no" }, //windows phone 点击无高光
      { name: "HandheldFriendly", content: "true" } //针对手持设备优化
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      }
    ]
  },
  loading: "~/components/loading.vue",
  router: {
    // middleware: 'router'
  },
  /*
   ** Global CSS
   */
  css: ["~assets/css/main.css", "normalize.css"],
  env: {
    ERP_IMG: config.ERP_IMG,
    ERP_API: config.ERP_API,
    CRT_URL: config.CRT_URL
  },
  debug: false,
  dev: false,

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~plugins/filter",
    "~plugins/inject",
    "~plugins/axios",
    "~plugins/route",
    "~plugins/vant",
    { src: "~plugins/utils", ssr: false },
    { src: "~plugins/rem", ssr: false },
    { src: "~plugins/vuex-persist", ssr: false },
    { src: "~plugins/lazy-load", ssr: false }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/proxy"
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // prefix: '/erp', //
    // baseURL: "http://localhost:4000",
    proxy: true,
    // prefix: '/', // baseURL
    credentials: true
    // See https://github.com/nuxt-community/axios-module#options
  },
  proxy: {
    "/upload": {
      target: config.ERP_API, //"http://114.55.31.163:8280",//
      changeOrigin: true,
      pathRewrite: {
        "^/upload": ""
      }
    }
  },
  server: {
    port: process.env.PORT,
    host: "localhost"
  },
  build: {
    extend(config, { isDev, isClient }) {
      postcss: [
        require("postcss-pxtorem")({
          rootValue: 10,
          propList: ["*"]
        }),
        require("autoprefixer")({
          browsers: ["Android >= 4.0", "iOS >= 7"]
        })
      ];
    }
  }
};
