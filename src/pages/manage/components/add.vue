<template lang="">
  <el-dialog :title="obj.isadd?'添加':'修改'" :visible.sync="obj.isshow" @closed="cancel">
    <el-form :model="userForm">
      <el-form-item label="所属角色" label-width="120px">
        <el-select v-model="userForm.roleid" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.rolename"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="用户名" label-width="120px">
        <el-input v-model.number="userForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="120px">
        <el-input
          type="password"
          v-model="userForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="状态" label-width="120px">
        <el-switch
          v-model="userForm.status"
          :active-value="1"
          :inactive-value="2"
        >
        </el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="add" v-if='obj.isadd'>添加</el-button>
      <el-button type="primary" @click="edit" v-else
        >修改</el-button
      >
    </div>
  </el-dialog>
</template>
<script>
// ajax
import {  rolelist,useradd,userinfo,useredit } from '../../../utils/http'
// 提示框
import { success, err } from '../../../utils/alert'
export default {
  props: ['obj'],
  data () {
    return {
      userForm: {
        roleid: '', //角色编号
        username: '', //管理员名称
        password: '', //密码
        status: 1 //状态
      },
      // 下拉列表数据
      options: []
    }
  },
  methods: {
    cancel () {
      if (!this.obj.isadd) {
        this.empty()
      }
      this.obj.isshow = false
    },
    add () {
      useradd(this.userForm).then(res => {
        if (res.data.code === 200) {
          success(res.data.msg)
          this.cancel()
          // 通知父级 更新 数据
          this.$emit('e')
          this.empty()
        } else {
          err(res.data.msg)
        }
      })
    },
    // 清空数据
    empty () {
      this.userForm = {
        roleid: '', //角色编号
        username: '', //管理员名称
        password: '', //密码
        status: 1 //状态
      }
    },
    getOne(id){
      userinfo(id).then(res=>{
        if (res.data.code === 200) {
          this.userForm = res.data.list
          this.userForm.password = ''
        }
      })
    },
    edit(){
      useredit(this.userForm).then(res=>{
        if (res.data.code === 200) {
          success(res.data.msg)
          this.empty()
          this.cancel()
          this.$emit('e')
        }else{
          err(res.data.code)
        }
      })
    }
  },


  mounted () {
    rolelist().then(res => {
      this.options = res.data.list
    })
  }
}
</script>
<style lang=""></style>
