<template>
  <div>
    <el-main>
      <el-button type="primary" @click="addisshow">添加</el-button>
      <el-table
        :data="list"
        border
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        :tree-props="{ children: 'children' }"
      >
        <el-table-column
          prop="id"
          label="规格编号"
          width="100"
        ></el-table-column>
        <el-table-column prop="specsname" label="规格名称" width="150">
        </el-table-column>
        <el-table-column prop="catename" label="规格属性">
          <template slot-scope="scope">
            <el-tag v-for="(item, index) in scope.row.attrs" :key="index">{{
              item
            }}</el-tag>
          </template>
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
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>
<script>
// ajax
import { specsdelete } from '../../../utils/http'

// 提示框
import { success, err } from '../../../utils/alert'

// vuex
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      list: 'specs/list',
      // 总数
      total: 'specs/total',
      // 一页的数量
      size: 'specs/size'
    })
  },
  methods: {
    ...mapActions({
      reqList: 'specs/reqList',
      reqTotal: 'specs/reqTotal',
      changePage:"specs/changePage"
    }),
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
          specsdelete(id).then(res => {
            if (res.data.code === 200) {
              // 获取列表
              this.reqList()
              // 获取总数
              this.reqTotal()
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
  mounted () {
    // 获取列表
    this.reqList()
    // 获取总数
    this.reqTotal()
  }
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
