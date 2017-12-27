<template>
  <el-container class="detail-full-screnn">
    <el-header>专户、待拨户非业务流水入账确认</el-header>
    <el-main>
      <el-form
        label-position="right"
        label-width="100px"
        :form="form"
        :rules="rules">
        <el-form-item label-width="0">
          <el-col :span="11">
            <el-form-item label="流水金额">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="实际流水时间">
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label-width="0">
          <el-col :span="11">
            <el-form-item label="资金项目名称">
              <el-select style="width: 100%;"></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="流水方向">
              <el-select style="width: 100%;"></el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label-width="0">
          <el-col :span="11">
            <el-form-item label="账户类型">
              <el-select style="width: 100%;"></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="账户号">
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label-width="0">
          <el-col :span="11">
            <el-form-item label="流水科目">
              <el-select style="width: 100%;"></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="账户开户行">
              
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label-width="0">
          <el-col :span="11">
            <el-form-item label="流水号">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="往来资金账户类型">
              <el-select style="width: 100%;"></el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label-width="0">
          <el-col :span="11">
            <el-form-item label="往来资金账户名称">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="往来资金账户号">
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="流水备注">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label-width="0">
          <el-button type="primary">确认提交</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: 'nonBusinessRecordsConfirm',
  data () {
    return {
      form: {},
      rules: {}
    }
  }
}
</script>
<style lang="less" scoped>
@import "~@/style/public";
</style>
