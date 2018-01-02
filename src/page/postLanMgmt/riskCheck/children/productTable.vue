<template>
  <el-form :model="filterData" class="detailForm" ref="form">
    <el-form-item>
      <h3 class="detailForm-title">资料核验</h3>
    </el-form-item>

    <el-form-item class="detailForm-item">
      <table class="" cellspacing="0" cellpadding="10">
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
      <h3 class="detailForm-title">资料核验</h3>
    </el-form-item>
    <el-form-item>
        <p>请点击右上角的选项卡，进入相应流程页面查看详情，检查所有资料是否齐备</p>

        <el-row>
          <el-col :span="11">
            <p>请确定所有流程步骤的资料是否齐备</p>
            <el-form-item>
              <el-select v-model="filterData.awaitTime" placeholder="是/否" style="width:100%;">
                <el-option label="是" value="0"></el-option>
                <el-option label="否" value="1"></el-option>
              </el-select>

              <p>相关资料上传</p>
              <el-upload
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过1M</div>
              </el-upload>
            </el-form-item>
          </el-col>

          <el-col :span="2">&nbsp;</el-col>

          <el-col :span="11">
            <p>备注说明</p>
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入"
              >
            </el-input>
          </el-col>
        </el-row>
    </el-form-item>

    <el-form-item>
      <h3 class="detailForm-title">婚史执行及其他</h3>
      <p>请判定是否需要下户检查婚史执行等特殊情况</p>
      <el-form-item>
        <el-select v-model="filterData.awaitTime" placeholder="是/否" style="width:100%;">
          <el-option label="是" value="0"></el-option>
          <el-option label="否" value="1"></el-option>
        </el-select>

        <p>下户核查资料上传</p>
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过1M</div>
        </el-upload>
      </el-form-item>
    </el-form-item>

    <el-form-item>
      <h3 class="detailForm-title">放款确认</h3>
    </el-form-item>

    <el-form-item>
        <el-row class="row-content">
          <el-col :span="11">
            <p>放款意见</p>
            <el-form-item>
              <el-select v-model="filterData.awaitTime" placeholder="批准放款/订单终止" style="width:100%;">
                <el-option label="批准放款" value="0"></el-option>
                <el-option label="订单终止" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>

          <el-col :span="11">
            <p>订单终止原因</p>
            <el-form-item>
              <el-select v-model="filterData.awaitTime" placeholder="请选择" style="width:100%;">
                <el-option label="未知" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入详细的备注信息"
              >
            </el-input>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button type="primary">提交</el-button>
          <el-button @click="handleClose">返回</el-button>
        </el-form-item>
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
<style lang="less" scoped>
  @import "~@/style/lendingApplyDetail";
</style>
