
<template>
  <div class="login-container">

    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title text-left" style="display: flex">
          <div class="title-img-wrap">
            <img src="@/assets/logo/loginlogo.png" alt="" >
          </div>
          <div class="title-text display-inline">
            {{ $t('login.title') }}<br>
            <span class="gray-text text-md">{{ $t('login.subTitle') }}</span><br>
            <span class="gray-text text-sm font-weight-normal">Version {{ version }}</span>
          </div>
        </h3>
        <!-- <lang-select class="set-language"/> -->
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginForm.username" :placeholder="$t('login.id')" name="username" type="text" auto-complete="on" class="login-input" @keyup.enter.native="handleLogin" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input :type="passwordType" v-model="loginForm.password" :placeholder="$t('login.password')" name="password" auto-complete="on" class="login-input" @keyup.enter.native="handleLogin" />
      </el-form-item>

      <el-button :loading="loading" class="button" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Log-In</el-button>
    </el-form>
    <modals-container />
    <change-password
      :account-id="loginForm.username"
    />
  </div>
</template>

<script>
import i18n from '@/lang'
// import LangSelect from '@/components/LangSelect'
// import changePassword from './modals/changePassword'
import cookie from '@/utils/cookie'
import ChangePassword from '@/components/Modals/ChangePassword'
// import { refreshToken } from '@/utils/token'

export default {
  name: 'Login',
  components: { ChangePassword },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error(i18n.t('login.validation_error_id')))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error(i18n.t('login.validation_error_password')))
      } else {
        callback()
      }
    }
    return {
      version: process.env.VERSION,
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      passwordType: 'password',
      loading: false,
      redirect: undefined,
      accountInfo: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }

  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.clearCookies()
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      if (!this.loginForm.username && !this.loginForm.password) {
        this.$message.error(this.$t('login.validation_error_input'))
        return false
      }
      const checkParams = {
        'accountPassword': this.loginForm.password,
        'langType': this.$i18n.locale
      }
      this.$http.post(
        '/accounts/checkAccount/' + this.loginForm.username, checkParams
      ).then((response) => {
        this.accountInfo = response.data
        if (!this.accountInfo.accountIdMatched || !this.accountInfo.accountPasswordMatched) {
          this.$message.error(this.$t('login.error_user_info'))
          return
        }
        if (!this.accountInfo.adminAccess) {
          this.$message.error(this.$t('login.admin_access_fail'))
          return
        }

        this.$i18n.locale = this.accountInfo.langType
        this.$store.dispatch('setLanguage', this.accountInfo.langType)

        // 최초 로그인시
        if (this.accountInfo.firstLogin) {
          this.$bvModal.show('change-password')
          // this.$modal.show(changePassword, {
          //   modal: this.$modal,
          //   accountId: this.loginForm.username }, {
          //   width: '600px',
          //   height: '400px',
          //   adaptive: true,
          //   scrollable: true }, {
          //   'closed': (event) => { }
          // })
        } else {
          this.$refs.loginForm.validate(valid => {
            if (valid) {
              this.loading = true
              this.$store.dispatch('Login', this.loginForm).then(() => {
                this.loading = false
                //
                // if (response.data.indexOf('AGENCY') > -1 || response.data.indexOf('SYSTEM') > -1) {
                //   this.$store.dispatch('setActiveMenu', 'AGENCY')
                // } else if (response.data.indexOf('SUPPLIER') > -1) {
                //   this.$store.dispatch('setActiveMenu', 'SUPPLIER')
                // } else {
                //   this.$store.dispatch('setActiveMenu', response.data[0])
                // }
                // // 메뉴 구성
                // this.$store.dispatch('setMenu', response.data.sort().filter(role => role === 'AGENCY' || role === 'SUPPLIER')).then(() => {
                //   this.$router.push({ path: this.redirect || '/' })
                // })
                // refreshToken()
                // this.$router.push({ path: this.redirect || '/' })
              }).catch((error) => {
                this.loading = false
                // 비밀번호가 일치하지 않음
                if (error.response.status === 400) {
                  if (error.response.data.error_description === 'Bad credentials') {
                    this.$message.error(this.$t('login.error_user_info'))
                  }
                } else if (error.response.status === 401) {
                  // 아이디가 존재하지 않음
                  if (error.response.data.error_description === '404 null') {
                    this.$message.error(this.$t('login.error_user_info'))
                  }
                } else {
                  console.log('System Error')
                }
              }).finally(() => {
                setTimeout(() => {
                  // 권한별 메뉴 로드를 위해 화면을 새로고침 한다.
                  location.reload()
                }, 500)
              })
            } else {
              this.$message.error(this.$t('login.validation_error_form'))
              return false
            }
          })
        }
      })
    },
    clearCookies() {
      cookie.removeCookie('Admin-Token')
      // cookie.removeCookie('expirationDate')
      cookie.removeCookie('expires-at')
      cookie.removeCookie('refresh-token')
      cookie.removeCookie('userName')
      cookie.removeCookie('userAuth')
      cookie.removeCookie('userId')
      cookie.removeCookie('activeMenu')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg:#3a1a04;
  $light_gray:#eee;
  $cursor: #fff;

  .login-input {
    height: 47px;
    width: 85%;
    display: inline-block;
    color: $cursor;
    &::first-line {
      color: #999999;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 46px;
      caret-color: $cursor;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#3a1a04;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
      .title-img-wrap {
        width: 100px;
        margin-right: 30px;
        img {
          position: fixed;
          width: 100px;
        }
      }

      .title-text {
        display: inline-block;
      }
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .button {
    background-color: #54bf62;
    border-color: #54bf62;
    color: white;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
