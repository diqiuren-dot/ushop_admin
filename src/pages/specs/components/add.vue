<template lang="">
  <el-dialog
    :title="obj.isadd ? '规格添加' : '规格修改'"
    :visible.sync="obj.isshow"
    @closed="cancel"
  >
    <el-form :model="Obj" label-width="100px">
      <el-form-item label="规格名称" prop="catename">
        <el-input v-model="Obj.specsname"></el-input>
      </el-form-item>

      <el-form-item
        label="规格属性"
        prop="catename"
        v-for="(item, index) in zInp"
        :key="index"
      >
        <div class="del">
          <el-input v-model="item.value"></el-input>
          <el-button type="primary" class="add" @click="zAdd" v-if="index==0">
            新增规格属性
          </el-button>
          <el-button type="danger" class="rem" @click="zRemove(index)" v-else>
            删除
          </el-button>
        </div>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="Obj.status" :active-value="1" :inactive-value="2">
        </el-switch>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="add" v-if="obj.isadd">添加</el-button>
      <el-button type="primary" @click="modify" v-else>修改</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { specsadd, specsedit, specsinfo } from '../../../utils/http'
import { success, err } from '../../../utils/alert'

import { mapActions, mapGetters } from 'vuex'
export default {
  // obj 控制消失出现的 变量 是个对象
  props: ['obj'],
  computed: {
    ...mapGetters({
      list: 'specs/list',
      // 总数
      total: 'specs/total',
      // 一页的数量
      size:'specs/size'
    })
  },
  data () {
    return {
      // 要传给后端的数据
      Obj: {
        specsname: '', //商品规格名称
        attrs: '[]', //商品规格属性值
        status: 1 //状态
      },
      zInp:[{value:''}]
    }
  },
  methods: {
    ...mapActions({
      reqList: 'specs/reqList',
      reqTotal:'specs/reqTotal',
      changePage:'specs/changePage'
    }),
    // 添加inp
    zAdd(){
      this.zInp.push({value:''})
    },
    // 删除当前项
    zRemove(index){
      this.zInp.splice(index,1)
    },
    // 添加
    add () {
      this.zInp = this.zInp.map(item=>item.value)
      this.Obj.attrs = JSON.stringify(this.zInp)
      specsadd(this.Obj).then(res => {
        console.log(this.Obj,'86打印');
        if (res.data.code === 200) {
          this.cancel()
          this.emipty()
          // 刷新页面
          this.reqList()
          this.reqTotal()
          success(res.data.msg)
        } else {
          err(res.data.msg)
        }
      })
    },
    // 取消
    cancel () {
      if (!this.obj.isadd) {
        this.emipty()
      }
      this.obj.isshow = false
    },
    // 清空
    emipty () {
      this.Obj = {
        specsname: '', //商品规格名称
        attrs: '[]', //商品规格属性值
        status: 1 //状态
      },
      this.zInp = [{value:''}]
    },
    // 获取一条数据
    getOne (id) {
      specsinfo(id).then(res => {
        res.data.list.id = id
        if (res.data.code === 200) {
          // 处理拿回来的数据
          res.data.list[0].attrs = JSON.parse(res.data.list[0].attrs)
          this.zInp = res.data.list[0].attrs.map(item=>({value:item}))
          this.Obj = res.data.list[0]
        }
      })
    },
    // 修改
    modify () {
      this.obj.isshow = false
      // 处理字符串
      this.Obj.attrs = JSON.stringify(this.zInp.map(item=>item.value))
      specsedit(this.Obj).then(res => {
        if (res.data.code === 200) {
          success(res.data.msg)
          // 刷新页面
          this.reqList()
          this.reqTotal()
          this.emipty()
          
        }
      })
    }
  }
}
</script>
<style scoped>
.demo-ruleForm {
  width: 600px;
}

.del {
  display: flex;
}
.del .inp {
  flex: 1;
}
.del .add {
  width: 200px;
}
.del .rem {
  width: 80px;
}
</style>
