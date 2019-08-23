/*
 * @Author: Jurieo
 * @Date: 2019-08-23 09:43:48
 * @LastEditTime: 2019-08-23 10:15:45
 * @Description: 通过腾讯数据分析文件修改而来，新增如果ADTAG存在，则一直传入
 */
function getCookie(a) {
  a = window.localStorage
    ? localStorage.getItem(a) || sessionStorage.getItem(a)
    : (a = document.cookie.match(
        new RegExp("(?:^|;\\s)" + a + "=(.*?)(?:;\\s|$)")
      ))
    ? a[1]
    : "";
  return a;
}

function setCookie(a, b, c) {
  if (window.localStorage)
    try {
      c ? localStorage.setItem(a, b) : sessionStorage.setItem(a, b);
    } catch (e) {}
  else
    document.cookie =
      a +
      "=" +
      b +
      ";path=/;domain=" +
      getTopDomain() +
      (c ? ";expires=" + c : "");
}

function getTopDomain() {
  let a = window.location.host;
  const b = {
    "com.cn": 1,
    "js.cn": 1,
    "net.cn": 1,
    "gov.cn": 1,
    "com.hk": 1,
    "co.nz": 1
  };
  const c = a.split(".");
  c.length > 2 &&
    (a = (b[c.slice(-2).join(".")] ? c.slice(-3) : c.slice(-2)).join("."));
  return a;
}

