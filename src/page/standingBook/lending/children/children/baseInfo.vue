<template>
  <el-form class="detailForm" :rules="rules" ref="form" :model="Data">
    <el-form-item>
      <h3 class="detailForm-title">基本信息</h3>
    </el-form-item>
    <el-form-item class="detailForm-item">
      <table class="" cellspacing="0" cellpadding="10">
        <tr>
          <td>借款编号</td>
          <td>{{Data.acceptorName}}</td>
          <td :class="{ needs:other.write}">借款状态</td>
          <td>{{Data.acceptorName}}</td>
          <!-- <td class="input">
            <el-form-item v-if="other.write" prop="inquirerId">
              <el-select
                filterable
                placeholder="请输入"
                v-model="Data.inquirerId"
                @change="handlerBlur('inquirerId')">
                <el-option
                  v-for="(item, idx) in options"
                  :key="idx"
                  :label="item.username"
                  :value="item.userId">
                </el-option>
              </el-select>
            </el-form-item>
            <span v-else>{{Data.inquirerName}}</span>
          </td> -->
          <td :class="{ needs:other.write}">客户姓名</td>
          <td>{{Data.acceptorName}}</td>
          <td :class="{ needs:other.write}">合同期限</td>
          <td>{{Data.acceptorName}}</td>
        </tr>
        <tr>
          <td :class="{ needs:other.write}">合同金额</td>
          <td>{{Data.acceptorName}}</td>
          <td :class="{ needs:other.write}">期望放款日期</td>
          <td>{{Data.acceptorName}}</td>
          <td :class="{ needs:other.write}"></td>
          <td></td>
          <td :class="{ needs:other.write}"></td>
          <td></td>
        </tr>
      </table>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'baseInfo',
  // props: ['data', 'other'],
  data () {
  },
  watch: {
    data (value) {
      this.Data = value
    }
  },
  methods: {}
}
</script>
<style lang="less" scoped>
@import "~@/style/lendingApplyDetail";
</style>
