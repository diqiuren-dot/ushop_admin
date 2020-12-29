<template lang="">
  <div>
    <v-add :obj="obj" @e='aa' ref="add"></v-add>
    <v-list @addisshow="addshow" :list="list" @e='obtain' @edit='edit'></v-list>
  </div>
</template>
<script>
import vAdd from './components/add'
import vList from './components/list'

// ajax 获取列表数据
import { rolelist } from '../../utils/http'

export default {
  components: {
    vAdd,
    vList
  },
  data () {
    return {
      obj: {
        // 是否显示
        isshow: false,
        istit:false
      },
      list: []
    }
  },
  methods: {
    addshow () {
      this.obj.istit = true
      this.obj.isshow = true
    },
    obtain () {
      rolelist().then(res => {
        if (res.data.code === 200) {
          this.list = res.data.list
        }
      })
    },
    aa(){
      this.obtain()
    },
    edit(id){
      this.obj.istit = false
      this.obj.isshow = true
      this.$refs.add.info(id)
    }
  },

  mounted () {
    this.obtain();
    
  }
}
</script>
<style lang=""></style>
