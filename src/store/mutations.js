export let state={
  user:sessionStorage.getItem('user')?JSON.parse(sessionStorage.getItem('user')):{}
}
export let getters={
  user(state){
    return state.user
  }
}
export let mutations={
  changeUser(state,obj){
    state.user = obj

    // 存入本地存储
    if (obj.username) {
      sessionStorage.setItem('user',JSON.stringify(obj))
    }else{
      sessionStorage.removeItem('user')
    }
  }
}