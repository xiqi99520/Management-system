<template>
  <div id="app">
    <router-view/>
    <div id="copy" style="width: 100%;"></div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapState(['ready'])
  },
  methods: {
    ...mapMutations(['FLUSH_DATA'])
  },
  beforeMount () {
    if (!this.ready) {
      this.FLUSH_DATA()
    }
  }
}
</script>

<style lang="less">
@import '~@/style/iconFont/iconfont.css';
body {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  height: 100%;
}

.el-header {
  // background-color: #fff;
  color: #333;
  /* text-align: center; */
  line-height: 60px;
}

.el-container {
  height: 100%;
}

/*表格高亮修改*/
.el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
.el-table__body tr.current-row > td,
.el-table__body tr.hover-row.current-row > td,
.el-table__body tr.hover-row.el-table__row--striped.current-row > td,
.el-table__body tr.hover-row.el-table__row--striped > td,
.el-table__body tr.hover-row > td {
  background-color: #a0cfff !important;
}
.el-upload {
  display: inline;
  .el-upload-dragger {
    width: 100% !important;
    height: 150px;
    .el-icon-upload {
      margin-top: 25px;
    }
  }
}
</style>
