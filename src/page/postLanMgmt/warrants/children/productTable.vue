<template>
  <el-form :model="filterData" class="detailForm" ref="form">
    <el-form-item class="detailForm-item">
      <table class="table-info" cellspacing="0" cellpadding="0">
        <tr>
          <td>申请编号</td>
          <td class="input">
            xxxxx
          </td>
          <td>姓名</td>
          <td>
            张三
          </td>
          <td>贷款额</td>
          <td>
            1600万元
          </td>
          <td>审批额度</td>
          <td>
            1500万元
          </td>
        </tr>
        <tr>
          <td>申请时间</td>
          <td>2017/12/13 08:56</td>
          <td>抵押情况</td>
          <td>一抵</td>
          <td>贷款期限</td>
          <td>23个月</td>
          <td>房产信息</td>
          <td>朝阳区 北京公园</td>
        </tr>
      </table>
    </el-form-item>

    <el-form-item>
      <h3 class="detailForm-title">权证上抵资料</h3>
    </el-form-item>

      <el-form-item>
        <table cellspacing="0" cellpadding="0">
          <tr>
            <td>上抵前房本照片(针对解抵押的情况)</td>
            <td>
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"

                >
                <i class="el-icon-plus"></i>
              </el-upload>
            </td>
          </tr>
          <tr>
            <td>住建委资料调取(原购房合同)</td>
            <td>
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                >
                <i class="el-icon-plus"></i>
              </el-upload>
            </td>
          </tr>
          <tr>
            <td>回执单照片</td>
            <td>
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"

                >
                <i class="el-icon-plus"></i>
              </el-upload>
            </td>
          </tr>
          <tr>
            <td>婚史核查资料(可选，需要核查时上传)</td>
            <td>
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"

                >
                <i class="el-icon-plus"></i>
              </el-upload>
            </td>
          </tr>
          <tr>
            <td>婚史核查资料(可选，需要核查时上传)</td>
            <td>
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"

                >
                <i class="el-icon-plus"></i>
              </el-upload>
            </td>
          </tr>
          <tr>
            <td>法院核查资料(可选，需要核查时上传)</td>
            <td>
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                >
                <i class="el-icon-plus"></i>
              </el-upload>
            </td>
          </tr>
        </table>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" size="medium" class="btn-operate">提交</el-button>
      <el-button class="btn-operate">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  export default {
    data () {
      return {
        filterData: {
          awaitTime: ''
        }
      }
    },
    created () {

    },
    watch: {

    },
    methods: {
      handlerSelect () { // 下拉框选项带出产品信息
        if (this.Data.productId) {
          getProductInfo(this.Data.productId)
            .then(resp => {
              if (resp.success) {
                this.contractTimeLimit = resp.data.term
                this.repayPrincipalMode = resp.data.repayType
              }
            })
        } else {
          this.contractTimeLimit = ''
          this.repayPrincipalMode = ''
        }
      },
      handlerChange (value, key) {
        let str = value + ''
        if (str.split('.').length > 1) {
          if (str.split('.')[1].length > 4) {
            this.error('只允许输入小数点后五位')
            this.Data[key] = str.split('.')[0] + '.' + str.split('.')[1].substring(0, 5)
            let length = str.split('.')[0].length + 7
            let name = key + '_maxLength'
            this[name] = length
          }
        }
      },
      handlerBlur (key) {
        const entity = {
          contractId: '1',
          fieldKey: key,
          fieldValue: this.Data[key]
        }
        this.$emit('on-save', 'loanDetail', entity)
      }
    }
  }
</script>
<style lang="less">
  .el-upload--picture-card{
    display: block;
  }
</style>
<style lang="less" scoped>
  @import "~@/style/interviewDetail";
</style>
