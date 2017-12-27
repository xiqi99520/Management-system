<template>
  <el-form class="detailForm">
    <el-form-item>
      <h3 class="detailForm-title detail-span">影像资料</h3>
    </el-form-item>
    <el-form-item class="detailForm-item">
      <!-- 贷款证明 -->
      <el-row class="collapse-row collapse-row-top" :class="{'collapse-row-bottom': imgs.loan.show}">
        <el-col :span="12">
          <span :class="{ needs:other.write}">{{imgs.loan.title}}</span>
          <span class="desc">(建议格式: JPG)</span>
        </el-col>
        <el-col :span="12">
          <el-button type="text" @click="handleCollapse(imgs.loan)">{{collapseText(imgs.loan.show)}}</el-button>
        </el-col>
      </el-row>
      <el-collapse-transition>
        <div v-show="imgs.loan.show">
          <image-row
            ref="loan"
            :data="imgs.loan"
            :id="applyId"
            :entering="other.write"
            :upload="upload"
            @on-pre-upload="handelPreUpload">
          </image-row>
          </div>
      </el-collapse-transition>
      <!-- 征信报告 -->
      <el-row class="collapse-row collapse-row-top" :class="{'collapse-row-bottom': imgs.credit.show}">
        <el-col :span="12">
          <span :class="{ needs:other.write}">征信报告</span>
          <span class="desc">(建议格式: PDF,JPG)</span>
        </el-col>
        <el-col :span="12">
          <el-button type="text" @click="handleCollapse(imgs.credit)">{{collapseText(imgs.credit.show)}}</el-button>
        </el-col>
      </el-row>
      <el-collapse-transition>
        <div v-show="imgs.credit.show">
          <image-row
            ref="credit"
            :data="imgs.credit"
            :id="applyId"
            :entering="other.write"
            :upload="upload"
            @on-pre-upload="handelPreUpload">
          </image-row>
        </div>
      </el-collapse-transition>
      <!-- 身份证明 -->
      <el-row class="collapse-row collapse-row-top" :class="{'collapse-row-bottom': imgs.identity.show}">
        <el-col :span="12">
          <span :class="{ needs:other.write}">身份证明</span>
          <span class="desc">(建议格式: JPG)</span>
        </el-col>
        <el-col :span="12">
          <el-button type="text" @click="handleCollapse(imgs.identity)">{{collapseText(imgs.identity.show)}}</el-button>
        </el-col>
      </el-row>
      <el-collapse-transition>
        <div v-show="imgs.identity.show">
          <keep-alive>
          <image-row
            ref="identity"
            :data="imgs.identity"
            :id="applyId"
            :entering="other.write"
            :upload="upload"
            @on-pre-upload="handelPreUpload">
          </image-row>
          </keep-alive>
        </div>
      </el-collapse-transition>
      <!-- 居住证明 -->
      <el-row class="collapse-row collapse-row-top" :class="{'collapse-row-bottom': imgs.residence.show}">
        <el-col :span="12">
          <span :class="{ needs:other.write}">居住证明</span>
          <span class="desc">(建议格式: JPG)</span>
        </el-col>
        <el-col :span="12">
          <el-button type="text" @click="handleCollapse(imgs.residence)">{{collapseText(imgs.residence.show)}}</el-button>
        </el-col>
      </el-row>
      <el-collapse-transition>
        <div v-show="imgs.residence.show">
          <image-row
            ref="residence"
            :data="imgs.residence"
            :id="applyId"
            :entering="other.write"
            :upload="upload"
            @on-pre-upload="handelPreUpload">
          </image-row>
        </div>
      </el-collapse-transition>
      <!-- 资产证明 -->
      <el-row class="collapse-row collapse-row-top" :class="{'collapse-row-bottom': imgs.asset.show}">
        <el-col :span="12">
          <span :class="{ needs:other.write}">资产证明</span>
          <span class="desc">(建议格式: JPG)</span>
        </el-col>
        <el-col :span="12">
          <el-button type="text" @click="handleCollapse(imgs.asset)">{{collapseText(imgs.asset.show)}}</el-button>
        </el-col>
      </el-row>
      <el-collapse-transition>
        <div v-show="imgs.asset.show">
          <image-row
            ref="asset"
            :data="imgs.asset"
            :id="applyId"
            :entering="other.write"
            :upload="upload"
            @on-pre-upload="handelPreUpload">
          </image-row>
        </div>
      </el-collapse-transition>
      <!-- 工作证明 -->
      <el-row class="collapse-row collapse-row-top" :class="{'collapse-row-bottom': imgs.work.show}">
        <el-col :span="12">
          <span>工作证明</span>
          <span class="desc">(建议格式: JPG)</span>
        </el-col>
        <el-col :span="12">
          <el-button type="text" @click="handleCollapse(imgs.work)">{{collapseText(imgs.work.show)}}</el-button>
        </el-col>
      </el-row>
      <el-collapse-transition>
        <div v-show="imgs.work.show">
          <image-row
            :data="imgs.work"
            :id="applyId"
            :entering="other.write"
            :upload="upload"
            @on-pre-upload="handelPreUpload">
          </image-row>
        </div>
      </el-collapse-transition>
      <!-- 收入证明 -->
      <el-row class="collapse-row collapse-row-top" :class="{'collapse-row-bottom': imgs.certificate.show}">
        <el-col :span="12">
          <span>收入证明</span>
          <span class="desc">(建议格式: JPG)</span>
        </el-col>
        <el-col :span="12">
          <el-button type="text" @click="handleCollapse(imgs.certificate)">{{collapseText(imgs.certificate.show)}}</el-button>
        </el-col>
      </el-row>
      <el-collapse-transition>
        <div v-show="imgs.certificate.show">
          <image-row
            :data="imgs.certificate"
            :id="applyId"
            :entering="other.write"
            :upload="upload"
            @on-pre-upload="handelPreUpload">
          </image-row>
        </div>
      </el-collapse-transition>
      <!-- 合同类 -->
      <el-row class="collapse-row collapse-row-top" :class="{'collapse-row-bottom': imgs.contract.show}">
        <el-col :span="12">
          <span :class="{ needs:other.write}">合同类</span>
          <span class="desc">(建议格式: PDF)</span>
        </el-col>
        <el-col :span="12">
          <el-button type="text" @click="handleCollapse(imgs.contract)">{{collapseText(imgs.contract.show)}}</el-button>
        </el-col>
      </el-row>
      <el-collapse-transition>
        <div v-show="imgs.contract.show">
          <image-row
            ref="contract"
            :data="imgs.contract"
            :id="applyId"
            :entering="other.write"
            :upload="upload"
            @on-pre-upload="handelPreUpload">
          </image-row>
        </div>
      </el-collapse-transition>
      <!-- 外访类材料 -->
      <el-row class="collapse-row collapse-row-top" :class="{'collapse-row-bottom': imgs.outside.show}">
        <el-col :span="12">
          <span :class="{ needs:other.write}">外访类材料</span>
          <span class="desc">(建议格式: JPG)</span>
        </el-col>
        <el-col :span="12">
          <el-button type="text" @click="handleCollapse(imgs.outside)">{{collapseText(imgs.outside.show)}}</el-button>
        </el-col>
      </el-row>
      <el-collapse-transition>
        <div v-show="imgs.outside.show">
          <image-row
            ref="outside"
            :data="imgs.outside"
            :id="applyId"
            :entering="other.write"
            :upload="upload"
            @on-pre-upload="handelPreUpload">
          </image-row>
        </div>
      </el-collapse-transition>
      <!-- 其他 -->
      <el-row class="collapse-row collapse-row-top collapse-row-bottom">
        <el-col :span="12">
          <span>其他</span>
          <span class="desc">(建议格式: JPG)</span>
        </el-col>
        <el-col :span="12">
          <el-button type="text" @click="handleCollapse(imgs.other)">{{collapseText(imgs.other.show)}}</el-button>
        </el-col>
      </el-row>
      <el-collapse-transition>
        <div v-show="imgs.other.show">
          <image-row
            class="collapse-row-bottom"
            :data="imgs.other"
            :id="applyId"
            :entering="other.write"
            :upload="upload"
            @on-pre-upload="handelPreUpload">
          </image-row>
        </div>
      </el-collapse-transition>
    </el-form-item>
  </el-form>
