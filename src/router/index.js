import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

// 判断当前用户是否可以通过
function checkEnter(path,next){
  if (store.state.user.menus_url.includes(path)) {
    next()
  }else{
    next('/')
  }
}



export let indexRouter = [
  {
    // 菜单管理
    path: 'menu',
    name:"菜单管理",
    component: () => import('../pages/menu/menu.vue'),
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      checkEnter('/menu',next)
    }
  },
  {
    // 角色管理
    path: 'role',
    name:"角色管理",
    component: () => import('../pages/role/role.vue'),
    beforeEnter: (to, from, next) => {
      checkEnter('/role',next)
    }
  },
  {
    // 管理员管理
    path: 'manage',
    name:"管理员管理",
    component: () => import('../pages/manage/manage.vue'),
    beforeEnter: (to, from, next) => {
      checkEnter('/manage',next)
    }
  },
  {
    // 商品分类
    path: 'cate',
    name:"商品分类",
    component: () => import('../pages/cate/cate.vue'),
    beforeEnter: (to, from, next) => {
      checkEnter('/cate',next)
    }
  },
  {
    // 商品规格
    path: 'specs',
    name:"商品规格",
    component: () => import('../pages/specs/specs.vue'),
    beforeEnter: (to, from, next) => {
      checkEnter('/specs',next)
    }
  },
  {
    // 商品管理
    path: 'goods',
    name:"商品管理",
    component: () => import('../pages/goods/goods.vue'),
    beforeEnter: (to, from, next) => {
      checkEnter('/goods',next)
    }
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
    component: () => import('../pages/banner/banner.vue'),
    beforeEnter: (to, from, next) => {
      checkEnter('/banner',next)
    }
  },
  {
    // 秒杀活动
    path: 'seckill',
    name:"秒杀活动",
    component: () => import('../pages/seckill/seckill.vue'),
    beforeEnter: (to, from, next) => {
      checkEnter('/seckill',next)
    }
  },
  {
    // 菜单管理
    path: 'home',
    name:"首页",
    component: () => import('../pages/home/home.vue')
  }
]




let router =  new Router({
  routes: [
    {
      path: '/login',
      name: '登陆页',
      component: () => import('../pages/login/login.vue')
    }, 
    {
      path: '*',
      redirect: '/index'
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

//登录拦截
router.beforeEach((to,from,next)=>{
  //如果去到是登录 next
  if(to.path==="/login"){
    next()
    return
  }
  //不是登录，判断是否登录，登录了，就next
  if(store.state.user.id){
    next()
    return;
  }
  //否则 next("/login")
  next("/login")
})


export default router
