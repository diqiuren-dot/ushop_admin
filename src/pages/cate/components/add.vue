<template lang="">
  <el-dialog
    :title="obj.isadd ? '添加分类' : '修改分类'"
    :visible.sync="obj.isshow"
    @closed="cancel"
  >
    <el-form :model="cateObj" label-width="100px">
      <el-form-item label="上级分类">
        <el-select v-model="cateObj.pid" placeholder="请选择分类">
          <el-option label="--请选择--" value="shanghai" disabled></el-option>
          <el-option label="顶级分类" :value="0">顶级分类</el-option>
          <el-option
            v-for="item in list"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          >
            {{ item.catename }}
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="分类名称" prop="catename">
        <el-input v-model="cateObj.catename"></el-input>
      </el-form-item>

      <el-form-item label="图片" prop="catename" v-if="cateObj.pid !== 0">
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :on-change="changeImg"
        >
          <img v-if="urlImg !== ''" :src="urlImg" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="状态">
        <el-switch
          v-model="cateObj.status"
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
import { cateadd, cateedit, cateinfo } from '../../../utils/http'
import { success, err } from '../../../utils/alert'

import { mapActions, mapGetters } from 'vuex'
export default {
  // obj 控制消失出现的 变量 是个对象
  props: ['obj'],
  computed: {
    ...mapGetters({
      list: 'cate/list'
    })
  },
  data () {
    return {
      // 要传给后端的数据
      cateObj: {
        pid: 0, //上级分类编号
        catename: '', //商品分类名称
        img: null, //img
        status: 1 //状态
      },
      urlImg: ''
    }
  },
  methods: {
    ...mapActions({
      reqList: 'cate/reqList'
    }),
    // 上传图片
    changeImg (e) {
      let file = e.raw
      // 展示页面 不传递后台
      console.log(file)
      this.urlImg = URL.createObjectURL(file)
      this.cateObj.img = file
    },
    checkPromise () {
      return new Promise(reslove => {
        if (this.cateObj.catename == '') {
          err('分类名称不能为空')
        }
        reslove()
      })
    },
    add () {
      this.checkPromise().then(res => {
        cateadd(this.cateObj).then(res => {
          if (res.data.code === 200) {
            this.cancel()
            this.emipty()
            // 刷新页面
            this.reqList()
            success(res.data.msg)
          } else {
            err(res.data.msg)
          }
        })
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
      this.cateObj = {
        pid: 0, //上级分类编号
        catename: '', //商品分类
        img: '', //img
        status: 1 //状态
      }
      this.urlImg = ''
    },
    // 获取一条数据
    getOne (id) {
      cateinfo(id).then(res => {
        res.data.list.id = id
        if (res.data.code === 200) {
          this.cateObj = res.data.list
          this.urlImg = this.$imgUrl + this.cateObj.img
        }
      })
    },
    // 修改
    modify () {
      this.checkPromise().then(res => {
        this.obj.isshow = false
        cateedit(this.cateObj).then(res => {
          if (res.data.code === 200) {
            success(res.data.msg)
            // 刷新页面
            this.reqList()
            this.emipty()
          }
        })
      })
    }
  }
}
</script>
<style scoped>
.demo-ruleForm {
  width: 600px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
