<template lang="">
  <div>
    <v-list :user='user'  @addisshow="addisshow" ref="vlist" @e='obt' @edit='menuEdit'></v-list>
    <v-add :user='user' :obj="obj" @obtain='obt' :ed='ed' ref="getAdd"></v-add>
  </div>
</template>
<script>
import vList from './components/list'
import vAdd from './components/add'

// 获取列表
import { memberlist } from '../../utils/http';
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
      },
      ed:{}
    }
  },
  methods: {
    addisshow () {
      this.obj.isshow = true
      this.obj.isadd = true
    },
    obt(){
      this.obtain();
    },
    //获取列表数据
    obtain () {
      memberlist().then(res => {
        console.log(res);
        this.user = res.data.list
      })
    },
    // 编辑的数据
    menuEdit(id){
      this.obj.isshow = true
      this.obj.isadd = false
      this.$refs.getAdd.getOne(id);
    }
    
  },
  mounted () {
    this.obtain();
  }
}
</script>
<style lang=""></style>
