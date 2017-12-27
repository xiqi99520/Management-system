<template>
    <!-- :default-active="menus.active" -->
  <el-menu
    :default-active="menus.active"
    :default-openeds="menus.openeds"
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
  name: 'treeMenu',
  data () {
    return {
      activeIndex: '0'
    }
  },
  components: {
    treeMenuItem
  },
  computed: {
    ...mapState(['menus'])
  },
  updated () {
    // this.activeIndex = this.menus.active
  },
  watch: {
    'menus.active' (val) {
      // this.activeIndex = val
    }
  },
  methods: {
    ...mapMutations(['SET_MENU']),
    handleSelect (key, keyPath) {
      let data
      let keys = keyPath[keyPath.length - 1].split('-')
      keys.map((k, idx) => {
        if (idx === 0) {
          data = this.menus.data[k]
        } else {
          data = data.children[k]
        }
      })
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
    },
    fRandomBy (under, over) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * under + 1)
        case 2:
          return parseInt(Math.random() * (over - under + 1) + under)
        default:
          return 0
      }
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