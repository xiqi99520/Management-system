<template>
    <el-container>
      <el-main class="view-container">
         <table class="table-view">
          <tbody>
            <tr>
              <th>申请编号</th>
              <td>FC0001</td>
              <th>姓名</th>
              <td>张三</td>
              <th>贷款额</th>
              <td>1600万元</td>
              <th>房产估值</th>
              <td>1400-1600万元</td>
            </tr>
            <tr>
              <th>申请时间</th>
              <td>2017/10/13 18:00</td>
              <th>抵押情况</th>
              <td>一抵</td>
              <th>贷款期限</th>
              <td>24个月</td>
              <th>房产地址</th>
              <td>朝阳区-燕莎-远洋新干线</td>
            </tr>
          </tbody>
        </table>
        <div class="view-box">
          <div class="view-box-title">
            <i class="iconfont icon-dianzhui"></i> 1. 证件照片审核
          </div>
          <div class="view-box-body">
            <el-row type="flex" class="row-bg">
              <el-col :span="24" align="left">
                <el-form-item label="身份证：是否存在国籍/年龄/到期问题" class="form-item">
                    <el-select v-model="reviewForm.abnormalIDcard" placeholder="请选择" style="width:100%">
                      <el-option v-for="item in reviewForm.selectOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" class="row-bg">
              <el-col :span="24" align="left">
                <el-form-item label="户口本：公检法单位/曾用名/婚姻情况要素是否符合要求" class="form-item">
                    <el-select v-model="reviewForm.abnormalBooklet" placeholder="请选择" style="width:100%">
                      <el-option v-for="item in reviewForm.selectOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" class="row-bg">
              <el-col :span="24" align="left">
                <el-form-item label="婚姻证件：相应婚姻状况是否提供了应有证件" class="form-item">
                    <el-select v-model="reviewForm.abnormalMarrCard" placeholder="请选择" style="width:100%">
                      <el-option v-for="item in reviewForm.selectOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="11" align="left">
                <el-form-item label="征信报告：逾期/负债/对外担保是否符合要求" class="form-item">
                    <el-select v-model="reviewForm.abnormalCredit" placeholder="请选择" style="width:100%">
                      <el-option v-for="item in reviewForm.selectOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11" align="left">
                <el-form-item label="异常说明" class="form-item">
                    <el-input :model="reviewForm.creditNote" style="width:100%"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="11" align="left">
                <el-form-item label="房本：年限/类型/建成年份/下户情况等要素是否正常" class="form-item">
                    <el-select v-model="reviewForm.abnormalRoom" placeholder="请选择" style="width:100%">
                      <el-option v-for="item in reviewForm.selectOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11" align="left">
                <el-form-item label="异常说明" class="form-item">
                    <el-input :model="reviewForm.roomNote" placeholder="请输入" style="width:100%"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" class="row-bg">
              <el-col :span="24" align="left">
                <el-form-item label="一抵证明：二抵客户是否提供" class="form-item">
                    <el-select v-model="reviewForm.abnormalYidi" placeholder="请选择" style="width:100%">
                      <el-option v-for="item in reviewForm.selectOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="11" align="left">
                <el-form-item label="购房证明：特殊情况是否提供" class="form-item">
                    <el-select v-model="reviewForm.abnormalPurchase" placeholder="请选择" style="width:100%">
                      <el-option v-for="item in reviewForm.selectOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11" align="left">
                <el-form-item label="选择未提供证明的情况" class="form-item">
                    <el-select v-model="reviewForm.abnormalPurchase" placeholder="请选择" style="width:100%">
                      <el-option v-for="item in reviewForm.perchaseOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" class="row-bg">
              <el-col :span="24" align="left">
                <el-form-item class="form-item" label="证件&照片审核备注说明">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" v-model="reviewForm.cardDesc" placeholder="此房较为优质，建议跟进....." style="width:100%"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="view-box">
          <div class="view-box-title">
            <i class="iconfont icon-dianzhui"></i> 2. 查询执行
          </div>
          <div class="view-box-body">
            <h3 class="creditTitle">91征信查询</h3>
            <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="11" align="left">
                <el-form-item label="查询结果" class="form-item">
                    <el-select v-model="reviewForm.credit91Result" placeholder="请选择" style="width:100%;margin-bottom:15px">
                      <el-option v-for="item in reviewForm.credit91Opt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" v-model="reviewForm.credit91Desc" placeholder="请描述查询的负面结果或备注相应信息" style="width:100%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11" align="left">
                查询结果截图
              </el-col>
            </el-row>
            <h3 class="creditTitle">法海风控查询</h3>
            <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="11" align="left">
                <el-form-item label="查询结果" class="form-item">
                    <el-select v-model="reviewForm.creditFhResult" placeholder="请选择" style="width:100%;margin-bottom:15px">
                      <el-option v-for="item in reviewForm.creditOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" v-model="reviewForm.creditFhDesc" placeholder="请描述查询的负面结果或备注相应信息" style="width:100%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11" align="left">
                  查询结果截图
              </el-col>
            </el-row>
            <h3 class="creditTitle">全国法院被执行人信息查询</h3>
            <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="11" align="left">
                <el-form-item label="查询结果" class="form-item">
                    <el-select v-model="reviewForm.credit91Result" placeholder="请选择" style="width:100%;margin-bottom:15px">
                      <el-option v-for="item in reviewForm.creditOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" v-model="reviewForm.credit91Desc" placeholder="请描述查询的负面结果或备注相应信息" style="width:100%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11" align="left">
                    查询结果截图
              </el-col>
            </el-row>
            <h3 class="creditTitle">国家企业信用信息公示系统查询</h3>
            <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="11" align="left">
                <el-form-item label="查询结果" class="form-item">
                    <el-select v-model="reviewForm.creditQyResult" placeholder="请选择" style="width:100%;margin-bottom:15px">
                      <el-option v-for="item in reviewForm.creditOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" v-model="reviewForm.creditQyDesc" placeholder="请描述查询的负面结果或备注相应信息" style="width:100%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11" align="left">
                  查询结果截图
              </el-col>
            </el-row>
            <h3 class="creditTitle">启信宝企业信用查询</h3>
            <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="11" align="left">
                <el-form-item label="查询结果" class="form-item">
                    <el-select v-model="reviewForm.creditQxbResult" placeholder="请选择" style="width:100%;margin-bottom:15px">
                      <el-option v-for="item in reviewForm.creditOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" v-model="reviewForm.creditQxbDesc" placeholder="请描述查询的负面结果或备注相应信息" style="width:100%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11" align="left">
                 查询结果截图
              </el-col>
            </el-row>
            <h3 class="creditTitle">天眼查企业信息查询</h3>
            <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="11" align="left">
                <el-form-item label="查询结果" class="form-item">
                    <el-select v-model="reviewForm.creditEyeResult" placeholder="请选择" style="width:100%;margin-bottom:15px">
                      <el-option v-for="item in reviewForm.creditOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" v-model="reviewForm.creditEyeDesc" placeholder="请描述查询的负面结果或备注相应信息" style="width:100%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11" align="left">
                查询结果截图
              </el-col>
            </el-row>
            <h3 class="creditTitle">百度搜索负面信息查询</h3>
            <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="11" align="left">
                <el-form-item label="查询结果" class="form-item">
                    <el-select v-model="reviewForm.creditBdResult" placeholder="请选择" style="width:100%;margin-bottom:15px">
                      <el-option v-for="item in reviewForm.creditOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" v-model="reviewForm.creditBdDesc" placeholder="请描述查询的负面结果或备注相应信息" style="width:100%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11" align="left">
                查询结果截图
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="view-box">
          <div class="view-box-title">
            <i class="iconfont icon-dianzhui"></i> 3. 审查资料录入
          </div>
          <div class="view-box-body">
             <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="11" align="left">
                <el-form-item label="身份证有效期限" class="form-item">
                  <el-input :model="reviewForm.idcardDeadline" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11" align="left">
                <el-form-item label="第二产权人" class="form-item">
                    <el-input :model="reviewForm.secondOwner" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="11" align="left">
                <el-form-item label="贷款人共有比例" class="form-item">
                  <el-input :model="reviewForm.ownerRatio" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11" align="left">
                <el-form-item label="征信意见" class="form-item">
                    <el-select v-model="reviewForm.creditOpinion" placeholder="请选择" style="width:100%">
                      <el-option v-for="item in reviewForm.creditOpinionOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="11" align="left">
                <el-form-item label="征信是否逾期" class="form-item">
                  <el-select v-model="reviewForm.creditOverdue" placeholder="请选择" style="width:100%">
                      <el-option v-for="item in reviewForm.selectOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11" align="left">
              </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="11" align="left">
                <el-form-item label="逾期次数" class="form-item">
                  <el-input :model="reviewForm.overdueTimes" placeholder="请输入">
                    <template slot="append">次</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11" align="left">
                <el-form-item label="当前逾期金额" class="form-item">
                    <el-input :model="reviewForm.overdueMoney" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="11" align="left">
                <el-form-item label="是否有负债" class="form-item">
                  <el-select v-model="reviewForm.isDebt" placeholder="请选择" style="width:100%">
                      <el-option v-for="item in reviewForm.selectOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11" align="left">
                <el-form-item label="负债金额" class="form-item">
                    <el-input :model="reviewForm.debtMoney" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="11" align="left">
                <el-form-item label="是否有担保" class="form-item">
                  <el-select v-model="reviewForm.isEnsure" placeholder="请选择" style="width:100%">
                      <el-option v-for="item in reviewForm.selectOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="11" align="left">
                <el-form-item label="是否有当前被执行" class="form-item">
                  <el-select v-model="reviewForm.isExecute" placeholder="请选择" style="width:100%">
                      <el-option v-for="item in reviewForm.selectOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="11" align="left">
                <el-form-item label="房产证号" class="form-item">
                    <el-input :model="reviewForm.ownershipId" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11" align="left">
                <el-form-item label="建筑面积" class="form-item">
                  <el-input :model="reviewForm.ownershipArea" placeholder="请输入">
                    <template slot="append">㎡</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="11" align="left">
                <h3 class="">判定是否非标</h3>
                <el-row type="flex" class="row-bg" justify="space-between">
                  <el-col :span="11" align="left">
                    <el-form-item label="判定结果" class="form-item">
                      <el-select v-model="reviewForm.iSnonStandard" placeholder="请选择" style="width:100%">
                          <el-option v-for="item in reviewForm.selectOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11" align="left">
                    <el-form-item label="高层审核意见" class="form-item">
                      <el-select v-model="reviewForm.iSnonStandardOpinion" placeholder="请选择" style="width:100%">
                          <el-option v-for="item in reviewForm.selectOpinionOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-between">
                  <el-col :span="24" align="left">
                    <p>审核意见截图</p>
                  </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-between">
                  <el-col :span="24" align="left">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="备注信息" :model="reviewForm.iSnonStandardOpinionNote"></el-input>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="11" align="left">
                <h3 class="">判定是否大额</h3>
                <el-row type="flex" class="row-bg" justify="space-between">
                  <el-col :span="11" align="left">
                    <el-form-item label="判定结果" class="form-item">
                      <el-select v-model="reviewForm.iSbigMoney" placeholder="请选择" style="width:100%">
                          <el-option v-for="item in reviewForm.selectOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="11" align="left">
                    <el-form-item label="高层审核意见" class="form-item">
                      <el-select v-model="reviewForm.iSbigMoneyOpinion" placeholder="请选择" style="width:100%">
                          <el-option v-for="item in reviewForm.selectOpinionOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-between">
                  <el-col :span="24" align="left">
                    <p>审核意见截图</p>
                  </el-col>
                </el-row>
                <el-row type="flex" class="row-bg" justify="space-between">
                  <el-col :span="24" align="left">
                    <el-form-item label="判定结果" class="form-item">
                      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="备注信息" :model="reviewForm.iSBigMoneyOpinionNote"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <h3>婚史执行及其他</h3>
            <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="24" align="left">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="备注信息" :model="reviewForm.iSBigMoneyOpinionNote"></el-input>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-main>
    </el-container>
