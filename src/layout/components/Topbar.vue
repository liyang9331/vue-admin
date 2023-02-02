<template>
  <div class="top-nav">
    <div class="log">
      <svg-icon
        style="width: 40px; height: 40px; margin-right: 14px"
        icon-class="logo"
      />
      <span>算法管理调度平台</span>

      <!-- <img
        src="../../assets/megvii_logo.png"
        style="width: 118px; height: 29px"
        alt=""
      >
      <div style="display: flex; flex-wrap: wrap; flex-direction: column;margin-left:20px">
        <span style="font-size: 18px; color: #fff;font-weight: bold;">北京旷视科技有限公司</span>
        <span style="font-size: 16px; color: #fff;line-height:30px;font-weight: 500;">算法管理调度平台</span>
      </div> -->
    </div>
    <el-menu
      ref="topMenu"
      :active-text-color="variables.menuActiveText"
      mode="horizontal"
      @select="handleSelect"
    >
      <div v-for="item in routes" :key="item.path" class="nav-item">
        <app-link :to="resolvePath(item)">
          <el-menu-item v-if="!item.hidden" :index="item.path">
            <icon-item v-if="item.meta" :icon="item.meta && item.meta.icon" />
            {{
              item.meta ? item.meta.title : item.children[0].meta.title
            }}</el-menu-item>
        </app-link>
      </div>
    </el-menu>

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img
            v-if="avatar"
            :src="avatar + '?imageView2/1/w/80/h/80'"
            class="user-avatar"
          >
          <img
            v-else
            src="../../assets/image/headPic.png"
            alt=""
            class="user-avatar"
          >
          <div class="user-name">{{ name }}</div>
          <!-- <i class="el-icon-caret-bottom" /> -->
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native="editPwd">
            <span style="display: block">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div
        class="icon"
        style="font-size: 22px; margin-right: 12px"
        @click="toHomePage"
      >
        <svg-icon slot="reference" class="svg" icon-class="homePage" />
      </div>
      <div class="icon" style="font-size: 22px" @click="editPwd">
        <svg-icon
          slot="reference"
          class="svg"
          style="font-size: 22px"
          icon-class="setting"
        />
      </div>
      <el-popover placement="bottom" trigger="click">
        <el-radio-group v-model="theme" @change="editTheme">
          <el-radio label="black">深色</el-radio>
          <el-radio label="white">白色</el-radio>
        </el-radio-group>
        <svg-icon
          slot="reference"
          class="svg"
          style="font-size: 22px; margin-left: 12px"
          icon-class="colorPlate"
        />
      </el-popover>

      <el-divider style="height: 22px" direction="vertical" />
      <div class="icon" @click="logout">
        <svg-icon
          slot="reference"
          class="svg"
          style="font-size: 22px"
          icon-class="logout"
        />
      </div>
    </div>

    <el-dialog
      :title="titleText"
      :visible.sync="dialogVisible"
      width="30%"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      @close="cancel"
    >
      <el-form
        ref="form"
        :model="form"
        status-icon
        :rules="rules"
        class="form-container"
        label-width="100px"
      >
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input
            v-model="form.oldPassword"
            type="password"
            show-password
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input
            v-model="form.newPassword"
            type="password"
            show-password
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            v-model="form.checkPass"
            type="password"
            show-password
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button class="reset-btn" @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppLink from './Sidebar/Link'
import variables from '@/styles/variables.scss'
import { isExternal } from '@/utils/validate'
import IconItem from './Sidebar/Item.vue'
import { updPassword } from '@/api/user'
import { setTheme, getTheme } from '@/utils/auth'
import { topbarFilter } from '@/router/routeGuardInit'
export default {
  name: 'Topbar',
  components: {
    AppLink,
    IconItem
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      titleText: '修改密码',
      dialogVisible: false,
      rules: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          {
            pattern: /^(?![\d]+$)(?![a-z]+$)(?![A-Z]+$)[\da-zA-z]{8,16}$/,
            message: '请输入8-16位密码，至少含大、小写英文、数字其中两种'
          }
        ],
        checkPass: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ]
      },
      form: {
        oldPassword: '',
        newPassword: ''
      },
      theme: getTheme() ? getTheme() : 'white'
    }
  },
  computed: {
    routes() {
      return this.$store.state.permission.routers
    },
    variables() {
      return variables
    },
    sidebar() {
      return this.$store.state.app.sidebar
    },
    ...mapGetters(['avatar', 'name'])
  },
  watch: {
    $route: {
      handler(val, oldVal) {
        console.log('监听route')
        this.initCurrentRoutes()
      },
      // 深度观察监听
      deep: true
    },
    theme: {
      immediate: true,
      handler(newV) {
        if (newV) {
          document.documentElement.setAttribute('theme', newV)
        }
      }
    }
  },
  mounted() {
    this.initCurrentRoutes()
  },
  methods: {
    // 切换主题色
    editTheme(data) {
      if (!document.documentElement.hasAttribute('theme')) {
        document.documentElement.setAttribute('theme', data)
      }
      this.$globalEventBus.$emit('updateTheme', data)
      setTheme(data)
    },
    editPwd() {
      this.dialogVisible = true
    },
    toHomePage() {
      this.$router.push({ path: '/' })
    },
    cancel() {
      this.$refs['form'].resetFields()
      this.dialogVisible = false
    },
    // 修改密码
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          updPassword({ ...this.form }).then((res) => {
            if (res.status == 200) {
              this.$message.success('修改成功')
              this.cancel()
              this.logout()
            } else {
              this.$message.warning(res.message)
            }
          })
        } else {
          return false
        }
      })
    },

    // 通过当前路径找到二级菜单对应项，存到store，用来渲染左侧菜单
    initCurrentRoutes() {
      const { path, meta } = this.$route
      let route = this.routes.find(
        (item) => item.path === '/' + path.split('/')[1]
      )
      // 如果找不到这个路由，说明是首页
      if (!route) {
        route = this.routes.find((item) => item.path === '/')
      }
      this.$store.commit('permission/SET_CURRENT_ROUTES', route)
      this.setSidebarHide(route)
      // 当前激活菜单的 index
      let activeMenu = ''
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        activeMenu = meta.activeMenu
      }
      // 如果是首页，首页高亮
      if (path === '/resources') {
        activeMenu = '/'
      }
      // 如果不是首页，高亮一级菜单
      activeMenu = '/' + path.split('/')[1]
      this.$refs.topMenu.activeIndex = activeMenu
    },
    // 判断该路由是否只有一个子项或者没有子项，如果是，则在一级菜单添加跳转路由
    isOnlyOneChild(item) {
      if (item.children && item.children.length === 1) {
        return true
      }
      return false
    },
    resolvePath(item) {
      // 如果是个完成的url直接返回
      if (isExternal(item.path)) {
        return item.path
      }
      // 如果是首页，就返回重定向路由
      if (item.path === '/') {
        const path = item.redirect
        return path
      }
      // 如果有子项，默认跳转第一个子项路由
      let path = ''
      /**
       * item 路由子项
       * parent 路由父项
       */
      const getDefaultPath = (item, parent) => {
        // 如果path是个外部链接（不建议），直接返回链接，存在个问题：如果是外部链接点击跳转后当前页内容还是上一个路由内容
        if (isExternal(item.path)) {
          path = item.path
          return
        }
        // 第一次需要父项路由拼接，所以只是第一个传parent
        if (parent) {
          path += parent.path + '/' + item.path
        } else {
          path += '/' + item.path
        }
        // 如果还有子项，继续递归
        if (item.children) {
          getDefaultPath(item.children[0])
        }
      }
      if (item.children) {
        getDefaultPath(item.children[0], item)
        return path
      }
      return item.path
    },
    handleSelect(index, indexPath) {
      // 把选中路由的子路由保存store
      const route = this.routes.find((item) => item.path === index)
      // 路由守卫
      topbarFilter(
        { route: route, self: this },
        () => {
          this.$store.commit('permission/SET_CURRENT_ROUTES', route)
          this.setSidebarHide(route)
        }
      )
    },
    // 设置侧边栏的显示和隐藏
    setSidebarHide(route) {
      if (!route.children || route.children.length === 1) {
        this.$store.dispatch('app/toggleSideBarHide', true)
      } else {
        this.$store.dispatch('app/toggleSideBarHide', false)
      }
    },
    logout() {
      this.$store.dispatch('user/logout').then((res) => {
        this.$router.push({ path: '/login' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__title {
  color: var(--public-text-color) !important;
}
.svg {
  color: #fff;
}
</style>