function parseUrl(a, b) {
  const c = {};
  let e;
  if (void 0 === b) {
    var d = window.location;
    var k = d.host;
    var f = d.pathname;
    var g = d.search.substr(1);
    var h = d.hash;
  } else
    (d =
      b.match(
        /\w+:\/\/((?:[\w-]+\.)+\w+)(?::\d+)?(\/[^\?\\"'\|:<>]*)?(?:\?([^'"\\<>#]*))?(?:#(\w+))?/i
      ) || []),
      (k = d[1]),
      (f = d[2]),
      (g = d[3]),
      (h = d[4]);
  void 0 !== h && (h = h.replace(/"|'|<|>/gi, "M"));
  g &&
    (function() {
      for (let a = g.split("&"), b = 0, e = a.length; b < e; b++)
        if (a[b].includes("=")) {
          let d = a[b].indexOf("=");
          const h = a[b].slice(0, d);
          d = a[b].slice(d + 1);
          c[h] = d;
        }
    })();
  g = (function() {
    if (typeof g === "undefined") return g;
    for (var b = g.split("&"), c = [], e = 0, d = b.length; e < d; e++)
      if (b[e].includes("=")) {
        let h = b[e].indexOf("=");
        const f = b[e].slice(0, h);
        h = b[e].slice(h + 1);
        (a.ignoreParams && a.ignoreParams.includes(f)) || c.push(f + "=" + h);
      }
    return c.join("&");
  })();
  h &&
    (function() {
      for (
        let a = h.indexOf("#") == 0 ? h.substr(1).split("&") : h.split("&"),
          b = 0,
          c = a.length;
        b < c;
        b++
      )
        if (a[b].includes("=")) {
          let d = a[b].indexOf("=");
          const g = a[b].slice(0, d);
          d = a[b].slice(d + 1);
          if (g.toLowerCase() === "adtag") {
            e = d;
            break;
          }
        }
    })();
  return {
    host: k,
    path: f,
    search: g,
    hash: h,
    param: c
  };
}

function getMainInfo(a) {
  const b = parseUrl(a);
  const c = {
    dm: b.host,
    pvi: "",
    si: "",
    url: b.path,
    arg: encodeURIComponent(b.search || "").substr(0, 512),
    ty: 0
  };
  c.pvi = (function() {
    if (a.userReport) {
      var b = getCookie("pgv_uid");
      (b && b == a.user.user_id) ||
        ((c.ty = 1),
        setCookie("pgv_uid", a.user.user_id, "Sun, 18 Jan 2038 00:00:00 GMT;"));
      b = a.user.user_id;
    } else
      (b = getCookie("pgv_pvi")),
        b ||
          ((c.ty = 1),
          (b = getRandom()),
          setCookie("pgv_pvi", b, "Sun, 18 Jan 2038 00:00:00 GMT;"));
    return b;
  })();
  c.si = (function() {
    let a = getCookie("pgv_si");
    a || ((a = getRandom("s")), setCookie("pgv_si", a));
    return a;
  })();
  c.url = (function() {
    let c = b.path;
    a.senseQuery &&
      (c += b.search
        ? "?" + encodeURIComponent(b.search || "").substr(0, 512)
        : "");
    a.senseHash && (c += b.hash ? encodeURIComponent(b.hash) : "");
    return c;
  })();
  return c;
}

function getRandom(a) {
  for (var b = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], c = 10; c > 1; c--) {
    var e = Math.floor(10 * Math.random());
    const d = b[e];
    b[e] = b[c - 1];
    b[c - 1] = d;
  }
  for (c = e = 0; c < 5; c++) e = 10 * e + b[c];
  return (a || "") + (e + "" + +new Date());
}

function getExtInfo(a) {
  return {
    r2: a.sid
  };
}

function joinExtInfo(a) {
  const b = {};
  if (a) {
    const c = [];
    let e;
    for (e in a)
      a.hasOwnProperty(e) &&
        c.push(encodeURIComponent(e) + "=" + encodeURIComponent(a[e]));
    a = c.join(";");
    b.ext = a;
  }
  return b;
}

function getReferer(a) {
  // debugger
  const b = parseUrl(a, document.referrer);
  a = { ...a, ...parseUrl(a) };
  return {
    rdm: b.host,
    rurl: b.path,
    rarg: encodeURIComponent(b.search || "").substr(0, 512),
    adt:
      a.ADTAG ||
      a.param.ADTAG ||
      a.param.adtag ||
      a.param.CKTAG ||
      a.param.cktag ||
      a.param.PTAG ||
      a.param.ptag ||
      a.adtag
  };
}

function getEnvInfo() {
  try {
    const a = navigator;
    const b = screen || {
      width: "",
      height: "",
      colorDepth: ""
    };
    var c = {
      scr: b.width + "x" + b.height,
      scl: b.colorDepth + "-bit",
      lg: (a.language || a.userLanguage).toLowerCase(),
      tz: new Date().getTimezoneOffset() / 60
    };
  } catch (e) {
    return {};
  }
  return c;
}

function xhperf() {
  if (window.performance) {
    var a = window.performance.timing;
    const b = {
      value: a.domainLookupEnd - a.domainLookupStart
    };
    const c = {
      value: a.connectEnd - a.connectStart
    };
    const e = {
      value: a.responseStart - (a.requestStart || a.responseStart + 1)
    };
    let d = a.responseEnd - a.responseStart;
    a.domContentLoadedEventStart ? d < 0 && (d = 0) : (d = -1);
    a = {
      domainLookupTime: b,
      connectTime: c,
      requestTime: e,
      resourcesLoadedTime: {
        value: d
      },
      domParsingTime: {
        value: a.domContentLoadedEventStart
          ? a.domInteractive - a.domLoading
          : -1
      },
      domContentLoadedTime: {
        value: a.domContentLoadedEventStart
          ? a.domContentLoadedEventStart - a.fetchStart
          : -1
      }
    };
  } else a = "";
  return a;
}
export default {
  conf: {},
  version: "2.0.15",
  init(a) {
    let b = {
      sid: 0,
      cid: 0,
      autoReport: 0,
      senseHash: 0,
      senseQuery: 0,
      userReport: 0,
      performanceMonitor: 0,
      ignoreParams: []
    };
    b = {
      ...b,
      ...a
    };
    // debugger
    //   if (a) for (var c in a) a.hasOwnProperty(c) && b.hasOwnProperty(c) && (b[c] = a[c]);
    this.conf = b;
    this.conf.autoReport && this.pgv();
  },
  pgv() {
    const a = this.conf;
    let b = [];
    const c = this.version;
    if (a.sid)
      if (
        !a.userReport ||
        (a.user &&
          a.user.user_id &&
          !parseInt(a.user.user_id, 10) !== conf.user.user_id)
      ) {
        for (
          let e = 0,
            d = [
              getMainInfo(a),
              getReferer(a),
              getExtInfo(a),
              getEnvInfo(),
              joinExtInfo({
                version: c
              }),
              {
                random: +new Date()
              }
            ],
            k = d.length;
          e < k;
          e++
        )
          for (const f in d[e])
            d[e].hasOwnProperty(f) &&
              b.push(f + "=" + (typeof d[e][f] === "undefined" ? "" : d[e][f]));
        const g = function(a) {
          a =
            (document.location.protocol == "https:"
              ? "https://pingtas.qq.com/webview"
              : "http://pingtcss.qq.com") +
            "/pingd?" +
            a.join("&").toLowerCase();
          let b = new Image();
          b.onload = b.onerror = b.onabort = function() {
            b = b.onload = b.onerror = b.onabort = null;
          };
          b.src = a;
        };
        g(b);
        a.performanceMonitor &&
          ((b = function() {
            for (
              var b = xhperf(),
                d = [],
                e = [],
                f = 0,
                k = [
                  getMainInfo(a),
                  {
                    r2: a.cid
                  },
                  getEnvInfo(),
                  {
                    random: +new Date()
                  }
                ],
                m = k.length;
              f < m;
              f++
            )
              for (var l in k[f])
                k[f].hasOwnProperty(l) &&
                  e.push(
                    l + "=" + (typeof k[f][l] === "undefined" ? "" : k[f][l])
                  );
            for (l in b)
              b.hasOwnProperty(l) &&
                (l == "domContentLoadedTime"
                  ? e.push("r3=" + b[l].value)
                  : d.push(b[l].value));
            b = joinExtInfo({
              pfm: d.join("_"),
              version: c
            });
            e.push("ext=" + b.ext);
            g(e);
          }),
          typeof window.performance !== "undefined" &&
          typeof window.performance.timing !== "undefined" &&
          window.performance.timing.loadEventEnd != 0
            ? b()
            : window.attachEvent
            ? window.attachEvent("onload", b)
            : window.addEventListener &&
              window.addEventListener("load", b, !1));
      } else
        console.log(
          "MTA H5\u5206\u6790\u9519\u8bef\u63d0\u793a\uff1a\u60a8\u9009\u62e9\u4e86\u7528\u6237\u7edf\u8ba1uv\uff0c\u8bf7\u8bbe\u7f6e\u4e1a\u52a1\u7684user_id\uff0c\u9700\u4e3aint\u7c7b\u578b"
        );
    else
      console.log(
        "MTA H5\u5206\u6790\u9519\u8bef\u63d0\u793a\uff1a\u60a8\u6ca1\u6709\u8bbe\u7f6esid"
      );
  },
  clickStat(a, b) {
    let c = this.conf;
    let e = [];
    let d = getMainInfo(c);
    const k = getExtInfo(c);
    if (c.cid) {
      d.dm = "taclick";
      d.url = a;
      k.r2 = c.cid;
      k.r5 = (function(a) {
        a = typeof a === "undefined" ? {} : a;
        const b = [];
        let c;
        for (c in a)
          a.hasOwnProperty(c) && b.push(c + "=" + encodeURIComponent(a[c]));
        return b.join(";");
      })(b);
      let f = 0;
      c = [
        d,
        getReferer(c),
        k,
        getEnvInfo(),
        joinExtInfo({
          version: this.version
        }),
        {
          random: +new Date()
        }
      ];
      for (d = c.length; f < d; f++)
        for (const g in c[f])
          c[f].hasOwnProperty(g) &&
            e.push(g + "=" + (typeof c[f][g] === "undefined" ? "" : c[f][g]));
      e =
        (document.location.protocol == "https:"
          ? "https://pingtas.qq.com/webview"
          : "http://pingtcss.qq.com") +
        "/pingd?" +
        e.join("&");
      let h = new Image();
      h.onload = h.onerror = h.onabort = function() {
        h = h.onload = h.onerror = h.onabort = null;
      };
      h.src = e;
    } else
      console.log(
        "MTA H5\u5206\u6790\u9519\u8bef\u63d0\u793a\uff1a\u60a8\u6ca1\u6709\u8bbe\u7f6ecid,\u8bf7\u5230\u7ba1\u7406\u53f0\u5f00\u901a\u81ea\u5b9a\u4e49\u4e8b\u4ef6\u5e76\u66f4\u65b0\u7edf\u8ba1\u4ee3\u7801"
      );
  },
  clickShare(a) {
    let b = this.conf;
    let c = parseUrl(b);
    c = c.param.CKTAG || c.param.ckatg;
    const e = typeof c === "undefined" ? [] : c.split(".");
    if (b.cid) {
      c = [];
      let d = getMainInfo(b);
      const k = getExtInfo(b);
      d.dm = "taclick_share";
      d.url = "mtah5-share-" + a;
      k.r2 = b.cid;
      k.r5 = (function(a, b) {
        const c = [];
        a.length === 2 && a[0] == b && c.push(a[0] + "=" + a[1]);
        return c.join(";");
      })(e, "mtah5_share");
      a = 0;
      b = [
        d,
        getReferer(b),
        k,
        getEnvInfo(),
        joinExtInfo({
          version: this.version
        }),
        {
          random: +new Date()
        }
      ];
      for (d = b.length; a < d; a++)
        for (var f in b[a])
          b[a].hasOwnProperty(f) &&
            c.push(f + "=" + (typeof b[a][f] === "undefined" ? "" : b[a][f]));
      f =
        (document.location.protocol == "https:"
          ? "https://pingtas.qq.com/webview"
          : "http://pingtcss.qq.com") +
        "/pingd?" +
        c.join("&");
      let g = new Image();
      g.onload = g.onerror = g.onabort = function() {
        g = g.onload = g.onerror = g.onabort = null;
      };
      g.src = f;
    } else
      console.log(
        "MTA H5\u5206\u6790\u9519\u8bef\u63d0\u793a\uff1a\u60a8\u6ca1\u6709\u8bbe\u7f6ecid,\u8bf7\u5230\u7ba1\u7406\u53f0\u5f00\u901a\u81ea\u5b9a\u4e49\u4e8b\u4ef6\u5e76\u66f4\u65b0\u7edf\u8ba1\u4ee3\u7801"
      );
  }
};
