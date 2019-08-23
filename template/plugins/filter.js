import Vue from "vue";
import * as filters from "../core/filters"; // global filters

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

export default filters;
