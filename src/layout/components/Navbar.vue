<template>
  <div class="navbar">
    <Sidebar />
    <div class="right-menu">
      <el-image
        :src="avatar"
        fit="cover"
        style="
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 16px;
        "
      />
      <el-dropdown class="avatar-container" trigger="click">
        <span class="el-dropdown-link"
          >{{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import Sidebar from "./Sidebar/index.vue";
import { logout } from "@/api/user";
import { getUserName,getUserAvatar } from "@/utils/auth";
import EventBus from "@/utils/bus";


// import variables from "@/styles/variables.scss";
export default {
  data() {
    return {};
  },
  components: {
    Breadcrumb,
    Hamburger,
    Sidebar,
    
  },
  computed: {
    ...mapGetters(["sidebar"]),
    userName() {
      return getUserName();
    },
    avatar() {
      return getUserAvatar();
    },
  },
  mounted() {},
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    logout() {
      logout().then(() => {
        EventBus.$emit("cancelWS");
        this.$store.dispatch("user/logout");
        this.$router.push(`/login`);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  // position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  z-index: 5;
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: space-between;
  background-color: rgb(46, 43, 87);
  .log {
    font-size: 24px;
    color: #fff;
    float: left;
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      // background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    line-height: 50px;
    display: flex;
    align-items: center;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #fff;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.el-dropdown-menu__item {
  color: #b2ddff;
}
.el-popper[x-placement^="bottom"] {
  margin-top: 5px;
}
.el-dropdown-menu__item--divided {
  border: none;
  margin-top: 0;
}
.el-dropdown-menu__item--divided:before {
  content: "";
  height: 6px;
  display: none;
  margin: 0;
  background-color: transparent;
}
</style>
<style>
.el-popper .popper__arrow {
  display: none !important;
}
.el-dropdown-menu {
  padding: 5px 0;
  background: #2066f9;
  border: none;
}
.el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: #1a52c7;
  color: #fff;
}
</style>
