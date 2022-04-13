<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo />
    <el-menu
      :default-active="activeMenu"
      :unique-opened="false"
      :collapse-transition="false"
      mode="horizontal"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      class="frame-menu"
    >
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
        ref="list"
      />
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters(["sidebar"]),
    routes() {
      return this.$router.options.routes;
    },
    activeMenu() {
      // const route = this.$route;
      // const { meta, path } = route;
      // // if set path, the sidebar will highlight the path you set
      // if (meta.activeMenu) {
      //   return meta.activeMenu;
      // }
      // console.log('默认展开',path)
      // return path;
      return "['/analysis','/onitoring']"
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
  },
};
</script>

<style lang="scss" scoped>
.has-logo{
  display: flex;
  align-items: center;
}
.frame-menu {
  border: none;
  width: 100% !important;
  white-space: nowrap;
  display: flex;
}
</style>