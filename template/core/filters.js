function pluralize(time, label) {
  if (time === 1) {
    return time + label;
  }
  return time + label;
}
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time);
  if (between < 3600) {
    return pluralize(~~(between / 60), " 分钟前");
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), " 小时前");
  } else {
    return pluralize(~~(between / 86400), " 天前");
  }
}

// 数字 格式化
export function numberFormatter(num, digits) {
  const si = [
    { value: 1e18, symbol: "E" },
    { value: 1e15, symbol: "P" },
    { value: 1e12, symbol: "T" },
    { value: 1e9, symbol: "G" },
    { value: 1e6, symbol: "M" },
    { value: 1e3, symbol: "k" }
  ];
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (
        (num / si[i].value + 0.1)
          .toFixed(digits)
          .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[i].symbol
      );
    }
  }
  return num.toString();
}

// 数字千分位
export function toThousandFilter(num) {
  return (+num || 0)
    .toString()
    .replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ","));
}

// 删除空格
export function trim(str) {
  return str.replace(/(^\s*)(\s*$)/g, "");
}

// 金额格式化，传入单位为分
export function money(num) {
  let value = (num * 1000) / 100000;
  value = parseFloat(value.toFixed(2)).toLocaleString();
  return !value.includes(".") ? value + ".00" : value;
}
// 时间格式化，传入为时间戳
export function time(time, fmt = "yyyy-MM-dd hh:mm:ss") {
  let date = time ? new Date(time) : new Date();
  let o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
}
