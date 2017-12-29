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
            <i class="iconfont icon-dianzhui"></i> 进度状态
          </div>
          <div class="view-box-body">
            <table class="table-view">
              <tbody>
                <tr>
                  <th>申请编号</th>
                  <td>FC0001</td>
                  <th>申请时间</th>
                  <td>2017/11/17 14:50:45</td>
                  <th>当前状态</th>
                  <td>审核不通过</td>
                  <th>与授信额度</th>
                  <td>850万元</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="view-box">
          <div class="view-box-title">
            <i class="iconfont icon-dianzhui"></i> 客户基本信息
          </div>
          <div class="view-box-body">
            <table class="table-view">
              <tbody>
                <tr>
                  <th>申请人姓名</th>
                  <td>刘柳</td>
                  <th>性别</th>
                  <td>女</td>
                  <th>手机号</th>
                  <td>1365435777</td>
                </tr>
                <tr>
                  <th>身份证号</th>
                  <td>4416435354553554534</td>
                  <th>婚姻状况</th>
                  <td>已婚</td>
                  <th>职业</th>
                  <td>工薪族</td>
                </tr>
                <tr>
                  <th>个人收入等级</th>
                  <td>大于20000元</td>
                  <th>通讯地址</th>
                  <td>深圳市南山区鹏海花园</td>
                  <th></th>
                  <td></td>
                </tr>
                <tr>
                  <th>身份证影像资料</th>
                  <td colspan="5">
                    <el-row type="flex">
                      <el-col :span="4">
                        <div class="imgInfo">
                          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514476244976&di=6520831672106dd976bec21a459eec77&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20130530%2FImg377522814.jpg">
                          <p>身份证国徽面</p>
                        </div>
                      </el-col>
                      <el-col :offset="3" :span="4">
                        <div class="imgInfo">
                          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514476244976&di=6520831672106dd976bec21a459eec77&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20130530%2FImg377522814.jpg">
                          <p>房产证个人信息面</p>
                        </div>
                      </el-col>
                    </el-row>
                  </td>
                </tr>
                <tr>
                  <th>房产证影像资料</th>
                  <td colspan="5">
                    <el-row type="flex">
                      <el-col :span="4">
                        <div class="imgInfo">
                          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514476244976&di=6520831672106dd976bec21a459eec77&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20130530%2FImg377522814.jpg">
                          <p>房产证照-1</p>
                        </div>
                      </el-col>
                      <el-col :offset="3" :span="4">
                        <div class="imgInfo">
                          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514476244976&di=6520831672106dd976bec21a459eec77&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20130530%2FImg377522814.jpg">
                          <p>房产证照-2</p>
                        </div>
                      </el-col>
                    </el-row>
                  </td>
                </tr>
                <tr>
                  <th>客户经理手机号</th>
                  <td>15833456342</td>
                  <th>工行客户经理营销代码</th>
                  <td>100001</td>
                  <th></th>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="view-box">
          <div class="view-box-title">
            <i class="iconfont icon-dianzhui"></i> 贷款申请表信息
          </div>
          <div class="view-box-body">
            <table class="table-view">
              <tbody>
                <tr>
                  <th colspan="6">
                    <p class="title"><i class="iconfont icon-dot"></i> 贷款需求</p>
                  </th>
                </tr>
                <tr>
                  <th>贷款申请金额</th>
                  <td>200万元</td>
                  <th>贷款期限</th>
                  <td>24个月</td>
                  <th>贷款关心方面</th>
                  <td>利率</td>
                </tr>
                <tr>
                  <th colspan="6">
                    <p class="title"><i class="iconfont icon-dot"></i> 欲抵押房产信息</p>
                  </th>
                </tr>
                <tr>
                  <th>贷款人与产权人关系</th>
                  <td>本人</td>
                  <th>房屋所在小区位置</th>
                  <td>北京市东城区</td>
                  <th>小区名称</th>
                  <td>北京市东城去炫特嘉园</td>
                </tr>
                <tr>
                  <th>房屋性质</th>
                  <td>住宅</td>
                  <th>建筑面积</th>
                  <td>120平米</td>
                  <th>建成/竣工年份</th>
                  <td>2003年</td>
                </tr>
                <tr>
                  <th>房产户型</th>
                  <td>3室2厅1卫</td>
                  <th>朝向</th>
                  <td>东</td>
                  <th>房产楼层/总楼层</th>
                  <td>4层/共32层</td>
                </tr>
                <tr>
                  <th>房屋状态</th>
                  <td>自用</td>
                  <th>房产特色</th>
                  <td>满五唯一，精装，重点学区房</td>
                  <th>&nbsp;</th>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <th colspan="6">
                    <p class="title"><i class="iconfont icon-dot"></i> 贷款用途</p>
                  </th>
                </tr>
                <tr>
                  <th>本次借款用途</th>
                  <td>个人和家庭消费</td>
                  <th>还款来源</th>
                  <td>工薪收入</td>
                  <th>访谈告知</th>
                  <td>清楚</td>
                </tr>
                <tr>
                  <th colspan="6">
                    <p class="title"><i class="iconfont icon-dot"></i> 工行客户经理意见</p>
                  </th>
                </tr>
                <tr>
                  <th>客户来源</th>
                  <td>普通客户</td>
                  <th>意见</th>
                  <td>不推荐</td>
                  <th>客户经理</th>
                  <td>赵景明</td>
                </tr>
                <tr>
                  <th>手机号码</th>
                  <td>158225522222</td>
                  <th>营销代码</th>
                  <td>100001</td>
                  <th>支行</th>
                  <td>北京测试支行</td>
                </tr>
                <tr>
                  <th>网点</th>
                  <td>北京测试网点</td>
                  <th>推荐时间</th>
                  <td>2017/11/17 15:33:07</td>
                  <th>&nbsp;</th>
                  <td>&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="view-box">
          <div class="view-box-title">
            <i class="iconfont icon-dianzhui"></i> 大数据认证
          </div>
          <div class="view-box-body">
            <table class="table-view">
              <tbody>
                <tr>
                  <th colspan="6">
                    <p class="title"><i class="iconfont icon-dot"></i>  链家快出价（万元）【已获取】</p>
                  </th>
                </tr>
                <tr>
                  <th>估价结果</th>
                  <td>743.24</td>
                  <th>估价区间</th>
                  <td>706.08 ~ 780.41</td>
                </tr>
                <tr>
                  <th>估价单价</th>
                  <td>7.43/㎡</td>
                  <th>环比上月</th>
                  <td>+0.8%</td>
                </tr>
                <tr>
                  <th>录入第三方机构评估值</th>
                  <td colspan="3">
                    <ul class="tollyList">
                      <li class="item">世联: <span>720</span> 万元</li>
                      <li class="item">世联: <span>740</span> 万元</li>
                    </ul>
                    <p class="advanceMoney">系统评估预授权额度为：504万元</p>
                  </td>
                </tr>
                <tr>
                  <th colspan="6">
                    <p class="title"><i class="iconfont icon-dot"></i>  黑名单验证【验证通过】</p>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <el-row type="flex" class="row-bg">
          <el-col :span="24" align="left">
            <el-form-item label="选择评房结果" class="form-item">
                <el-select v-model="reviewForm.evaluationResult" placeholder="请选择" style="width:100%">
                  <el-option v-for="item in reviewForm.evaluationOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="24" align="left">
            <el-form-item class="form-item" label="评房备注">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" v-model="reviewForm.infoDesc" placeholder="此房较为优质，建议跟进....." style="width:100%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
</template>
<script>
export default {
  data () {
    return {
      reviewForm: {
        evaluationResult: '',
        evaluationOptions: [
          {label: '拒绝', value: '0'},
          {label: '通过', value: '1'}
        ],
        infoDesc: ''
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

