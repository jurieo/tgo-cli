/*
 * @Author: Jurieo
 * @Date: 2019-03-26 15:58:38
 * @LastEditTime: 2019-08-23 09:59:09
 * @Description: 路由
 */

export default ({ app, store, redirect }) => {
  app.router.beforeEach((to, from, next) => {
    next();
  });

  app.router.afterEach((to, from, next) => {});
};
