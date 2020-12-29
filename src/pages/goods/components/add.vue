<template lang="">
  <el-dialog
    :title="obj.isadd ? '商品添加' : '商品修改'"
    :visible.sync="obj.isshow"
    @closed="cancel"
    @opened="opened"
  >
    <el-form :model="Obj" label-width="100px">
      {{ Obj }}
      <!-- 一级分类 -->
      <el-form-item label="一级分类">
        <el-select v-model="Obj.first_cateid" @change="changeFirst">
          <el-option label="--请选择--" value="" disabled></el-option>
          <el-option
            v-for="item in cateList"
            :label="item.catename"
            :key="item.id"
            :value="item.id"
            >{{ item.catename }}</el-option
          >
        </el-select>
      </el-form-item>
      <!-- 二级分类 -->
      <el-form-item label="二级分类">
        <el-select v-model="Obj.second_cateid">
          <el-option label="--请选择--" value="" disabled></el-option>
          <el-option
            v-for="item in secondList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
            >{{ item.catename }}</el-option
          >
        </el-select>
      </el-form-item>
      <!-- 商品名称 -->
      <el-form-item label="商品名称" prop="catename">
        <el-input v-model="Obj.goodsname"></el-input>
      </el-form-item>
      <!-- 价格 -->
      <el-form-item label="价格" prop="catename">
        <el-input v-model="Obj.price"></el-input>
      </el-form-item>
      <!-- 市场价格 -->
      <el-form-item label="市场价格" prop="catename">
        <el-input v-model="Obj.market_price"></el-input>
      </el-form-item>
      <!-- 图片 -->
      <el-form-item label="图片" prop="catename">
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
      <!-- 商品规格 -->
      <el-form-item label="商品规格">
        <el-select
          v-model="Obj.specsid"
          placeholder="请选择"
          @change="cheangeSpecs"
        >
          <el-option label="--请选择--" value="" disabled></el-option>
          <el-option
            v-for="item in specsList"
            :key="item.id"
            :label="item.specsname"
            :value="item.id"
          >
            {{ item.specsname }}
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 规格属性 -->
      <el-form-item label="规格属性">
        <!-- 多选 -->
        <el-select v-model="Obj.specsattr" multiple placeholder="请选择">
          <el-option label="--请选择--" value="" disabled></el-option>
          <el-option
            v-for="item in specsAttr"
            :key="item"
            :label="item"
            :value="item"
            >{{ item }}</el-option
          >
        </el-select>
      </el-form-item>
      <!-- 是否新品 -->
      <el-form-item label="是否新品">
        <el-radio v-model="Obj.isnew" :label="1">是</el-radio>
        <el-radio v-model="Obj.isnew" :label="2">否</el-radio>
      </el-form-item>
      <!-- 是否热卖 -->
      <el-form-item label="是否热卖">
        <el-radio v-model="Obj.ishot" :label="1">是</el-radio>
        <el-radio v-model="Obj.ishot" :label="2">否</el-radio>
      </el-form-item>

      <!-- 状态 -->
      <el-form-item label="状态">
        <el-switch v-model="Obj.status" :active-value="1" :inactive-value="2">
        </el-switch>
      </el-form-item>

      <!-- 商品描述 -->
      <el-form-item label="状态">
        <!-- 富文本编辑器 -->
        <div id="editor" v-if="obj.isshow"></div>
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
// 富文本编辑器
import E from 'wangeditor'

import {
  specsinfo,
  catelist,
  goodsadd,
  goodsedit,
  goodsinfo
} from '../../../utils/http'
import { success, err } from '../../../utils/alert'

