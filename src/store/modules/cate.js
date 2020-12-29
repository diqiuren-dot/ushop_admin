import {catelist} from '../../utils/http';


let state = {
  list:[]
}
let mutations = {
  changeList(state,arr){
    state.list = arr
  }
}
let getters = {
  list(context){
    return context.list
  }
}
let actions = {
  reqList(context){
    catelist().then(res=>{
      if (res.data.code==200) {
        context.commit('changeList',res.data.list)
      }
    })
  }
}
export default {
state,
getters,
mutations,
actions,
namespaced: true
}