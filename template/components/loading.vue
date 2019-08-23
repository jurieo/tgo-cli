<template></template>

<script>
export default {
  data() {
    return {
      timer: null
    };
  },
  methods: {
    start() {
      this.timer = setTimeout(() => {
        this.$loading();
      }, 100);
    },
    finish() {
      clearTimeout(this.timer);
      this.$toast.clear();
    },
    loading() {
      this.$loading();
    }
  }
};
</script>
