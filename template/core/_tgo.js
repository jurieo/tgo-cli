/*
 * @Author: Jurieo
 * @Date: 2019-08-23 09:58:22
 * @LastEditTime: 2019-08-23 09:59:01
 * @Description: _tgo请求封装
 */
const _tgo = {};
const md5 = require("md5");

_tgo.cardId = "template_ssr_frontend_lwox97wk2dqx";
_tgo.appKey = "99999999";
_tgo.SALIT = "COaFpf69BverHMdhVIBIOPMmwwnRwuxM";
_tgo.md5 = md5;

_tgo.newSign = function() {
  let sign = "";
  sign = _tgo.md5(_tgo.appKey + _tgo.newDate());
  sign = _tgo.md5(sign + _tgo.SALIT);
  sign = _tgo.md5(sign + _tgo.SALIT + _tgo.cardId);
  return sign;
};
_tgo.newDate = function() {
  let day = new Date();
  day = day.getTime();
  day = day.toString();
  day = day.substring(0, 10);
  return day;
};
export default _tgo;