</template>
<script>
import imageRow from './children/imageRow'
export default {
  name: 'imageTable',
  props: ['data', 'other', 'upload'],
  components: {
    imageRow
  },
  data () {
    return {
      applyId: '',
      Data: this.data,
      imgs: {
        loan: { // 贷款证明
          title: '贷款证明',
          show: true,
          data: []
        },
        credit: { // 征信报告
          title: '征信报告',
          show: true,
          data: []
        },
        identity: { // 身份证明
          title: '身份证明',
          show: true,
          data: []
        },
        residence: { // 居住证明
          title: '居住证明',
          show: true,
          data: []
        },
        asset: { // 资产证明
          title: '资产证明',
          show: true,
          data: []
        },
        work: { // 工作证明
          title: '工作证明',
          show: true,
          data: []
        },
        certificate: { // 收入证明
          title: '收入证明',
          show: true,
          data: []
        },
        contract: { // 合同类
          title: '合同类',
          show: true,
          data: []
        },
        outside: { // 外访类材料
          title: '外访类材料',
          show: true,
          data: []
        },
        other: { // 其他
          title: '其他',
          show: true,
          data: []
        }
      },
      fileList: []
    }
  },
  watch: {
    data (value) {
      this.Data = value
      this.imgs = {
        loan: { // 贷款证明
          title: '贷款证明',
          show: true,
          data: []
        },
        credit: { // 征信报告
          title: '征信报告',
          show: true,
          data: []
        },
        identity: { // 身份证明
          title: '身份证明',
          show: true,
          data: []
        },
        residence: { // 居住证明
          title: '居住证明',
          show: true,
          data: []
        },
        asset: { // 资产证明
          title: '资产证明',
          show: true,
          data: []
        },
        work: { // 工作证明
          title: '工作证明',
          show: true,
          data: []
        },
        certificate: { // 收入证明
          title: '收入证明',
          show: true,
          data: []
        },
        contract: { // 合同类
          title: '合同类',
          show: true,
          data: []
        },
        outside: { // 外访类材料
          title: '外访类材料',
          show: true,
          data: []
        },
        other: { // 其他
          title: '其他',
          show: true,
          data: []
        }
      }
      this.Data.map(item => {
        if (item.type === '贷款证明') {
          this.imgs.loan.data.push(item)
        } else if (item.type === '征信报告') {
          this.imgs.credit.data.push(item)
        } else if (item.type === '身份证明') {
          this.imgs.identity.data.push(item)
        } else if (item.type === '居住证明') {
          this.imgs.residence.data.push(item)
        } else if (item.type === '资产证明') {
          this.imgs.asset.data.push(item)
        } else if (item.type === '工作证明') {
          this.imgs.work.data.push(item)
        } else if (item.type === '收入证明') {
          this.imgs.certificate.data.push(item)
        } else if (item.type === '合同类') {
          this.imgs.contract.data.push(item)
        } else if (item.type === '外访类材料') {
          this.imgs.outside.data.push(item)
        } else { // 其他
          this.imgs.other.data.push(item)
        }
      })
      if (value.upload) {
        this.Data[value.type].upload = value.upload
      }
    },
    other (value) {
      this.applyId = value.applyId
    }
  },
  methods: {
    collapseText (show) {
      if (show) {
        return '收起'
      } else {
        return '展开'
      }
    },
    handleCollapse (data) {
      data.show = !data.show
      this.$emit('on-collapse', true)
    },
    handelPreUpload (data) { // 预上传
      this.$emit('on-pre', data)
    },
    handleComplete () { // 提交验证函数
      for (let ref of Object.values(this.$refs)) {
        if (!ref.handleComplete()) {
          return false
        }
      }
      return true
    }
  }
}
</script>
<style lang="less" scoped>
@import "~@/style/lendingApplyDetail";
.desc {
  color: @red;
  font-weight: normal;
  margin-left: 10px;
}
</style>
