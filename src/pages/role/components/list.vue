<template lang="">
  <div>
    <el-main>
      <el-button type="primary" @click="addisshow">添加</el-button>
      <el-table
        :data="list"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        :tree-props="{ children: 'children' }"
      >
        <el-table-column prop="id" label="角色编号" width="100">
        </el-table-column>
        <el-table-column prop="rolename" label="角色名称" width="300">
        </el-table-column>

        <el-table-column prop="name" label="状态">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.status === 1"
              >启用</el-button
            >
            <el-button type="info" v-else>禁用</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="name" label="操作">
          <template slot-scope="scope">
            <div>
              <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>

              <el-button type="danger" @click="remove(scope.row.id)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>
<script>
// ajax
import { roledelete } from '../../../utils/http'
// 提示框
import { success, err } from '../../../utils/alert'
export default {
  props: ['list'],
  methods: {
    addisshow () {
      this.$emit('addisshow')
    },
    // 删除
    remove (id) {
      roledelete(id).then(res => {
        if (res.data.code === 200) {
          success(res.data.msg)
        } else {
          err(res.data.msg)
        }
      })
      // 告诉父级 更新 列表数据
      this.$emit('e')
    },
    // 编辑
    edit(id){
      // 通知父组件 我点了编辑
      this.$emit('edit',id)
    }
  },
  data () {
    return {
      user: []
    }
  },
  mounted () {}
}
</script>
<style lang=""></style>
