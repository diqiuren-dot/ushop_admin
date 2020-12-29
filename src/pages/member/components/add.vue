<template lang="">
  <el-dialog title="修改用户" :visible.sync="obj.isshow" @closed="cancel">
    <el-form :model="memberObj" label-width="100px">
      <el-form-item label="手机号" >
        <el-input v-model="memberObj.phone"></el-input>
      </el-form-item>
      <el-form-item label="昵称" >
        <el-input v-model="memberObj.nickname"></el-input>
      </el-form-item>
      <el-form-item label="密码" >
        <el-input  type="password" v-model="memberObj.password"></el-input>
      </el-form-item>

      <el-form-item label="状态">
        <el-switch
          v-model="memberObj.status"
          :active-value="1"
          :inactive-value="2"
        >
        </el-switch>
      </el-form-item>
    </el-form>
    {{memberObj}}
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="modify">修改</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { memberedit, memberinfo } from '../../../utils/http'
import { success, err } from '../../../utils/alert'
export default {
  // obj 控制消失出现的 变量 是个对象
  props: ['obj', 'ed', 'user'],
  data () {
    return {
      // 要传给后端的数据
      memberObj: {
        nickname: '', //昵称
        phone: '', //手机号
        password:"",  //'密码'
        status: 1 //状态
      }
    }
  },
  methods: {
    // 取消
    cancel () {
      if (!this.obj.isadd) {
        this.emipty()
      }
      this.obj.isshow = false
    },
    // 清空
    emipty () {
      this.cateObj = {
        nickname: '', //昵称
        phone: '', //手机号
        password:"",  //'密码'
        status: 1 //状态
      }
    },
    // 获取一条数据
    getOne (id) {
      memberinfo(id).then(res => {
        res.data.list.uid = id
        if (res.data.code === 200) {
          this.memberObj = res.data.list
          this.memberObj.password = ''
        }
      })
    },
    // 修改
    modify () {
      console.log(123);
      this.obj.isshow = false
      memberedit(this.memberObj).then(res => {
        if (res.data.code === 200) {
          success(res.data.msg)
          this.$emit('obtain')
          this.emipty()
        }else{
          console.log(res.data.msg);
        }
      })
    }
  }
}
</script>
<style scoped>
.demo-ruleForm {
  width: 600px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