import { mapActions, mapGetters } from 'vuex'
export default {
  // obj 控制消失出现的 变量 是个对象
  props: ['obj'],
  computed: {
    ...mapGetters({
      // 分类list
      cateList: 'cate/list',
      // 商品规格的list
      specsList: 'specs/list',
      // 商品列表数据
      goodsList: 'goods/list',
      // 总数
      total: 'goods/total',
      // 一页的数量
      size: 'goods/size'
    })
  },
  data () {
    return {
      // 要传给后端的数据
      Obj: {
        first_cateid: '', //一级分类编号
        second_cateid: '', //二级分类编号
        goodsname: '', //商品名称
        price: '', //商品价格
        market_price: '', //市场价格,
        img: null,
        description: '', //商品描述
        specsid: '', //商品规格编号
        specsattr: [], //商品规格属性
        isnew: 1, //是否新品     1-是 2-否
        ishot: 1, //是否热卖推荐 1-是 2-否
        status: 1 //状态
      },
      urlImg: '',
      // 二级分类列表
      secondList: [],
      // 商品规格二级列表
      specsAttr: [],
      editor: {}
    }
  },
  methods: {
    ...mapActions({
      // 分类列表获取
      reqCateList: 'cate/reqList',
      // 规格列表获取
      reqSpecsList: 'specs/reqList',
      // 商品列表
      reqList: 'goods/reqList',
      // 总数
      reqTotal: 'goods/reqTotal',
      changePage: 'goods/changePage'
    }),
    // 创建富文本编辑器
    opened () {
      this.editor = new E('#editor')
      this.editor.create()
    },
    // 图片处理
    changeImg (e) {
      let file = e.raw
      // 展示页面 不传递后台
      console.log(file)
      this.urlImg = URL.createObjectURL(file)
      this.Obj.img = file
    },

    // 修改了一级分类
    changeFirst () {
      this.Obj.second_cateid = ''
      this.getSecondList()
    },

    // 根据一级分类计算出二级分类的List
    getSecondList () {
      catelist().then(res => {
        console.log(this.Obj.first_cateid,'我是id号');
        console.log(res.data.list);
        if (res.data.code == 200) {
          let a = res.data.list.find(item => {
            return (item.id === this.Obj.first_cateid)
          }).children
          console.log(a);
          this.secondList = a
        }
      })
    },

    //商品规格
    cheangeSpecs () {
      this.Obj.specsattr = []
      this.getSpecsList()
    },
    getSpecsList () {
      specsinfo(this.Obj.specsid).then(res => {
        this.specsAttr = JSON.parse(res.data.list[0].attrs)
      })
    },
    // 添加
    add () {
      // 处理数据
      this.Obj.description = this.editor.txt.html()
      let data = {
        ...this.Obj,
        specsattr: JSON.stringify(this.Obj.specsattr)
      }

      goodsadd(this.Obj).then(res => {
        console.log(this.Obj, '86打印')
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
      ;(this.Obj = {
        first_cateid: '', //一级分类编号
        second_cateid: '', //二级分类编号
        goodsname: '', //商品名称
        price: '', //商品价格
        market_price: '', //市场价格,
        img: null,
        description: '', //商品描述
        specsid: '', //商品规格编号
        specsattr: '[]', //商品规格属性
        isnew: 1, //是否新品     1-是 2-否
        ishot: 1, //是否热卖推荐 1-是 2-否
        status: 1 //状态
      }),
        (this.urlImg = '')
    },
    // 获取一条数据
    getOne (id) {
      goodsinfo(id).then(res => {
        res.data.list.id = id
        if (res.data.code === 200) {
          setTimeout(() => {
            this.Obj = res.data.list
            this.Obj.specsattr = this.Obj.specsattr.split(',')
            this.urlImg = this.$imgUrl + res.data.list.img
            console.log(this.Obj.description)
            this.editor.txt.html(this.Obj.description)
          }, 500)
          console.log(res.data.list, '需要编辑的数据')
        }
      })
    },
    // 修改
    modify () {
      this.obj.isshow = false
      // 处理字符串
      this.Obj.description = this.editor.txt.html()
      let data = {
        ...this.Obj,
        specsattr: JSON.stringify(this.Obj.specsattr)
      }
      goodsedit(this.Obj).then(res => {
        if (res.data.code === 200) {
          success(res.data.msg)
          // 刷新页面
          this.reqList()
          this.reqTotal()
          // 清空
          this.emipty()
        }
      })
    }
  },
  mounted () {
    // 分类列表
    this.reqCateList()
    // 规格列表
    this.reqSpecsList(true)
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
