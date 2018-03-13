<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <el-row type="flex" class="row-bg" justify="space-between">
        <!-- LOGO -->
        <el-col :span="6" style="text-align:left;">
          <img src="../assets/no_login_logo.png" alt="" class="home_logo">
        </el-col>
        <!-- NAV导航 -->
        <el-col :span="12">
          <head-navigation></head-navigation>
        </el-col>
        <!-- 当前用户控制 -->
        <el-col :span="6" style="text-align: right;">
          <el-row :gutter="5">
            <el-col :span="20">
              <img src="../assets/default_user.png" alt="" class="home_logo">
              <el-dropdown>
                <span class="el-dropdown-link">
                  <span id="name">测试</span>
                  <!-- <span id="name">{{userInfo.username}}</span> -->
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item disabled>用户角色：</el-dropdown-item>
                  <!-- <el-dropdown-item
                    v-for="(role, idx) in userInfo.roles"
                    disabled
                    :key="idx"
                    size="mini">
                    &nbsp;&nbsp;{{role.name}}
                  </el-dropdown-item> -->
                  <el-dropdown-item @click.native='show = true' divided>修改密码</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
            <el-col :span="4">
              <el-button type="text" @click="handleLogOut">注销用户</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-header>
    <!-- 主体 -->
    <el-container style="position: relative;overflow-y: auto">
      <!-- 菜单条 -->
      <el-aside :width="asideWidth">
        <keep-alive>
          <left-navigation></left-navigation>
        </keep-alive>
      </el-aside>
      <!-- 内容主体 -->
      <el-main>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
    <user-contorl :show="show" :phone="1231231" @on-close="handleClose"></user-contorl>
    <!-- <user-contorl :show="show" :phone="userInfo.phoneNo" @on-close="handleClose"></user-contorl> -->
  </el-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import headNavigation from '../components/nav'
import leftNavigation from '../components/menu/menu'
import userContorl from '../components/userContorl'
import { logOut } from '../service/getData'
export default {
  name: 'home',
  components: {
    headNavigation,
    userContorl,
    leftNavigation
  },
  data () {
    return {
      show: false, // 修改密码弹窗显示状态
      asideWidth: '200px'
    }
  },
  created () {
    if (!this.menus.data || this.menus.data.length <= 1) {
      this.asideWidth = '0'
    } else {
      this.asideWidth = '200px'
    }
  },
  beforeUpdate () {
    if (this.menus.data.length <= 1) {
      this.asideWidth = '0'
    } else {
      this.asideWidth = '200px'
    }
  },
  computed: {
    // ...mapState(['userInfo', 'menus'])
    ...mapState(['menus'])
  },
  methods: {
    ...mapMutations(['LOG_OUT']),
    handleClose (logout) { // 修改弹窗通知处理
      this.show = false
      // 修改成功
      if (logout) {
        setTimeout(() => {
          this.handleLogOut()
        }, 3000)
      }
    },
    handleLogOut () {
      logOut()
        .then(resp => {
          if (resp.success) {
            this.LOG_OUT()
            this.$route.push('/login')
            // this.$router.go(0)
          } else {
            console.log('没有resp.success')
            console.log(resp)
            throw new Error(resp.message)
          }
        })
        .catch(err => {
          console.log(err)
          this.LOG_OUT()
          this.$route.push('/login')
          // this.$notify.error({
          //   title: '错误',
          //   message: err.response ? err.response.data.message : err.message
          // })
        })
    }
  }
}
</script>

<style lang="less" scoped>
.el-header {
  color: #333;
  background: url("../assets/home_top_bg.jpg") center center no-repeat;

  .home_logo {
    vertical-align: middle;
    max-height: 40px;
  }

  .user-info {
    line-height: 1;
    display: inline-block;

    p {
      margin: 0;
    }
  }
}

.el-aside {
  background-color: #f2f2f2;
  color: #333;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  padding: 0 20px;
  overflow: auto;
}
</style>
