// 缓存js
import LRU from "lru-cache";
import Vue from "vue";

const lruCache = new LRU({
  // 缓存队列长度
  max: 2000,
  // 缓存有效期
  maxAge: 1000 * 60 * 15
});

export const cache = {
  get(key) {
    const result = lruCache.get(key);

    if (result) {
      return JSON.parse(result);
    }
    return null;
  },
  set(key, value) {
    if (value) {
      lruCache.set(key, JSON.stringify(value));
      return true;
    }

    return false;
  }
};

Vue.prototype.$cache = cache;
