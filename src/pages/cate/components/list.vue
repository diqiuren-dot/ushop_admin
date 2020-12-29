<template>
  <div>
    <el-main>
      <el-button type="primary" @click="addisshow">添加</el-button>
      <el-table
        :data="list"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        :tree-props="{ children: 'children' }"
      >
        <el-table-column
          prop="id"
          label="分类编号"
          width="100"
        ></el-table-column>
        <el-table-column prop="catename" label="分类名称" width="300">
        </el-table-column>

        <el-table-column label="图片" width="300">
          <template slot-scope="scope">
            <div class="prcImg">
              <img v-if="scope.row.img !=='null'"  :src="$imgUrl + scope.row.img" alt="" />
            </div>
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
  </div>
</template>
<script>
// ajax
import { catedelete } from '../../../utils/http'

// 提示框
import { success, err } from '../../../utils/alert'

// vuex
import {mapGetters,mapActions} from 'vuex';
export default {
  props: ['user', 'total'],
  computed: {
    ...mapGetters({
      'list':'cate/list'
    })
  },
  methods: {
    ...mapActions({
      'reqList':'cate/reqList'
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
          catedelete(id).then(res => {
            if (res.data.code === 200) {
              this.reqList();
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
    return {}
  },
  mounted () {
    this.reqList();
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
