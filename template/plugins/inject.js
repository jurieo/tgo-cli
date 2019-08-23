import { cache } from "../core/cache";
import $ from "../core/utils";

export default ({ store, $axios }, inject) => {
  inject("cache", cache);
  inject("ajax", $.ajax);
};
