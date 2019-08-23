/*
 * @Author: Jurieo
 * @Date: 2019-08-23 09:43:48
 * @LastEditTime: 2019-08-23 09:56:35
 * @Description: 支付和客户端处理
 */
import fastclick from "fastclick";
import Vue from "vue";
import wx from "weixin-js-sdk";
import $ from "../core/utils";

fastclick.attach(document.body);

Vue.prototype.$toPay = function(_this, _orderSn, _orderId = null) {
  $.ajax({
    data: {
      api: "sales.pays.web",
      order_sn: _orderSn,
      order_id: _orderId,
      // pay_code: 2010, // 测试
      // pay_code: 2000 // 正式
      pay_code: 4020 // 阿里云
    },
    success(idata) {
      if (idata.code == "success") {
        const params = idata.body.params;
        _this.$doPay(params, _this);
      } else {
        _this.$toast.fail(idata.msg);
      }
    }
  });
};

Vue.prototype.$doPay = function(param, _this) {
  wx.ready(function() {
    wx.chooseWXPay({
      timestamp: param.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
      nonceStr: param.nonceStr, // 支付签名随机串，不长于 32 位
      package: param.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
      signType: "MD5", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
      paySign: param.paySign, // 支付签名
      success(res) {
        if (res.errMsg == "chooseWXPay:ok") {
          _this.$toast.success("支付成功");
          setTimeout((_) => {
            _this.$router.replace("/success"); // 支付成功页面
          }, 1000);
        } else {
          _this.$toast.fail(res.errMsg);
        }
      },
      fail(err) {
        // 处理支付失败逻辑
        _this.$toast.fail("支付失败");
        console.log(err);
      },
      cancel(res) {
        // 处理支付取消逻辑
        _this.$toast.fail("支付取消");
      }
    });
  });
};

Vue.prototype.$loading = function(msg = "加载中") {
  this.$toast.loading({
    mask: false,
    message: msg,
    duration: 0, // 持续展示 toast
    forbidClick: true, // 禁用背景点击
    loadingType: "spinner"
  });
};
