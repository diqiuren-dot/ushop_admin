<template lang="">
  <div>
    <el-container class="index">
      <!-- 侧边栏 -->
      <!-- router 路由 需要的时候 加 -->
      <el-aside width="170px">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          unique-opened
          router
        >
          <el-menu-item index="/index">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/index/menu">菜单管理</el-menu-item>
              <el-menu-item index="/index/role">角色管理</el-menu-item>
              <el-menu-item index="/index/manage">管理员管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <p>
                <i class="el-icon-location"></i>
                <span>商城管理</span>
              </p>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/index/cate">商品分类</el-menu-item>
              <el-menu-item index="/index/specs">商品规格</el-menu-item>
              <el-menu-item index="/index/goods">商品管理</el-menu-item>
              <el-menu-item index="/index/member">会员管理</el-menu-item>
              <el-menu-item index="/index/banner">轮播图管理</el-menu-item>
              <el-menu-item index="/index/seckill">秒杀活动</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 主体内容 -->
      <el-container>
        <el-header> </el-header>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="mbx">
          <el-breadcrumb-item :to="{ path: '/' }" v-if="$route.name">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 二级路由出口 -->
        <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>
<style scoped>
.mbx{
  margin: 10px;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
}

.el-aside {
  background-color: rgb(84, 92, 100);
  color: #333;
  text-align: center;
  height: 100vh;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

.index {
  height: 100vh;
}
</style>
