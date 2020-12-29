<template lang="">
  <div>
    <v-add :obj="obj" @e="addlist" ref="add"></v-add>
    <v-list
      @addisshow="addshow"
      :list="list"
      @e="addlist"
      @edit="edit"
      :total="total"
    ></v-list>
    <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize"
    @current-change='changePage'
    >
      </el-pagination>
  </div>
</template>
<script>
import vAdd from './components/add'
import vList from './components/list'
// ajax
import { usercount, userlist } from '../../utils/http'
// import moduleName from '.';
export default {
  components: {
    vAdd,
    vList
  },
  data () {
    return {
      obj: {
        isshow: false,
        isadd: false
      },
      // 总数
      total: 0,
      // 每页多少个
      pageSize:2,
      // 当前页码,
      page:1,
      list: []
    }
  },
  methods: {
    addshow () {
      this.obj.isshow = true
      this.obj.isadd = true
    },
    // 更新列表数据
    addlist () {
      // 获取管理员总数
      usercount().then(res => {
        if (res.data.code === 200) {
          this.total = res.data.list[0].total
          this.obtain()
        }
      })
    },
    obtain () {
      // 获取列表
      userlist({
        size: this.pageSize,
        page: this.page
      }).then(res => {
        if (res.data.code === 200) {
          console.log(res.data.list);
          if (res.data.list === null) {       
            this.page--
            this.obtain()
          }
          this.list = res.data.list
        }
      })
    },
    // 编辑
    edit (id) {
      this.obj.isadd = false
      this.obj.isshow = true
      this.$refs.add.getOne(id)
    },
    // 当前页点击的时候
    changePage(e){
      this.page = e;
      this.addlist()
    }
  },
  mounted () {
    this.addlist()
  }
  
}
</script>
<style scoped>


</style>
