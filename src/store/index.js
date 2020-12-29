import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import {actions} from './actions';
import {state,getters,mutations} from './mutations'; 
// 商品分类 
import cate from './modules/cate';
// 商品规格
import specs from './modules/specs';
// 商品管理
import goods from './modules/goods';
export default new Vuex.Store({
  state,getters,mutations,actions,modules:{
    cate,specs,goods
  }
})