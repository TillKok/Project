<template>
  <div class="login-wrap">
    <!-- 给组件加 class，会把这个 class 作用到组件的根元素上 -->
    <div class="form-wrap">
      <div class="form-head">
        <img src="./logo_index.png" alt="黑马头条号">
      </div>
      <el-form class="form-content" ref="form" :model="form" :rules="rules">
        <el-form-item prop="mobile">
          <el-input v-model="form.mobile" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-col :span="14">
            <el-input v-model="form.code" placeholder="验证码"></el-input>
          </el-col>
          <el-col :offset="1" :span="9">
            <el-button
              @click="handleSendCode"
              :disabled="!!codeTimer"
            >{{ codeTimer ? `剩余${codeTimeSeconds}` : '获取验证码'}}</el-button>
          </el-col>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox class="agree-checkbox" v-model="form.agree"></el-checkbox>
          <span class="agree-text">
            我已阅读并同意
            <a href="#">用户协议</a>和
            <a href="#">隐私条款</a>
          </span>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-login" type="primary" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import '@/vendor/gt'
import { saveUser } from '@/utils/auth'
import initGeetest from '@/utils/init-geetest'
const initCodeTimeSeconds = 60
export default {
  name: 'AppLogin',
  data () {
    return {
      form: {
        mobile: '',
        code: '',
        agree: ''
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /\d{6}/, message: '请输入有效的手机号码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: /\d{6}/, message: '请输入有效的验证码', trigger: 'blur' }
        ],
        argee: [
          { required: true, message: '请同意用户协议' },
          { pattern: /true/, message: '请同意用户协议' }
        ]
      },
      codeTimer: null,
      codeTimeSeconds: initCodeTimeSeconds
    }
  },
  methods: {
    handleLogin () {
      this.$refs['form'].validate(valid => {
        if (!valid) {
          return
        }
        this.submitLogin()
      })
    },
    async submitLogin () {
      try {
        const userInfo = await this.$http({
          method: 'POST',
          url: '/authorizations',
          data: this.form
        })
        saveUser(userInfo)
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        this.$router.push({
          name: 'home'
        })
      } catch (err) {
        this.$message.error('登录失败，手机号或验证码错误')
      }
    },
    handleSendCode () {
      this.$refs['form'].validateField('mobile', errorMessage => {
        if (errorMessage.trim().length > 0) {
          return
        }
        this.showGeetst()
      })
    },
    async showGeetst () {
      const { mobile } = this.form
      if (this.captchaObj) {
        return this.captchaObj.verify()
      }
      const data = await this.$http({
        method: 'GET',
        url: `captchas/${mobile} `
      })
      const captchaObj = await initGeetest({
        gt: data.gt,
        challenge: data.challenge,
        offline: !data.success,
        new_captcha: true,
        product: 'bind'
      })
      captchaObj.onReady(() => {
        captchaObj.verify()
      }).onSuccess(async () => {
        const {
          geetest_challenge: challenge,
          geetest_seccode: seccode,
          geetest_validate: validate
        } = captchaObj.getValidate()
        await this.$http({
          method: 'GET',
          url: `/sms/codes/${mobile}`,
          params: {
            challenge,
            validate,
            seccode
          }
        })
        this.codeCountDown()
      })
    },

    codeCountDown () {
      this.codeTimer = window.setInterval(() => {
        this.codeTimeSeconds--
        if (this.codeTimeSeconds <= 0) {
          window.clearInterval(this.codeTimer)
          this.codeTimeSeconds = initCodeTimeSeconds
          this.codeTimer = null
        }
      }, 1000)
    }
  }
}

</script>

<style lang="less" scoped>
.login-wrap {
  height: 100%;
  background-color: #2b3e4a;
  display: flex;
  justify-content: center;
  align-items: center;
  .form-head {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    img {
      width: 200px;
    }
  }
  .form-wrap {
    width: 400px;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    .agree-checkbox {
      margin-right: 10px;
    }
    .agree-text {
      font-size: 16px;
      color: #999;
    }
    .btn-login {
      width: 100%;
    }
  }
}
</style>
