import {goodslist,goodscount} from '../../utils/http';


let state = {
  list:[],
  // 总数
  total:0,
  // 一页数量
  size:2,
  // 当前页码
  page:1
}
let mutations = {
  changeList(state,arr){
    state.list = arr
  },
  changeTotal(state,num){
    state.total = num
  },
  changePage(state,num){
    state.page = num
  }
}
let getters = {
  list(state){
    return state.list
  },
  total(state){
    return state.total
  },
  size(state){
    return state.size
  }
}
let actions = {
  // 处理列表数据
  reqList(context,bool){
    // 商品规格需要分页 商品管理不需要分页就传true
    let params=bool?{}:{page:context.state.page,size:context.state.size}
    goodslist(params).then(res=>{
      if (res.data.code==200) {

        if (res.data.list.length==0&&context.state.page>1) {
          context.commit('changePage',context.state.page-1)
          context.dispatch('reqList');
          return;
        }

        let list = res.data.list
        try {
          
        } catch (error) {
          list.forEach(item=>{
            item.attrs=JSON.parse(item.attrs)
          })
        }
        context.commit('changeList',res.data.list)
      }
    })
  },
  // 获取总数
  reqTotal(context){
    goodscount().then(res=>{
      if (res.data.code == 200) {
        context.commit('changeTotal',res.data.list[0].total)
      }
    })
  },
  // 修改page 页数
  changePage(context,num){
    // 修改页码
    context.commit('changePage',num)
    // 重新请求列表
    context.dispatch('reqList')
  }
}
export default {
state,
getters,
mutations,
actions,
namespaced: true
}