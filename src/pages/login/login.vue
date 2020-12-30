<template lang="">
  <div class="login">
    <div class="con">
      <h1>登陆</h1>
      <div class="cen">
        <el-form
          :model="user"
          status-icon
          ref="user"
          label-width="40px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="age">
            <el-input v-model.number="user.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              v-model="user.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="lo"
              >提交</el-button
            >
            <el-button @click="">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { login } from '../../utils/http';
import { success,err } from '../../utils/alert';
import {mapGetters,mapActions} from 'vuex';
export default {
  data () {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } 
      }, 1000)
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.user.password !== '') {
          this.$refs.user.validateField('checkPass')
        }
        callback()
      }
    } 
    return {
      user: {
        password: '',
        username: ''
      }
      
    }
  },
  methods: {
    ...mapActions({
      changeUser:'changeUser'
    }),
    lo(){
      login(this.user).then(res=>{
        if (res.data.code == 200) {
          success(res.data.msg)
          this.changeUser(res.data.list)
          this.$router.push('index')
        }else{
          err(res.data.msg)
        }
      }) 
    }
  }
}
</script>
<style lang="">
.login {
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(to right, #533444, #403a53, #2f3d60);
  overflow: hidden;
}
.con {
  width: 400px;
  height: 300px;
  background: #fff;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;

}

.con h1 {
  text-align: center;
  padding: 20px 0;
}
.cen{
  padding: 0 20px;
}
</style>
