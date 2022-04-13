<template>
  <div class="login-container">
    <div class="text">
      <div class="arrow-box"></div>
      <p>视频智能分析平台</p>
    </div>
    <div class="from-box">
      <div class="loginBox">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          auto-complete="on"
          label-position="left"
        >
          <div class="title-container">
            <p class="title">欢迎登录</p>
            <p class="title titeng">WELCOME LOGIN</p>
          </div>

          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="用户名"
              type="text"
              tabindex="1"
              auto-complete="on"
              style="width: 270px"
            />
          </el-form-item>

          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              style="width: 270px"
              :type="passwordType"
              placeholder="密码"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon
                :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
              />
            </span>
          </el-form-item>

          <el-button
            :loading="loading"
            class="loginbtn"
            style="width: 100%; margin-top: 30px; margin-bottom: 30px"
            @click.native.prevent="handleLogin"
            >登录</el-button
          >
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/user";
import { setToken, setUserName,setUserAvatar } from "@/utils/auth";
export default {
  name: "Login",
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能少于6位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入用户名" },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  created() {
    var that = this;
    document.onkeydown = function (e) {
      var key = window.event.keyCode;
      if (key === 13) {
        that.handleLogin();
      }
    };
  },

  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    async toLogin() {
      const { username, password } = this.loginForm;
      const obj = await login(
        {
          userName: username,
          password: password,
        },
        {
          el: ".el-button",
        }
      );
      if (!obj.token) return;
      this.$store.commit("user/SET_TOKEN", obj.token);
      this.$store.commit("user/SET_USERID", obj.id);
      // this.$store.dispatch("user/getInfo");
      setUserName(obj.realName);
      setUserAvatar(obj.avatarUrl);
      setToken(obj.token);
      this.$router.push({ path: "/" });
    },
    // 登陆
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.toLogin();
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 42px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;

      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.6);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    color: #454545;
    height: 42px;
  }
  .el-form-item__content {
    line-height: 32px;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  // background-color: $bg;
  background-image: url("../../assets/img/logoBgc.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  .text {
    position: absolute;
    top: 15%;
    left: calc(50% - 323px);
    /* display: block; */
    align-items: center;
    display: flex;
    width: 646px;
    height: 122px;
    line-height: 60px;
    font-size: 40px;
    -webkit-transform: translateY(-82px);
    transform: translateY(-82px);
    margin: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-family: "Source Sans Pro", sans-serif;
    p {
    font-size: 48px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #ffffff;
    line-height: 0px;
    }
    .arrow-box {
      width: 83px;
      height: 75px;
      background: #ffffff;
      border-radius: 0px 0px 0px 0px;
      opacity: 1;
      border: 1px solid #707070;
      margin-right: 30px;
    }
  }
  .from-box {
    background-image: url("../../assets/img/logobgcCenter.png");
    background-size: 100%;
    width: 1176px;
    height: 612px;
    position: absolute;
    top: 55%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  .loginBox {
    display: block;
    position: absolute;
    top: 52px;
    right: 55px;
    width: 464px;
    height: 91%;
    background: #fff;
    margin: 0;
    padding: 33px 21px 40px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-family: "Source Sans Pro", sans-serif;
    .loginbtn {
      background: linear-gradient(180deg, #4082ff 0%, #0044c7 100%);
      color: #ffffff;
      font-size: 14px;
      border: none;
      height: 46px;
      border-radius: 8px;
      letter-spacing: 3px;
    }
  }
  .login-form {
    position: relative;
    width: 80%;

    padding: 0px;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #34367E;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 4px 5px 10px 15px;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    margin-top: 15px;
    margin-bottom: 32px;
    .title {
      font-family: "Source Han Sans CN";
      font-size: 24px;
      color: $light_gray;
      margin: 0px auto 10px auto;
      text-align: center;
      color: #34367E;
      letter-spacing: 5px;
    }
    .titeng {
      font-size: 16px;
      letter-spacing: 3px;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 5px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.loginBox .el-input__inner {
  border: 1px solid #0058ff !important;
  background-color: transparent !important;
  border-radius: 20px;
  color: #c7c7c7 !important;
}
.loginBox .el-button--primary {
  background-color: #0058ff;
  border-color: #0058ff;
  border-radius: 20px;
  margin-top: 50px;
}
</style>
<style>
/* 自动填充样式修改 */
.login-container .el-input input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
  box-shadow: 0 0 0px 1000px transparent inset !important;
}
input:-internal-autofill-previewed,
input:-internal-autofill-selected {
  -webkit-text-fill-color: #ffffff !important;
  transition: background-color 5000s ease-in-out 0s !important;
}
</style>
