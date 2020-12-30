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

          <div v-for="item in user.menus" :key="item.id">
            <el-menu-item v-if="!item.children" :index="item.url">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </el-menu-item>

            <el-submenu :index="item.id + ''" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="i in item.children"
                  :key="i.id"
                  :index="'/index' + i.url"
                >
                  {{ i.title }}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </div>
        </el-menu>
      </el-aside>

      <!-- 主体内容 -->
      <el-container>
        <el-header>
          <span>{{ user.username }}</span>
          <el-button type="danger" @click="cal">退出</el-button>
        </el-header>

        <el-breadcrumb separator-class="el-icon-arrow-right" class="mbx">
          <el-breadcrumb-item :to="{ path: '/' }" v-if="$route.name"
            >首页</el-breadcrumb-item
          >
          <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 二级路由出口 -->
        <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import router from '../../router'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  methods: {
    ...mapActions({
      changeUser: 'changeUser'
    }),
    cal () {
      this.$confirm('你确定要退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          //点了删除按钮
          this.changeUser({})
          router.push('/login')
        })
        .catch(() => {})
    }
  },
  mounted () {
    console.log(this.user.menus, '用户数据')
  }
}
</script>
<style scoped>
.mbx {
  margin: 10px;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: right;
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
