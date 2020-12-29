<template lang="">
  <el-dialog
    :title="obj.isadd ? '添加' : '修改'"
    :visible.sync="obj.isshow"
    @closed="cancel"
  >
    <el-form :model="bannerObj" label-width="100px">
      

      <el-form-item label="标题" prop="catename">
        <el-input v-model="bannerObj.title"></el-input>

      </el-form-item>

      <el-form-item label="图片" prop="catename">
        <div class="pic">
          <input type="file" @change='changeImg'>
          <img v-if='urlImg' :src="urlImg">
          <i v-else class="el-icon-plus"></i>
        </div>
      </el-form-item>
      
      <el-form-item label="状态">
        <el-switch
          v-model="bannerObj.status"
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
import { banneradd, banneredit, bannerinfo } from '../../../utils/http'
import {success,err} from '../../../utils/alert';

import path from 'path';
export default {
  // obj 控制消失出现的 变量 是个对象
  props: ['obj', 'ed', 'user'],
  data () {
    return {
      // 要传给后端的数据
      bannerObj: {
        title: '', //商品分类名称
        img: null, //img
        status: 1 //状态
      },
      urlImg: ''
    }
  },
  methods: {
    // 上传图片
    changeImg (e) {
      let file = e.target.files[0]
      // 判断文件大小
      if (file.size > 2 * 1024 * 1024) {
        err("文件大小不能超过2M");
        return;
      }

      console.log(file,'我是file');
      let extname = path.extname(file.name)
      console.log(extname,'我是name');
      let arr = ['.jpg','.png','.gif','.jpeg']
      if (!arr.some(item=>item === extname)) {
        err('请上传图片')
      }
      
      // 展示到页面的地址
      this.urlImg = URL.createObjectURL(file)

      // 传递到后端的数据
      this.bannerObj.img = file
    },
    add () {
      banneradd(this.bannerObj).then(res => {
        if (res.data.code === 200) {
          this.cancel()
          this.emipty()
          this.$emit('obtain')
          success(res.data.msg)
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
      this.bannerObj = {
        title: '', //商品分类名称
        img: null, //img
        status: 1 //状态
      }
    },
    
    getOne (id) {
      bannerinfo(id).then(res => {
        res.data.list.id = id
        if (res.data.code === 200) {
          this.bannerObj = res.data.list
          console.log(this.bannerObj,'102打印');
          this.urlImg = this.$imgUrl + this.bannerObj.img
        }
      })
    },
    // 修改
    modify () {
      this.obj.isshow = false
      console.log(this.bannerObj,'110打印');
      banneredit(this.bannerObj).then(res => {
        if (res.data.code === 200) {
          success(res.data.msg)
          this.$emit('obtain')
          this.emipty()
        }
      })
    }
  }
}
</script>
<style scoped>


.pic{
  width: 120px;
  height: 120px;
  border: 1px dashed skyblue;
  position: relative;
}
.pic img{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.pic input{
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
  opacity: 0;
  cursor: pointer;
}
.pic i{
  font-size: 30px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  color: #ccc;
}
</style>
