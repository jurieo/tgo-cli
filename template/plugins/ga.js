/*
 * @Author: Jurieo
 * @Date: 2019-08-23 10:13:58
 * @LastEditTime: 2019-08-23 10:19:50
 * @Description: 数据统计
 */
import MtaH5 from "./mta_tencent";

/**
 * 数据统计初始化
 * @param {object} store store
 */
function mtaInit(store) {
  MtaH5.init({
    sid: "xxxxx", // 必填，统计用的appid
    cid: "xxxxx", // 如果开启自定义事件，此项目为必填，否则不填
    autoReport: 1, // 是否开启自动上报(1:init完成则上报一次,0:使用pgv方法才上报)
    senseHash: 0, // hash锚点是否进入url统计
    senseQuery: 0, // url参数是否进入url统计
    performanceMonitor: 0, // 是否开启性能监控
    ignoreParams: [], // 开启url参数上报时，可忽略部分参数拼接上报
    ADTAG: store.state.origin || null
  });
}
export default ({ app, store }) => {
  /* 每次路由变更时进行pv统计 */
  app.router.afterEach((to, from) => {
    if (!sessionStorage.isfirst) {
      mtaInit(store);
      sessionStorage.isfirst = 1;
    }

    MtaH5.pgv();
  });
};
