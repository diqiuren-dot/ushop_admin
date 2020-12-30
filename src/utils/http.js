import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import store from '../store';

import router from '../router';
// 开发环境
let kurl = '/api'
Vue.prototype.$imgUrl = 'http://localhost:3000'

// 上线环境
// let kurl = '';
// Vue.prototype.$imgUrl = ''

// 响应拦截
axios.interceptors.response.use(res => {
  
  console.group('本次请求地址是：' + res.config.url)
  console.log(res)
  console.groupEnd()

  // 统一掉线处理
  if (res.data.msg === '登录已过期或访问权限受限') {
    
    store.dispatch('changeUser', {})
    router.push('/login')
  }
  return res
})

// 请求拦截  设置请求头
axios.interceptors.request.use(req=>{
  if (req.url!== kurl + '/api/userlogin' ) {
    req.headers.authorization = store.state.user.token
  }
  return req
})
// 登陆 /api/login
export let login = user => {
  return axios({
    url: kurl + '/api/userlogin',
    method: 'post',
    data: qs.stringify(user)
  })
}

// 菜单添加 /api/menuadd

export let menuadd = menuadd => {
  return axios({
    url: kurl + '/api/menuadd',
    method: 'post',
    data: qs.stringify(menuadd)
  })
}

// 获取菜单列表 /api/menulist

export let menulist = () => {
  return axios({
    url: kurl + '/api/menulist',
    params: {
      istree: true
    }
  })
}

// const ajax = (obj) =>
// new Promise(((resolve, reject) => {
// obj.success = function (data) {
// resolve(data);
// }
// obj.error = function (err) {
// reject(err);
// }
// $.ajax(obj);
// }));

// 删除菜单 /api/menudelete 可以根据指定的菜单编号进行删除

export let menudelete = id => {
  return axios({
    url: kurl + '/api/menudelete',
    method: 'post',
    data: qs.stringify({
      id: id
    })
  })
}

// 获取一条数据 /api/menuinfo
export let menuinfo = id => {
  return axios({
    url: kurl + '/api/menuinfo',
    method: 'get',
    params: {
      id: id
    }
  })
}

// 菜单修改 /api/menuedit
export let menuedit = obj => {
  return axios({
    url: kurl + '/api/menuedit',
    method: 'post',
    data: qs.stringify(obj)
  })
}

// **********************************角色管理***************************************

// 获取角色列表 /api/rolelist

export let rolelist = obj => {
  return axios({
    url: kurl + '/api/rolelist',
    method: 'get'
  })
}


// 添加角色列表 /api/roleadd

export let roleadd = obj => {
  return axios({
    url: kurl + '/api/roleadd',
    method: 'post',
    data:qs.stringify(obj)
  })
}


// 删除角色列表 /api/roledelete

export let roledelete = id => {
  return axios({
    url: kurl + '/api/roledelete',
    method: 'post',
    data:qs.stringify({
      id:id
    })
  })
}

// 获取一条列表数据 /api/roleinfo

export let roleinfo = id => {
  return axios({
    url: kurl + '/api/roleinfo',
    method: 'get',
    params:{
      id:id
    }
  })
}

// 角色修改 /api/roleedit

export let roleedit = obj => {
  return axios({
    url: kurl + '/api/roleedit',
    method: 'post',
    data:qs.stringify(obj)
  })
}

// *******************管理员**************************

// 管理员添加 /api/useradd

export let useradd = obj => {
  return axios({
    url: kurl + '/api/useradd',
    method: 'post',
    data:qs.stringify(obj)
  })
}

// 管理员总数（用于计算分页）  /api/usercount

export let usercount = ()=>{
  return axios({
    url:kurl + '/api/usercount',
    method:"get"
  })
}

// 管理员列表 /api/userlist

export let userlist = (obj)=>{
  return axios({
    url:kurl + '/api/userlist',
    method:"get",
    params:obj
  })
}


// 删除 /api/userdelete

export let userdelete = (id)=>{
  return axios({
    url:kurl + '/api/userdelete',
    method:"post",
    data:qs.stringify({
      uid:id
    })
  })
}

// 获取一条数据 /api/userinfo

export let userinfo = (id)=>{
  return axios({
    url:kurl + '/api/userinfo',
    method:"get",
    params:{
      uid:id
    }
  })
}

// 管理员修改 /api/useredit

export let useredit = (obj)=>{
  return axios({
    url:kurl + '/api/useredit',
    method:"post",
    data:qs.stringify(obj)
  })
}


// ****************************商品分类*******************************

// 处理带有文件的时候 的参数
function dataForm(obj){
  let data = new FormData()
  for (const i in obj) {
    data.append(i,obj[i])
  }
  return data
}

//1.商品分类添加 /api/cateadd
export let cateadd = (obj)=>{
  return axios({
    url:kurl + '/api/cateadd',
    method:"post",
    data: dataForm(obj)
  })
}

// 2.商品分类列表 /api/catelist GET 说明 istree 是否返回树形结构

export let catelist = ()=>{
  return axios({
    url: kurl + '/api/catelist',
    method:"get",
    params:{
      istree:true
    }
  })
}


// 3.商品分类获取（一条） /api/cateinfo

export let cateinfo = (id)=>{
  return axios({
    url:kurl + '/api/cateinfo',
    method:"get",
    params:{
      id:id
    }
  })
}


// 4.商品分类修改 /api/cateedit 

export let cateedit = (obj)=>{
  return axios({
    url:kurl + '/api/cateedit',
    method:"post",
    data: dataForm(obj)
  })
}

