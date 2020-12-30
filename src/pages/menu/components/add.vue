<template lang="">
  <el-dialog
    :title="obj.isadd ? '添加菜单' : '修改菜单'"
    :visible.sync="obj.isshow"
    @closed="cancel"
  >
    <el-form :model="menuObj" label-width="100px">
      <el-form-item label="菜单名称" prop="title">
        <el-input v-model="menuObj.title"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单">
        <el-select
          v-model="menuObj.pid"
          placeholder="请选择菜单"
          @change="changePid"
        >
          <el-option label="--请选择--" value="shanghai" disabled></el-option>
          <el-option label="顶级菜单" :value="0">顶级菜单</el-option>
          <el-option
            v-for="item in user"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          >
            {{ item.title }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单类型">
        <el-radio-group v-model="menuObj.type">
          <el-radio :label="1" disabled>目录</el-radio>
          <el-radio :label="2" disabled>菜单</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单图标" v-if="menuObj.type === 1">
        <el-select v-model="menuObj.icon" placeholder="请选择图标">
          <el-option
            v-for="item in iconimg"
            :label="item"
            :value="item"
            :key="item"
          >
            <i :class="item"></i>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单地址" v-else>
        <el-select v-model="menuObj.url" placeholder="请选择菜单地址">
          <el-option label="--请选择--" value="shanghai" disabled></el-option>
          <el-option
            v-for="item in indexRouter"
            :key="item.path"
            :label="item.name"
            :value="'/' + item.path"
          >
            {{ item.name }}
          </el-option>
        </el-select>
      </el-form-item>
      <!-- {{ menuObj }} -->
      <el-form-item label="状态">
        <el-switch
          v-model="menuObj.status"
          :active-value="1"
          :inactive-value="2"
        >
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
import { indexRouter } from '../../../router/index'
import { menuadd, menuedit, menuinfo } from '../../../utils/http'
import { success, err } from '../../../utils/alert'
export default {
  // obj 控制消失出现的 变量 是个对象
  props: ['obj', 'ed', 'user'],
  data () {
    return {
      // 要传给后端的数据
      menuObj: {
        pid: 0,
        title: '',
        icon: '',
        type: 1,
        url: '',
        status: 1
      },
      // icon集合
      iconimg: [
        'el-icon-key',
        'el-icon-user',
        'el-icon-setting',
        'el-icon-video-camera-solid',
        'el-icon-s-flag'
      ],
      // 路由集合
      indexRouter
    }
  },
  methods: {
    add () {
      menuadd(this.menuObj).then(res => {
        if (res.data.code === 200) {
          success(res.data.msg)
          this.cancel()
          this.emipty()
          this.$emit('obtain')
        }else{
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
      this.menuObj = {
        pid: 0,
        title: '',
        icon: '',
        type: 1,
        url: '',
        status: 1
      }
    },
    // 判断是 顶级菜单 还是 系统菜单
    changePid () {
      if (this.menuObj.pid === 0) {
        this.menuObj.type = 1
      } else {
        this.menuObj.type = 2
      }
    },
    // 获取一条数据
    getOne (id) {
      menuinfo(id).then(res => {
        res.data.list.id = id
        if (res.data.code === 200) {
          this.menuObj = res.data.list
        }
      })
    },
    // 修改
    modify () {
      this.obj.isshow = false
      menuedit(this.menuObj).then(res => {
        if (res.data.code === 200) {
          this.$emit('obtain')
          this.emipty()
        }
      })
    }
  }
}
</script>
<style lang="">
.demo-ruleForm {
  width: 600px;
}
</style>
