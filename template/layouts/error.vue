<!--
 * @Author: Jurieo
 * @Date: 2019-06-18 18:15:30
 * @LastEditTime: 2019-08-30 09:28:36
 * @Description: 错误页
 -->
<template>
  <div class="container">
    <!-- <div v-if="error.statusCode === 404"> -->
    <img src="../assets/images/public/404.png" width="40%" alt />
    <br />
    <div v-if="isdev" class="errtxt">
      {{ error.message }}
    </div>
    <div v-else class="errtxt">抱歉，页面开小差啦~</div>
    <!-- </div> -->
    <br />
    <nuxt-link to="/" class="tohome">去首页逛逛 >></nuxt-link>
    <br />
  </div>
</template>

<script>
export default {
  props: ["error"],
  data() {
    return {
      isdev: process.env.NODE_ENV !== "prod"
    };
  },
  head() {
    return {
      title: "页面不见了"
    };
  },
  watch: {
    //监听路由变化、关闭确认弹框
    $route() {
      let that = this;
      that.$dialog.close();
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  padding-top: 10vh;
  text-align: center;
  .errtxt {
    padding-top: 3vh;
    font-size: 15px;
    color: #999;
  }
  .tohome {
    font-size: 16px;
    font-weight: 600;
    color: #fe6305;
    margin-bottom: 5vh;
  }
}
</style>


