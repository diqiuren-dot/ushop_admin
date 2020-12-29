<template lang="">
  <div>
    <v-list @addisshow="addisshow" ref="vlist"  @edit='menuEdit'></v-list>
    <v-add  :obj="obj"  ref="getAdd"></v-add>
  </div>
</template>
<script>
import vList from './components/list'
import vAdd from './components/add'

export default {
  components: {
    vList,
    vAdd
  },
  data () {
    return {
      user: [],
      // 弹窗显示
      obj: {
        isshow: false,
        isadd:false
      }
    }
  },
  methods: {
    addisshow () {
      this.obj.isshow = true
      this.obj.isadd = true
    },
    // 编辑的数据
    menuEdit(id){
      this.obj.isshow = true
      this.obj.isadd = false
      this.$refs.getAdd.getOne(id);
    }
    
  },
  mounted () {}
}
</script>
<style lang=""></style>
