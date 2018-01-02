<template>
  <li>
    <template v-if="menu.type === '页面'">
      <el-menu-item
        v-if="menu.parentId === null"
        :index="String(no)"
        :route="{path: menu.content}" >
        <i class="el-icon-document"></i>
        <span slot="title">{{menu.name}}</span>
      </el-menu-item>
      <el-menu-item
        v-else
        :index="String(no)">
        {{menu.name}}
      </el-menu-item>
    </template>
    <template v-else-if="menu.type === '菜单'">
      <el-submenu v-if="menu.parentId === null" :index="String(no)">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">{{menu.name}}</span>
        </template>
        <tree-menu-item v-for="(item, index) in menu.children" :key="index" :menu="item" :no="String(no + '-' + index)"></tree-menu-item>
      </el-submenu>
      <el-submenu v-else :index="String(no)">
        <span slot="title">{{menu.name}}</span>
        <tree-menu-item v-for="(item, index) in menu.children" :menu="item" :key="index" :no="String(no + '-' + index)"></tree-menu-item>
      </el-submenu>      
    </template>
  </li>
</template>
<script>
export default {
  name: 'treeMenuItem',
  props: ['menu', 'no'],
  updated () {
  }
}
</script>
