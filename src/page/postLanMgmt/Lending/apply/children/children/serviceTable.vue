<template>
  <el-form class="detailForm" :rules="rules" ref="form" :model="Data">
    <el-form-item>
      <h3 class="detailForm-title">服务人员信息</h3>
    </el-form-item>
    <el-form-item class="detailForm-item">
      <table class="" cellspacing="0" cellpadding="10">
        <tr>
          <td>评房专员</td>
          <td>{{Data.acceptorName}}</td>
          <td :class="{ needs:other.write}">下户专员</td>
          <td class="input">
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
          </td>
          <!-- <td>风控初审</td>
          <td class="input">
            <el-form-item v-if="other.write" prop="predictorId">
              <el-select
                filterable
                placeholder="请选择"
                v-model="Data.predictorId"
                @change="handlerBlur('predictorId')">
                <el-option
                  v-for="(item, idx) in options"
                  :key="idx"
                  :label="item.username"
                  :value="item.userId">
                </el-option>
              </el-select>
            </el-form-item>
            <span v-else>{{Data.predictorName}}</span>
          </td> -->
          <td :class="{ needs:other.write}">面签专员</td>
          <td>
            <el-form-item v-if="other.write" prop="interviewerId">
              <el-select
                filterable
                placeholder="请输入"
                v-model="Data.interviewerId"
                @change="handlerBlur('interviewerId')">
                <el-option
                  v-for="(item, idx) in options"
                  :key="idx"
                  :label="item.username"
                  :value="item.userId">
                </el-option>
              </el-select>
            </el-form-item>
            <span v-else>{{Data.interviewerName}}</span>
          </td>
          <td :class="{ needs:other.write}">权证专员</td>
          <td class="input">
            <el-form-item v-if="other.write" prop="attestorId">
              <el-select
                filterable
                placeholder="请输入"
                v-model="Data.attestorId"
                @change="handlerBlur('attestorId')">
                <el-option
                  v-for="(item, idx) in options"
                  :key="idx"
                  :label="item.username"
                  :value="item.userId">
                </el-option>
              </el-select>
            </el-form-item>
            <span v-else>{{Data.attestorName}}</span>
          </td>
        </tr>
        <tr>
          <td :class="{ needs:other.write}">风控终审</td>
          <td class="input">
            <el-form-item v-if="other.write" prop="auditorId">
              <el-select
                filterable
                placeholder="请输入"
                v-model="Data.auditorId"
                @change="handlerBlur('auditorId')">
                <el-option
                  v-for="(item, idx) in options"
                  :key="idx"
                  :label="item.username"
                  :value="item.userId">
                </el-option>
              </el-select>
            </el-form-item>
            <span v-else>{{Data.auditorName}}</span>
          </td>
          <template v-if="other.detail">
            <td>当前状态</td>
            <td>{{other.state}}</td>
            <td>最后处理时间</td>
            <td>{{other.lastOperation}}</td>
            <td>当前风控意见</td>
            <td>{{data.reason}}</td>
          </template>
          <template v-else>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </template>
        </tr>
      </table>
    </el-form-item>
  </el-form>
</template>
<script>
import { queryServants, findUnderCost } from '@/service/getData'
export default {
  name: 'serviceTable',
  props: ['data', 'other'],
  data () {
    return {
      loading: false,
      Data: this.data,
      options: [],
      rules: { // 表单验证规则
        inquirerId: [
          { type: 'number', required: true, message: '请选择下户专员', trigger: 'change' }
        ],
        predictorId: [
          { type: 'number', required: true, message: '请选择风控初审', trigger: 'change' }
        ],
        interviewerId: [
          { type: 'number', required: true, message: '请选择面签专员', trigger: 'change' }
        ],
        attestorId: [
          { type: 'number', required: true, message: '请选择权证专员', trigger: 'change' }
        ],
        auditorId: [
          { type: 'number', required: true, message: '请选择风控终审', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    queryServants()
      .then(resp => {
        if (resp.success) {
          this.options = resp.data
        }
        // TODO: 错误处理
      })
  },
  watch: {
    data (value) {
      this.Data = value
    }
  },
  methods: {
    handlerBlur (key) {
      const entity = {
        fieldKey: key,
        fieldValue: this.Data[key]
      }
      this.$emit('on-save', 'servants', entity)
    },
    handleQuery () {
      this.loading = true
      findUnderCost(this.other.applyId) // 查询下户费
        .then(resp => {
          if (resp.success) {
            this.$emit('on-query', resp.data || {})
          } else {
            throw new Error(resp.message)
          }
        })
        .catch(err => { // 错误处理
          this.$notify.error({
            title: '查询下户费失败',
            message: err.name === 'Error' ? err.message : err.response.data.message
          })
        })
        .then(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style lang="less" scoped>
@import "~@/style/lendingApplyDetail";
</style>
