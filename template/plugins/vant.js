import Vue from "vue";
import vant from "vant";
import { cache } from "../core/cache";
import $ from "../core/utils";
import "vant/lib/index.css";

export default ({}, inject) => {
  Vue.use(vant);
  inject("cache", cache);
  inject("ajax", $.ajax);
};
