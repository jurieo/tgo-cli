export default ({ app, store, redirect }) => {
  app.router.beforeEach((to, from, next) => {
    next();
  });

  app.router.afterEach((to, from, next) => {});
};
