<template>
  <el-container class="detail-full-screnn">
    <el-header>
      <el-row>
        <el-col :span="12">
          <p class="detail-title">
            <span>新建产品</span>
          </p>
        </el-col>
        <el-col :span="12" class="detail-title-btn">
          <el-button type="primary" @click="detailBack">返回</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-form class="detailForm" ref="form" :model="options">
        <div>
          <el-form-item>
            <h3 class="detailForm-title">产品基本信息</h3>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-plus" @click="copyProduction">复制新建此产品</el-button>
          </el-form-item>
          <el-form-item class="detailForm-item">
            <table class="" cellspacing="0" cellpadding="10">
              <tr>
                <td>产品编号</td>
                <td class="input">
                  <el-form-item>
                    <el-input
                      v-model="Data.contactNo"
                      class="table-input"
                      size="mini"
                      placeholder="请输入座机/手机号"
                      @blur="">
                    </el-input>
                  </el-form-item>
                  <span></span>
                </td>
                <td :class="{}">适用城市</td>
                <td class="input">
                  <el-form-item>
                    <el-select
                      placeholder="请选择适用城市"
                      class="table-input"
                      v-model="Data"
                      @change="">
                      <el-option
                        v-for="(item, idx) in LenderType"
                        :key="idx"
                        :label="item.value"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <span></span>
                </td>
                <td :class="{}">可否展期</td>
                <td class="input">
                  <el-form-item>
                    <el-select
                      placeholder="请选择适用城市"
                      class="table-input"
                      v-model="Data"
                      @change="">
                      <el-option
                        v-for="(item, idx) in LenderType"
                        :key="idx"
                        :label="item.value"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <span></span>
                </td>
              </tr>
              <tr>
                <td :class="{}">产品名称</td>
                <td class="name-input">
                  <el-form-item>
                    <el-input
                      v-model="Data.contactNo"
                      class="table-input"
                      size="mini"
                      @blur=""
                      style="width: 20%">
                    </el-input>
                    <span>-</span>
                    <el-input
                    v-model="Data.contactNo"
                    class="table-input"
                    size="mini"
                    placeholder="请输入名称"
                    @blur=""
                    style="width: 47%">
                    </el-input>
                    <span>-</span>
                    <el-input
                    v-model="Data.contactNo"
                    class="table-input"
                    size="mini"
                    @blur=""
                    style="width: 20%">
                  </el-input>
                  </el-form-item>
                  <span></span>
                </td>
                <td :class="{}">资金项目名称</td>
                <td class="input">
                  <el-form-item>
                    <el-select
                      placeholder="请选择适用城市"
                      class="table-input"
                      v-model="Data"
                      @change="">
                      <el-option
                        v-for="(item, idx) in LenderType"
                        :key="idx"
                        :label="item.value"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <span></span>
                </td>
                <td :class="{}">贷款类型</td>
                <td class="input">
                  <el-form-item>
                    <el-select
                      placeholder="请选择适用城市"
                      class="table-input"
                      v-model="Data"
                      @change="">
                      <el-option
                        v-for="(item, idx) in LenderType"
                        :key="idx"
                        :label="item.value"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <span></span>
                </td>
              </tr>
              <tr>
                <td :class="{}">业务分类</td>
                <td class="input">
                  <el-form-item>
                    <el-select
                      placeholder="请选择婚姻状态"
                      class="table-input"
                      v-model="Data"
                      @change="">
                      <el-option
                        v-for="(item, idx) in LenderType"
                        :key="idx"
                        :label="item.value"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <span></span>
                </td>
                <td :class="{}">产品描述</td>
                <td class="input" colspan="3">
                  <el-form-item>
                    <el-input
                      v-model="Data.contactNo"
                      class="table-input"
                      size="mini"
                      placeholder="请输入座机/手机号"
                      @blur="">
                    </el-input>
                  </el-form-item>
                  <span></span>
                </td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <div>
          <el-form-item>
            <h3 class="detailForm-title">产品本金利息-基本信息</h3>
          </el-form-item>
          <el-form-item class="detailForm-item">
            <table class="" cellspacing="0" cellpadding="10">
              <tr>
                <td>本金范围（万元）</td>
                <td class="input">
                  <el-form-item prop="contactNo">
                    <el-input
                      v-model="Data.contactNo"
                      class="table-input"
                      size="mini"
                      @blur=""
                      style="width: 47%">
                    </el-input>
                    <span>-</span>
                    <el-input
                      v-model="Data.contactNo"
                      class="table-input"
                      size="mini"
                      placeholder="请输入名称"
                      @blur=""
                      style="width: 47%">
                    </el-input>
                  </el-form-item>
                  <span></span>
                </td>
                <td :class="{}">期限（月）</td>
                <td class="input">
                  <el-form-item>
                    <el-input
                      v-model="Data.contactNo"
                      class="table-input"
                      size="mini"
                      placeholder="请输入期限"
                      @blur="">
                    </el-input>
                  </el-form-item>
                  <span></span>
                </td>
                <td :class="{}">币种</td>
                <td class="input">
                  <el-form-item prop="type">
                    <el-select
                      placeholder="请选择适用城市"
                      class="table-input"
                      v-model="Data.type"
                      @change="">
                      <el-option
                        v-for="(item, idx) in LenderType"
                        :key="idx"
                        :label="item.value"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <span></span>
                </td>
              </tr>
              <tr>
                <td :class="{}">还款方式</td>
                <td class="name-input">
                  <el-form-item>
                    <el-select
                      placeholder="请选择还款方式"
                      class="table-input"
                      v-model="Data.type"
                      @change="">
                      <el-option
                        v-for="(item, idx) in LenderType"
                        :key="idx"
                        :label="item.value"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <span></span>
                </td>
                <td :class="{}">计息方式</td>
                <td class="input">
                  <el-form-item>
                    <el-select
                      placeholder="请选择适用城市"
                      class="table-input"
                      v-model="Data.type"
                      @change="">
                      <el-option
                        v-for="(item, idx) in LenderType"
                        :key="idx"
                        :label="item.value"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <span></span>
                </td>
                <td :class="{}">宽限天数</td>
                <td class="input">
                  <el-form-item>
                    <el-select
                      placeholder="请选择适用城市"
                      class="table-input"
                      v-model="Data.type"
                      @change="">
                      <el-option
                        v-for="(item, idx) in LenderType"
                        :key="idx"
                        :label="item.value"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <span></span>
                </td>
              </tr>
              <tr>
                <td :class="{}">扣款日类型</td>
                <td class="input">
                  <el-form-item>
                    <el-select
                      placeholder="请选择婚姻状态"
                      class="table-input"
                      v-model="Data"
                      @change="">
                      <el-option
                        v-for="(item, idx) in LenderType"
                        :key="idx"
                        :label="item.value"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <span></span>
                </td>
                <td :class="{}">扣款日类别</td>
                <td class="input">
                  <el-form-item>
                    <el-select
                      placeholder="请选择婚姻状态"
                      class="table-input"
                      v-model="Data"
                      @change="">
                      <el-option
                        v-for="(item, idx) in LenderType"
                        :key="idx"
                        :label="item.value"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <span></span>
                </td>
                <td :class="{}">利率类型</td>
                <td class="input">
                  <el-form-item>
                    <el-select
                      placeholder="请选择婚姻状态"
                      class="table-input"
                      v-model="Data"
                      @change="">
                      <el-option
                        v-for="(item, idx) in LenderType"
                        :key="idx"
                        :label="item.value"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <span></span>
                </td>
              </tr>
              <tr>
                <td :class="{}">利息计算方式</td>
                <td class="input">
                  <el-form-item>
                    <el-select
                      placeholder="请选择婚姻状态"
                      class="table-input"
                      v-model="Data"
                      @change="">
                      <el-option
                        v-for="(item, idx) in LenderType"
                        :key="idx"
                        :label="item.value"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <span></span>
                </td>
                <td :class="{}">最高减免比例</td>
                <td class="input" colspan="3">
                  <el-form-item>
                    <el-input
                      v-model="Data.contactNo"
                      class="table-input"
                      size="mini"
                      placeholder="请输入座机/手机号"
                      @blur="">
                    </el-input>
                  </el-form-item>
                  <span></span>
                </td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <div>
          <el-form-item>
            <h3 class="detailForm-title" style="display: inline-block;">产品还本还息-详细信息</h3>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-plus" @click="handleNewProduction"></el-button>
          </el-form-item>
          <el-form-item class="detailForm-item">
            <table class="" cellspacing="0" cellpadding="10">
              <tr v-for="(item ,index) in Datas" :key="index">
                <td>起始期限</td>
                <td class="input">
                  <el-form-item>
                    <el-input
                      v-model="Data.contactNo"
                      class="table-input"
                      size="mini"
                      placeholder="请输入座机/手机号"
                      @blur="">
                    </el-input>
                  </el-form-item>
                  <span></span>
                </td>
                <td :class="{}">结束期限</td>
                <td class="input">
                  <el-form-item>
                    <el-input
                      v-model="Data.contactNo"
                      class="table-input"
                      size="mini"
                      placeholder="请输入座机/手机号"
                      @blur="">
                    </el-input>
                  </el-form-item>
                  <span></span>
                </td>
                <td :class="{}">还本比例</td>
                <td class="input">
                  <el-form-item>
                    <el-input
                      v-model="Data.contactNo"
                      class="table-input"
                      size="mini"
                      placeholder="请输入座机/手机号"
                      @blur="">
                    </el-input>
                  </el-form-item>
                  <span></span>
                </td>
                <td :class="{}">每期利率</td>
                <td class="input">
                  <el-form-item>
                    <el-select
                      placeholder="请选择适用城市"
                      class="table-input"
                      v-model="Data.type"
                      @change="">
                      <el-option
                        v-for="(item, idx) in LenderType"
                        :key="idx"
                        :label="item.value"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <span></span>
                </td>
                <td>
                  <el-button type="warning" icon="el-icon-delete" @click=""></el-button>
                </td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <div>
          <el-form-item>
            <h3 class="detailForm-title" style="display: inline-block;">产品其他还款科目-详细信息</h3>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-plus" title="新增还款科目" @click="addPayment"></el-button>
            <el-button type="primary" icon="el-icon-edit" title="编辑还款科目" @click="updatePayment"></el-button>
            <el-button type="primary" icon="el-icon-delete" title="删除还款科目" @click=""></el-button>
          </el-form-item>
          <el-table
            :data="productionData"
            stripe
            border
            highlight-current-row
            @row-click=""
            ref="table"
            style="width: 100%">
            <el-table-column
              align="center"
              type="index"
              label="优先级">
            </el-table-column>
            <el-table-column
              align="center"
              label="还款科目类型">
              <template v-if="scope.row.authorities.length" slot-scope="scope">
                <span v-if="scope.row.username === '用户'">{{ scope.row.username }}{{ scope.row.userId }}</span>
                <span v-else>{{ scope.row.username }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="phoneNo"
              label="科目名称">
            </el-table-column>
            <el-table-column
              align="center"
              prop="gender"
              label="计算基数（可取本金/剩余本金为变量）">
            </el-table-column>
            <el-table-column
              align="center"
              label="每期费率">
              <template v-if="scope.row.authorities.length" slot-scope="scope">
                <span v-for="(item, idx) in scope.row.authorities" :key="idx" style="display: block">{{item.name}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="state"
              label="费率类型">
            </el-table-column>
            <el-table-column
              align="center"
              prop="createTime"
              label="费率计算方式">
            </el-table-column>
            <el-table-column
              align="center"
              prop="createTime"
              label="最高减免比例">
            </el-table-column>
            <el-table-column
              align="center"
              prop="createTime"
              label="资金去向">
            </el-table-column>
            <el-table-column
              align="center"
              prop="createTime"
              label="适用期限（起始）">
            </el-table-column>
            <el-table-column
              align="center"
              prop="createTime"
              label="适用期限（结束）">
            </el-table-column>
            <el-table-column
              align="center"
              prop="createTime"
              label="优先级类型">
            </el-table-column>
            <el-table-column
              align="center"
              prop="createTime"
              label="还款科目描述">
            </el-table-column>
            <el-table-column
              align="center"
              label="操作">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-arrow-up" @click="handleEditClick" title="升级"></el-button>
                <el-button type="primary" icon="el-icon-arrow-down" @click="handleEditClick" title="降级"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
  import { mapState } from 'vuex'
  import store from '@/store'
  export default {
    name: 'productionDetail',
    props: ['editorState'],
    computed: {
      ...mapState(['production'])
    },
    data () {
      return {
        LenderType: [],
        productionData: [],
        enterOrganizationYear: '',
        show: false,
        showNewDialog: false,
        showUpdateDialog: false,
        address: ['contact', 'family', 'home'], // 初始化地址
        contact: [], // 通讯地址数据
        family: [], // 户籍地址数据
        home: [], // 家庭地址数据
        city: [], // 城市级联数据
        selects: [ // 下拉菜单
          'OpenCity',   // 城市
          'LenderType', // 婚姻情况
          'educationalBackground', // 学历
          'career', // 职业
          'organizationDomain', // 单位所属行业
          'positionInOrganization', // 本人职务
          'professionalTitle' // 本人职称
        ],
        canEmptyKey: ['homeAddress', 'homePostalCode', 'homePhone'],
        options: {}, // 下拉菜单选项
        cascaderProps: { // 城市级联配置
          value: 'locationId',
          label: 'name'
        },
        Data: [],
        Datas: [{}],
//        rules: {  // 表单验证
//          contactNo: [
//            { required: true, message: '请输入联系电话', trigger: 'blur' },
//            { validator: valiData.homePhoneNumber, trigger: 'blur' }
//          ],
//          postalCode: [
//            { required: true, message: '请输入邮政编码', trigger: 'blur' },
//            { validator: valiData.postNumber, trigger: 'blur' }
//          ],
//          contact: [
//            { type: 'array', required: true, message: '请选择地区', trigger: 'change' }
//          ],
//          contactAddress: [
//            { required: true, message: '请填写通讯地址', trigger: 'blur' }
//          ],
//          LenderType: [
//            { required: true, message: '请选择婚姻状况', trigger: 'change' }
//          ],
//          educationalBackground: [
//            { required: true, message: '请选择学历背景', trigger: 'change' }
//          ],
//          career: [
//            { required: true, message: '请选择职业', trigger: 'change' }
//          ],
//          monthIncome: [
//            { required: true, message: '请输入工资', trigger: 'blur' }
//          ],
//          organization: [
//            { required: true, message: '请输入单位名称', trigger: 'blur' }
//          ],
//          organizationDomain: [
//            { required: true, message: '请选择单位所属行业', trigger: 'change' }
//          ],
//          organizationAddress: [
//            { required: true, message: '请输入单位地址', trigger: 'blur' }
//          ],
//          organizationPostalCode: [
//            { required: true, validator: valiData.postNumber, trigger: 'blur' }
//          ],
//          enterOrganizationYear: [
//            { type: 'date', validator: valiData.getYear, trigger: 'change' }
//          ],
//          positionInOrganization: [
//            { required: true, message: '请选择职务', trigger: 'change' }
//          ],
//          professionalTitle: [
//            { required: true, message: '请选择职称', trigger: 'change' }
//          ],
//          familyAddress: [
//            { required: true, message: '请输入户籍详细地址', trigger: 'blur' }
//          ],
//          family: [
//            { type: 'array', required: true, message: '请选择户籍地址', trigger: 'change' }
//          ],
//          // home: [
//          //   { type: 'array', required: true, message: '请选择家庭住址', trigger: 'blur' }
//          // ],
//          // homeAddress: [
//          //   { message: '请输入详细住址', trigger: 'blur' }
//          // ],
//          // homePostalCode: [
//          //   { validator: valiData.postNumber, trigger: 'blur' }
//          // ],
//          // homePhone: [
//          //   { validator: valiData.homePhoneNumber, trigger: 'blur' }
//          // ],
//          type: [
//            { required: true, message: '请选择借款人类型', trigger: 'change' }
//          ]
//        },
//        formatter: formatter
      }
    },
    methods: {
      handleNewProduction () { // 新增共同借款人
        this.Datas.push({})
        this.btnDisabled = true
      },
      deleteProdution (index) {
        delete this.Data[index]
      },
      addPayment () {
        this.$emit('on-add')
      },
      updatePayment () {
        this.$emit('on-update')
      },
      copyProduction () {
        this.$emit('on-copy')
      },
      detailBack () {
        this.$emit('on-close')
        store.commit('SET_DETAIL_DIALOG', {
          showDialog: false,
          productId: ''
        })
      }
    },
    watch: {

    }
  }
</script>
<style lang="less">
  @import "~@/style/lendingApplyDetail";

  .detail-full-screnn {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 200px;
    right: 0;
    overflow: auto;
    background: @white;
    z-index: 4;
    text-align: left;
  }

  .detail-title {
    line-height: 60px;
    font-size: 18px;
  // padding-left: 200px;
    margin: 0;
  span {
    display: inline-block;
    text-indent: 10px;
    border-left: 4px solid @blue;
    line-height: 1;
  }
  }

  .detail-title-btn {
    text-align: right;
  }
  .name-input{
    .el-input__inner{
      display: inline-block; padding: 0
    }
  }
  .detailForm{
    .el-select{
      width: 100%;
    }
  }
</style>
