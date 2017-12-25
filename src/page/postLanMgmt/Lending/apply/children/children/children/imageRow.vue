<template>
  <el-row class="collapse-row image-row">
    <el-col :span="3" v-for="(item, idx) in img" :key="idx" class="p10 imgBox">
      <div class="img">
        <img :src="item.url" alt="" class="upload" @click="handlePreModify(item, idx)">
        <img v-if="entering" src="../../../../../../../assets/delete_img.jpg" alt="" class="delete" @click="handleDelete(item, idx)">
      </div>
      <div>{{item.name}}</div>
      <div>{{item.note ? '备注：'+ item.note : ''}}</div>
    </el-col>
    <el-col :span="6" v-if="entering" class="uploadBox p10">
    <!--<el-col v-if="entering" >-->
      <el-upload
        drag
        ref="upload"
        action="/LoanApplyPhoto/addImageData"
        :data="form"
        :auto-upload="false"
        :show-file-list="false"
        list-type="picture"
        :on-change="handleChange"
        :on-success="handleSuccess"
        :on-error="handleError"
        :before-upload="beforeAvatarUpload"
        @click.native="ready = true">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-col>
  </el-row>
</template>
<script>
import {
  deletePhoto,
  updataImgData
} from '@/service/getData'
export default {
  name: 'imageRow',
  props: ['data', 'id', 'entering', 'upload'],
  data () {
    return {
      img: this.data.data,
      ready: true,
      form: {
        applyId: this.id,
        name: '',
        note: ''
      },
      modify: {}
    }
  },
  watch: {
    data (value) {
      this.img = value.data
    },
    id (value) {
      this.form.applyId = value
    },
    upload (value) {
      if (value.type === this.data.title) {
        this.form.name = value.name
        this.form.note = value.note
        this.form.type = value.type
        if (value.modify) {
          this.form.photoId = value.photoId
          this.handleModify()
        } else {
          this.handleSubmit()
        }
      }
    }
  },
  methods: {
    beforeAvatarUpload (file) {
      const imgType = (file.type === 'image/jpeg' || file.type === 'image/png')
      const imgSize = file.size / 1024 < 500

      if (!imgType) {
        this.$message.error('图片只能是 JPG、PNG 格式!')
      }
      if (!imgSize) {
        this.$message.error('图片大小不能超过 500kb!')
      }
      return imgType && imgSize
    },
    handleChange (file, fileList) { // 选择图片完成
      if (this.ready) {
        let imgDialog = {
          show: true,
          file: file.url,
          type: this.data.title
        }
        const len = fileList.length
        if (len !== 1) {
          fileList.splice(0, 1)
        }
        this.$emit('on-pre-upload', imgDialog)
      }
    },
    handleSubmit () { // 图片上传
      this.$refs.upload.submit()
    },
    handleSuccess (resp) {  // 图片上传成功
      this.ready = false
      if (resp.success) {
        this.$notify.success({
          title: '上传成功',
          message: resp.message
        })
        if (resp.success) {
          this.img.push(resp.data)
        }
      } else {
        this.$notify.error({
          title: '上传失败',
          message: resp.message
        })
      }
      this.form.name = ''
      this.form.note = ''
    },
    handleError (err) { // 图片上传失败
      this.SET_IMG_DIALOG({ loading: false })
      this.$notify.error({
        title: '失败',
        message: err.message
      })
    },
    handleDelete (file, idx) {  // 删除图片
      deletePhoto(file.photoId)
        .then(resp => {
          if (resp.success) {
            this.$notify({
              title: '成功',
              message: '图片删除成功',
              type: 'success'
            })
            this.img.splice(idx, 1)
          }
        })
    },
    handleComplete () { // 上传处理
      if (!this.img.length) {
        this.$message({
          showClose: true,
          message: `请上传${this.data.title}`,
          type: 'error'
        })
        return false
      }
      return true
    },
    handlePreModify (file, idx) { // 通知修改图片名称及备注
      if (this.entering) {
        let imgDialog = {
          show: true,
          file: file.url,
          type: this.data.title,
          name: file.name,
          note: file.note,
          modify: true
        }
        this.modify = {
          photoId: file.photoId,
          index: idx
        }
        this.$emit('on-pre-upload', imgDialog)
      }
    },
    handleModify () { // 修改图片名称及备注
      let form = {}
      let type, title, message
      Object.assign(form, this.form, this.modify)
      updataImgData(form)
        .then(resp => {
          if (resp.success) {
            this.img.splice(this.modify.index, 1, resp.data)
            type = 'success'
            title = '成功'
            message = '更新图片成功'
          } else {
            throw new Error(resp.message)
          }
        })
        .catch(err => {
          console.log(err)
          type = 'error'
          title = '失败'
          message = err.name === 'Error' ? err.message : err.response.data.message
        })
        .then(() => {
          this.$notify({
            title,
            message,
            type
          })
          if (type === 'success') { // 成功后初始化modify
            this.modify = {}
          }
        })
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
.uploadBox {
  display: inline-block;
  text-align: center;
}
.el-upload-dragger {
  width: 100% !important;
}
.p10 {
  padding: 10px !important;
}
.imgBox {
  height: 250px;
}
</style>