// 5.商品分类删除 /api/catedelete

export let catedelete = (id)=>{
  return axios({
    url:kurl + '/api/catedelete',
    method:"post",
    data: qs.stringify({
      id:id
    })
  })
}

// ************************************轮播图添加**********************************


// **1.轮播图添加** /api/banneradd

export let banneradd = (obj)=>{
  return axios({
    url:kurl + '/api/banneradd',
    method:"post",
    data: dataForm(obj)  
  })
}


// 2.轮播图列表 /api/bannerlist

export let bannerlist = ()=>{
  return axios({
    url:kurl + '/api/bannerlist',
    method:'get'
  })
}


// 3.轮播图获取（一条） /api/bannerinfo

export let bannerinfo = (id)=>{
  return axios({
    url:kurl + '/api/bannerinfo',
    method:'get',
    params:{
      id:id
    }
  })
}


// 4.轮播图修改 /api/banneredit

export let banneredit = (obj)=>{
  return axios({
    url:kurl + '/api/banneredit',
    method:"post",
    data: dataForm(obj)  
  })
}

// 5.轮播图删除 /api/bannerdelete

export let bannerdelete = (id)=>{
  return axios({
    url:kurl + '/api/bannerdelete',
    method:"post",
    data: {
      id:id
    } 
  })
}


// ************************************会员管理*********************************

// 1.会员列表 /api/memberlist

export let memberlist = ()=>{
  return axios({
    url: kurl + '/api/memberlist',
    method:'get'
  })
}


// 2.会员获取（一条） /api/memberinfo

export let memberinfo = (id)=>{
  return axios({
    url: kurl + '/api/memberinfo',
    method:'get',
    params:{
        uid:id
    }
  })
}

// 3.会员修改 /api/memberedit

export let memberedit = (obj)=>{
  return axios({
    url:kurl + '/api/memberedit',
    method:"post",
    data: qs.stringify(obj) 
  })
}



//***********************************商品规格******************************************/ 

// 商品规格添加 /api/specsadd

export let specsadd = (obj)=>{
  return axios({
    url:kurl + '/api/specsadd',
    method:"post",
    data: qs.stringify(obj) 
  })
}


// 商品规格总数 /api/specscount

export let specscount = ()=>{
  return axios({
    url: kurl + '/api/specscount',
    method:"get"
  })
}

// 商品规格列表 需要分页 /api/specslist

export let specslist = (obj)=>{
  return axios({
    url: kurl + '/api/specslist',
    method:"get",
    params:obj
  })
}


// 商品规格获取一条 /api/specsinfo

export let specsinfo = (id)=>{
  return axios({
    url: kurl + '/api/specsinfo',
    method:"get",
    params:{
      id:id
    }
  })
}

// 5.商品规格修改 /api/specsedit

export let specsedit = (obj)=>{
  return axios({
    url: kurl + '/api/specsedit',
    method:"post",
    data:qs.stringify(obj)
  })
}

// 6.商品规格删除 /api/specsdelete

export let specsdelete = (id)=>{
  return axios({
    url: kurl + '/api/specsdelete',
    method:"post",
    data:qs.stringify({
      id:id
    })
  })
}



// **************************商品添加************************


// 1.商品添加  /api/goodsadd

export let goodsadd = (obj)=>{
  return axios({
    url: kurl + '/api/goodsadd',
    method:"post",
    data: dataForm(obj)
  })
}


// 2.商品总数（用于计算分页） /api/goodscount

export let goodscount = ()=>{
  return axios({
    url: kurl + '/api/goodscount',
    method:"get"
  })
}


// 3.商品列表（分页） /api/goodslist

export let goodslist = (obj)=>{
  return axios({
    url: kurl + '/api/goodslist',
    method:"get",
    params:obj
  })
}

// 4.商品获取（一条）/api/goodsinfo

export let goodsinfo = (id)=>{
  return axios({
    url: kurl + '/api/goodsinfo',
    method:"get",
    params:{
      id:id
    }
  })
}
// 5.商品修改   /api/goodsedit

export let goodsedit = (obj)=>{
  return axios({
    url: kurl + '/api/goodsedit',
    method:"post",
    data: dataForm(obj)
  })
}

// 6.商品删除 /api/goodsdelete

export let goodsdelete = (id)=>{
  return axios({
    url: kurl + '/api/goodsdelete',
    method:"post",
    data: qs.stringify({
      id:id
    })
  })
}

// ***************************限时秒杀管理****************************

// 1.限时秒杀添加 /api/seckadd

export let seckadd = (obj)=>{
  return axios({
    url: kurl + '/api/seckadd',
    method:"post",
    data: qs.stringify(obj)
  })
}

// 2.限时秒杀列表 /api/secklist

export let secklist = ()=>{
  return axios({
    url: kurl + '/api/secklist',
    method:"get"
  })
}


// 3.限时秒杀获取（一条）/api/seckinfo

export let seckinfo = (id)=>{
  return axios({
    url: kurl + '/api/seckinfo',
    method:"get",
    params:{
      id:id
    }
  })
}


// 4.限时秒杀修改 /api/seckedit

export let seckedit = (obj)=>{
  return axios({
    url: kurl + '/api/seckedit',
    method:"post",
    data: qs.stringify(obj)
  })
}

// 5.限时秒杀删除 /api/seckdelete

export let seckdelete = (id)=>{
  return axios({
    url: kurl + '/api/seckdelete',
    method:"post",
    data: qs.stringify({
      id:id
    })
  })
}