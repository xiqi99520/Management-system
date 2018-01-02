<template>
  <el-form :model="filterData" class="detailForm" ref="form">
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
        <el-row :gutter="50">
          <el-col :span="12">
            <p>终审额度/期限</p>
            <el-form-item>
              <el-input
                placeholder="1500万元/24个月"
                :disabled="true">
              </el-input>
            </el-form-item>

            <p>渤海黑名单验证</p>
            <el-input placeholder="黑名单验证通过"></el-input>
            <el-button type="primary">点击验证</el-button>
          </el-col>

          <el-col :span="12">
            <p>终审点位</p>
            <el-form-item>
              <el-input
                placeholder="0.625%"
                :disabled="true">
              </el-input>
            </el-form-item>

            <p>验证信息备注</p>
            <el-input placeholder="请输入验证信息"></el-input>
          </el-col>
        </el-row>
    </el-form-item>

    <el-form-item>
      <h3 class="detailForm-title">征信报告（详版）</h3>

      <el-form-item>
        <el-row :gutter="50">
          <el-col :span="12">
            <p>贷款/信用卡是否有不良信息</p>
            <el-select v-model="filterData.awaitTime" placeholder="是/否" style="width:100%;">
              <el-option label="是" value="0"></el-option>
              <el-option label="否" value="1"></el-option>
            </el-select>

            <p>需要提供的结清证明类型</p>
            <el-select v-model="filterData.awaitTime" placeholder="柜台转账凭证/柜台存款凭证/网银还款截图/银行还款短信等/暂扣等额保证金" style="width:100%;">
              <el-option label="柜台转账凭证" value="0"></el-option>
              <el-option label="柜台存款凭证" value="1"></el-option>
              <el-option label="网银还款截图" value="1"></el-option>
              <el-option label="银行还款短信等" value="1"></el-option>
              <el-option label="暂扣等额保证金" value="1"></el-option>
            </el-select>
          </el-col>

          <el-col :span="12">
            <p>不良信息类型</p>
            <el-select v-model="filterData.awaitTime" placeholder="不良状态/级别较差/出现逾期" style="width:100%;">
              <el-option label="不良状态" value="0"></el-option>
              <el-option label="级别较差" value="1"></el-option>
              <el-option label="出现逾期" value="1"></el-option>
            </el-select>

            <p>上传结清证明</p>
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过1M</div>
            </el-upload>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form-item>

    <el-form-item>
      <h3 class="detailForm-title">资料核实</h3>
    </el-form-item>

    <el-form-item>
        <el-row class="row-content">
          <el-col :span="24">
            <p>勾选风控要求的客户已携带的资料</p>
            <div>
              <el-checkbox-group>
              <el-checkbox label="身份证"></el-checkbox>
              <el-checkbox label="户口本"></el-checkbox>
              <el-checkbox label="结婚证/离婚证"></el-checkbox>
              <el-checkbox label="房本原件"></el-checkbox>
              <el-checkbox label="征信报告"></el-checkbox>
              <el-checkbox label="原始购房合同"></el-checkbox>
              <el-checkbox label="契税票"></el-checkbox>
              <el-checkbox label="离婚协议"></el-checkbox>
              <el-checkbox label="财产分割公证书"></el-checkbox>
              <el-checkbox label="备用房"></el-checkbox>
              <el-checkbox label="还款计划表"></el-checkbox>
            </el-checkbox-group>
            </div>

            <p>补充资料上传</p>
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过1M</div>
            </el-upload>
          </el-col>
        </el-row>
    </el-form-item>

    <el-form-item>
      <h3 class="detailForm-title">合同签署上传</h3>
    </el-form-item>
    <el-form-item>
        <p>注：合同是非常重要的文件，为保证清晰度，请在签署合同，并按手印/盖章后，以扫描件的形式上传</p>
        <el-row class="row-content">
          <el-col :span="24">
            <p>抵押合同上传</p>
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过1M</div>
            </el-upload>
          </el-col>
        </el-row>
    </el-form-item>

    <el-form-item>
      <h3 class="detailForm-title">合同公证上传</h3>
    </el-form-item>
    <el-form-item>
        <el-row class="row-content">
          <el-col :span="24">
            <p>抵押合同公证书上传</p>
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过1M</div>
            </el-upload>
          </el-col>
        </el-row>
    </el-form-item>

    <el-form-item>
      <h3 class="detailForm-title">其他公证上传</h3>
    </el-form-item>
    <el-form-item>
        <el-row class="row-content">
          <el-col :span="24">
            <p>房产委托公证书</p>
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过1M</div>
            </el-upload>
          </el-col>

          <el-col :span="24">
            <p>委托书（房产提前还款，注销抵押）</p>
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过1M</div>
            </el-upload>
          </el-col>

          <el-col :span="24">
            <p>委托书（抵押房产）</p>
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过1M</div>
            </el-upload>
          </el-col>

          <el-col :span="24">
            <p>其他委托书</p>
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过1M</div>
            </el-upload>
          </el-col>
        </el-row>
    </el-form-item>

    <el-form-item>
      <h3 class="detailForm-title">是否陪同上抵</h3>
    </el-form-item>
    <el-form-item>
        <el-row class="row-content" :gutter="50">
          <el-col :span="12">
            <p>是否需要客户陪同上抵</p>
            <el-select v-model="filterData.awaitTime" placeholder="是/否" style="width:100%;">
              <el-option label="是" value="0"></el-option>
              <el-option label="否" value="1"></el-option>
            </el-select>
          </el-col>

          <el-col :span="12">
            <p>备注说明</p>
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请说明客户需陪同上抵的原因"
              >
            </el-input>
          </el-col>
        </el-row>
    </el-form-item>

    <el-form-item>
      <el-button type="primary">提交</el-button>
      <el-button>取消</el-button>
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
