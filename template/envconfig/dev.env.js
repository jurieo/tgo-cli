/*
 * @Author: Jurieo
 * @Date: 2019-07-11 11:36:32
 * @LastEditTime: 2019-08-30 09:27:12
 * @Description: 开发环境api配置
 */
module.exports = {
  ENV_CONFIG: "dev",
  // ERP_API: "http://xxx/",
  // ERP_IMG: "http://xxxx/",
  ERP_API: "http://101.37.67.180:8580/",
  ERP_IMG: "http://101.37.67.180:8580/",
  CRT_URL: `http://${process.env.HOST || "localhost"}:${process.env.PORT ||
    4000}`,
  PORT: 4000
};
