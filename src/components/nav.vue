<template>
  <el-menu
    mode="horizontal"
    background-color="transparent"
    :default-active="String(navs.active)"
    active-text-color="#2299dd"
    @select="handleSelect">
    <el-menu-item
      v-for="(nav, idx) in navs.data"
      v-if="nav.type === '导航'"
      class="nav"
      :key="idx"
      :index="String(idx)">
      {{nav.name}}
    </el-menu-item>
  </el-menu>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
// import { navMockData } from '../mockData'
export default {
  name: 'headNavigation',
  computed: {
    ...mapState(['navs', 'menus', 'userInfo'])
  },
  /*beforeMount () {
    if (!this.navs.data.length) { // 登录跳转
      // console.log(navMockData)
      let nav = { active: '', data: [] }
      let btns
      this.userInfo.permissionTree.map(item => {
        if (item.type === '导航') {
          nav.data.push(item)
        } else if (item.type === '操作') {
          btns = item.children
        }
      })
      this.SET_NAV(nav)
      this.SET_BTN(btns)
      this.handleSelect(0, true)
    } else {  // 刷新或者点击跳转
      this.handleSelect(this.$route.query.index)
    }
  },*/
  methods: {
    ...mapMutations(['SET_NAV', 'SET_BTN']),
    handleSelect (index, jump = false) { // 点击导航
      let nav = this.navs.data[index]
      let url = `/${nav.content}`
      // 导航栏高亮当前导航条
      if (jump) {
        // url += `/${nav.children[0].content}`
        url += this.getPage(nav)
        if (this.menus.data) {
          this.$router.push({
            path: url,
            query: {
              index: index,
              time: new Date().getTime()
            }
          })
        } else {
          this.$router.replace({
            path: url,
            query: {
              index: index
            }
          })
        }
      }
    },
    getPage (data, url = '') {
      if (data.type === '页面') {
        return `${url}/${data.content}`
      } else if (['导航', '菜单'].includes(data.type)) {
        if (data.children.length) {
          return this.getPage(data.children[0])
        } else {
          return url
        }
      } else {
        return url
      }
    }
  }
}
</script>
<style lang="less" scoped>
.nav {
  &:hover {
    background-color: #2299dd !important;
    color: #fff !important;
    font-weight: bold;
  }
}
</style>
