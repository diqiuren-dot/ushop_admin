<template>
  <div>
    <el-main>
      <el-button type="primary" @click="addisshow">添加</el-button>
      <el-table
        :data="user"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        :tree-props="{ children: 'children' }"
      >
        <el-table-column prop="id" label="菜单编号" width="100">
        </el-table-column>
        <el-table-column prop="title" label="菜单名称" width="180">
        </el-table-column>
        <el-table-column prop="icon" label="菜单图标">
          <template slot-scope="scope">
            <i :class="scope.row.icon"></i>
          </template>
        </el-table-column>
        <el-table-column prop="url" label="菜单地址"> </el-table-column>

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
            <el-button type="primary" @click="edit(scope.row.id)"
              >编辑</el-button
            >

            <el-button type="danger" @click="remove(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>
<script>
// 删除的
import { menudelete, menulist, menuedit } from '../../../utils/http'
// 获取菜单的 ajax
export default {
  props: ['user'],
  data () {
    return {}
  },
  methods: {
    // 添加弹框的显示
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
          menudelete(id).then(res => {
            if (res.data.code === 200) {
              this.$emit('update')
            }
          })
        })
        .catch(() => {})
    },
    // 编辑
    edit (id) {
      this.$emit('edit', id)
    }
  }
}
</script>
<style lang=""></style>
