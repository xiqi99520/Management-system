<template>
  <el-menu
    :default-active="String(menus.active)"
    @select="handleSelect"
    background-color="#f2f2f2"
    text-color="#999"
    active-text-color="#fff"
    class="menu">
      <tree-menu-item v-for="(menu, idx) in menus.data" :key="idx" :menu="menu" :no="idx"></tree-menu-item>
    </el-menu>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import treeMenuItem from './menu-item'
export default {
  name: 'tree-menu',
  components: {
    treeMenuItem
  },
  computed: {
    ...mapState(['menus'])
  },
  methods: {
    ...mapMutations(['SET_MENU']),
    handleSelect (key, keyPath) {
      const data = this.menus.data[key]
      this.SET_MENU({
        active: key,
        data: this.menus.data
      })
      this.$router.push({
        path: data.content,
        query: {
          index: this.$route.query.index
        }
      })
    }
  }
}
</script>
<style lang="less">
.menu {
  .el-menu-item {
    &.is-active {
      background-color: #2299dd !important;
    }
    &:hover {
      color: #000 !important;
    }
  }
}
</style>