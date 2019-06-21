<template>
  <div class="login-wrap">
      <div class="form-wrap">
          <div class="form-head">
              <img src="./logo_index.png" alt="黑马头条号">
          </div>
      </div>
    <el-form class="form-content" ref="form" :model="form">
      <el-form-item>
        <el-input v-model="form.mobile">手机号</el-input>
      </el-form-item>
      <el-form-item>
        <el-col :offset="1" :span="9">
         <el-button>获取验证码</el-button>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button class="btn-login" type="primary" @click="onSumbit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AppLogin',
  data () {
    return {
      from: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    onSumbit () {
      console.log('sumbit')
    }
  }
}
</script>

<style lang="less" scoped>
.login-wrap{
    height: 100%;
    background-color: #2b3e4a;
    display: flex;
    justify-content: center;
    align-items:center;
    .form-head{
        display: flex;
        justify-content: center;
        align-items:center;
        margin-bottom: 10px;
        img{
            width: 200px;
        }
        .form-wrap{
            width: 400px;
            background-color:#fff;
            padding:20px;
            border-radius:10px;
            .btn-login{
                width:100%;
            }
        }
    }
}
</style>
