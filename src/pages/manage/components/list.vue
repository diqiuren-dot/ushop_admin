<template lang="">
  <div>
    <el-main>
      <!-- 需要竖线边框 就加border 属性 -->
      <el-button type="primary" @click="addisshow">添加</el-button>
      <el-table
        :data="list"
        style="width: 100%;margin-bottom: 20px; height:260px;"
        row-key="id"
        :tree-props="{ children: 'children' }"
      >
        <el-table-column prop="id" label="用户编号" width="100">
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="300">
        </el-table-column>
        <el-table-column prop="rolename" label="所属角色" width="300">
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
              <el-button type="primary" @click="edit(scope.row.uid)"
                >编辑</el-button
              >

              <el-button type="danger" @click="remove(scope.row.uid)"
                >删除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>
<script>
// ajax
import { userdelete } from '../../../utils/http'

// 提示框
import { success, err } from '../../../utils/alert'
export default {
  props: ['list','total'],
  methods: {
    addisshow () {
      this.$emit('addisshow')
    },
    // 删除
    remove (id) {
      this.$confirm('你确定要删除吗?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          //点了删除按钮
          userdelete(id).then(res => {
            if (res.data.code === 200) {
              this.$emit('e')
              success(res.data.msg)
            } else {
              err(res.data.msg)
            }
          })
        })
        .catch(() => {})
    },

    // 编辑
    edit (id) {
      this.$emit('edit', id)
    }
  },
  data () {
    return {
      user: []
    }
  }
}
</script>
<style scoped>
.el-table::before{
  height: 0;
}
</style>
