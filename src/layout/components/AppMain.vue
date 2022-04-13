<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
 <!-- <keep-alive include="Dashboard"> -->
      <router-view :key="key" />
    <!-- </keep-alive> -->
    </transition>
  </section>
</template>

<script>

export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  background: #fff;
  border-radius: 8px;
  /*50 = navbar  */
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
