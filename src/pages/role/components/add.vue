<template lang="">
  <el-dialog :title="obj.istit ? '添加' : '修改'" :visible.sync="obj.isshow" @closed="cancel">
    <el-form :model="addRole">
      <el-form-item label="角色名称" label-width="120px">
        <el-input v-model="addRole.rolename" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色权限" label-width="120px">
        <el-tree
          :data="data"
          show-checkbox
          ref="tree"
          node-key="id"
          :default-expanded-keys="[1, 2, 3]"
          :props="defaultProps"
          @check-change="handleCheckChange"
        >
        </el-tree>
      </el-form-item>
      <el-form-item label="状态" label-width="120px">
        <el-switch
          v-model="addRole.status"
          :active-value="1"
          :inactive-value="2"
        >
        </el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="add" v-if="obj.istit">添加</el-button>
      <el-button type="primary" @click="modify" v-else>修改</el-button>
    </div>
  </el-dialog>
</template>
<script>
// ajax
import { menulist, roleadd, roleinfo, roleedit } from '../../../utils/http'
// 弹框
import { success, err } from '../../../utils/alert'
// 获取一页
export default {
  props: ['obj'],
  data () {
    return {
      addRole: {
        rolename: '',
        menus: [],
        status: 1
      },
      data: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      editId: 0
    }
  },
  mounted () {
    menulist().then(res => {
      if (res.data.code === 200) {
        this.data = res.data.list
      }
    })
  },
  methods: {
    //添加数据
    add () {
      this.obj.isshow = false
      roleadd(this.addRole).then(res => {
        if (res.data.code === 200) {
          success(res.data.msg)
        } else {
          err(res.data.msg)
        }
      })
      // 让父级更新列表数据
      this.$emit('e')
    },

    // 好强
    handleCheckChange () {
      let res = this.$refs.tree.getCheckedNodes()
      this.addRole.menus = JSON.stringify(res.map(item => item.id))
    },

    // 更强
    setCheckedNodes (a) {
      console.log(a);
      this.$refs.tree.setCheckedNodes(a)
    },
    // 修改
    modify () {
      this.obj.isshow = false
      this.addRole.id = this.editId
      console.log(this.addRole)
      roleedit(this.addRole).then(res => {
        if (res.data.code === 200) {
          success(res.data.msg)
          this.$emit('e')
          // 清空
          this.clear()
        } else {
          err(res.data.msg)
        }
      })
    },
    //获取一条数据
    info (id) {
      roleinfo(id).then(res => {
        this.editId = id
        let a = JSON.parse(res.data.list.menus).map(item => ({ id: item }))
        this.setCheckedNodes(a)
        if (res.data.code === 200) {
          this.addRole = res.data.list
        }
      })
    },
    cancel () {
      if (!this.obj.istit) {
         this.clear()
      }
      this.obj.isshow = false
     
    },
    // 清空数据
    clear () {
      this.addRole = {
        rolename: '',
        menus: [],
        status: 1
      }
      // 清空选项
      this.setCheckedNodes(new Array())
    }
  }
}
</script>
<style lang=""></style>