</template>
<script>
export default {
  data () {
    return {
      reviewForm: {
        selectOpt: [
          {label: '否', value: '0'},
          {label: '是', value: '1'}
        ],
        selectOpinionOpt: [
          {label: '拒绝', value: '0'},
          {label: '通过', value: '1'}
        ],
        perchaseOpt: [ // 未提供证明的情况
          {label: '经适房或回迁房', value: '0'},
          {label: '非首婚涉及产权', value: '1'},
          {label: '继承或者赠与', value: '2'}
        ],
        creditOpt: [ // 征信查询结果
          {label: '正常', value: '0'},
          {label: '异常', value: '1'}
        ],
        romeNote: '',
        creditNote: '',
        abnormalIDcard: '', // 身份证
        abnormalMarrCard: '', // 结婚证
        abnormalBooklet: '', // 户口本
        abnormalCredit: '', // 征信报告
        abnormalRoom: '', // 房本
        abnormalYidi: '', // 一抵证明
        abnormalPurchase: '', // 购房证明
        cardDesc: '', // 证件&照片审核备注说明
        credit91Result: '', // 描述91查询负面结果
        credit91Desc: '', // 描述91查询负面结果备注
        creditHfResult: '', // 描述法海风控查询负面结果
        creditHfDesc: '', // 描述法海风控查询负面结果备注
        creditFyResult: '', // 描述全国法院被执行人信息查询负面结果
        creditFyDesc: '', // 描述全国法院被执行人信息查询负面结果备注
        creditQyResult: '', // 描述国家企业信用信息公示系统查询负面结果
        creditQyDesc: '', // 描述国家企业信用信息公示系统查询负面结果备注
        creditQxbResult: '', // 描述启信宝企业信用查询负面结果
        creditQxbDesc: '', // 描述启信宝企业信用查询负面结果备注
        creditEyeResult: '', // 描述天眼查企业信息查询负面结果
        creditEyeDesc: '', // 描述天眼查企业信息查询负面结果备注
        creditBdResult: '', // 描述百度搜索查询负面结果
        creditBdDesc: '' // 描述百度搜索查询负面结果备注
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import "~@/style/color";
@import url('//at.alicdn.com/t/font_525204_u1yy790eizmvaemi.css');
.view-container {
  padding-top:5px;
    table {
        width: 100%;
        border-collapse: collapse;
        border: none;
        caption {
            padding: 0 5px;
            line-height: 40px;
            background-color: #96c9ff;
            text-align: left;
            color: @white
        }
        th,td {
            padding:5px 10px;
            line-height: 30px;
            border:1px solid #d1d1d1;
            text-align: left;
        }
        th {
            background-color:#e2e7ed;
            font-weight: normal;
            .title {
              color: @blue
            }
        }
        td {
            background-color:#eef1f4;
            color: #999
        }
        .imgInfo{
            width: 200px;
            height: 150px;
            text-align: center;
            font-size: 12px;
            img {
              width: 100%;
            }
        }
    }
    .table-view {
      margin-top: 20px
    }
    .view-items {
        padding: 15px 0;
        li {
            float:left;
            width:50%;
            line-height:40px;
            text-align: left;
        }
    }
    .view-box {
      padding: 15px 0;
      .view-box-title {
        padding-top:10px;
        line-height: 30px;
        border-bottom: 1px solid #96c9ff;
        color: @blue;
        text-align: left;
        font-size: 16px
      }
      .creditTitle {
        padding-top:15px;
        line-height:40px;
        text-align:left;
        font-weight: bold;
        font-size: 14px
      }
    }
}
.tollyList {
  display: flex;
  .item {
    padding-right: 20px;
    line-height:30px;
    span {
      padding:3px 20px;
      background-color: #f5f7fa;
      border: 1px solid #e4e7ed;
      color: #c0c4cc;
    }
  }
}
.advanceMoney {
  padding-top: 10px;
}
</style>

