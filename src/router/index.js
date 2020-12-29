import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export let indexRouter = [
  {
    // 菜单管理
    path: 'menu',
    name:"菜单管理",
    component: () => import('../pages/menu/menu.vue')
  },
  {
    // 角色管理
    path: 'role',
    name:"角色管理",
    component: () => import('../pages/role/role.vue')
  },
  {
    // 管理员管理
    path: 'manage',
    name:"管理员管理",
    component: () => import('../pages/manage/manage.vue')
  },
  {
    // 商品分类
    path: 'cate',
    name:"商品分类",
    component: () => import('../pages/cate/cate.vue')
  },
  {
    // 商品规格
    path: 'specs',
    name:"商品规格",
    component: () => import('../pages/specs/specs.vue')
  },
  {
    // 商品管理
    path: 'goods',
    name:"商品管理",
    component: () => import('../pages/goods/goods.vue')
  },
  {
    // 会员管理
    path: 'member',
    name:"会员管理",
    component: () => import('../pages/member/member.vue')
  },
  {
    // 轮播图管理
    path: 'banner',
    name:"轮播图管理",
    component: () => import('../pages/banner/banner.vue')
  },
  {
    // 秒杀活动
    path: 'seckill',
    name:"秒杀活动",
    component: () => import('../pages/seckill/seckill.vue')
  },
  {
    // 菜单管理
    path: 'home',
    name:"首页",
    component: () => import('../pages/home/home.vue')
  }
]




export default new Router({
  routes: [
    {
      path: '/login',
      name: '登陆页',
      component: () => import('../pages/login/login.vue')
    },
    {
      path: '/',
      component: () => import('../pages/index/index.vue')
    },
    {
      path: '/index',
      component: () => import('../pages/index/index.vue'),
      children: [
        {
          // 菜单管理
          path: '',
          component: () => import('../pages/home/home.vue')
        },
        ...indexRouter
      ]
    }
  ]
})
