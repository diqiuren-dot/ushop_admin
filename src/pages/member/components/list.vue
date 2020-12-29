<template>
  <div>
    <el-main>
      <el-table
        :data="user"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        :tree-props="{ children: 'children' }"
      >
        <el-table-column
          prop="id"
          label="用户编号"
          width="100"
        ></el-table-column>
        <el-table-column prop="nickname" label="昵称" width="300">
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="300">
        </el-table-column>
        

        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.status === 1"
              >启用</el-button
            >
            <el-button type="info" v-else>禁用</el-button>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="edit(scope.row.uid)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>
<script>
// ajax
import { catedelete } from '../../../utils/http'

// 提示框
import { success, err } from '../../../utils/alert'
export default {
  props: ['user', 'total'],
  methods: {
    addisshow () {
      this.$emit('addisshow')
    },
    // 编辑
    edit (id) {
      this.$emit('edit', id)
    }
  },
  data () {
    return {}
  },
  mounted () {}
}
</script>
<style scoped>
.prcImg {
  width: 80px;
  height: 80px;
}
.prcImg img {
  width: 100%;
  height: 100%;
}
</style>
