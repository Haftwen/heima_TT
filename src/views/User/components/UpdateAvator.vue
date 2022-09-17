<template>
  <div class="update-avatar">
    <!-- 这个只是作为处理图片的地方使用 -->
    <img :src="photo" alt="" ref="image" />
    <div class="toolbar">
      <span>取消</span>
      <span @click="confirm">完成</span>
    </div>
  </div>
</template>

<script>
// 裁剪图片插件
// 更新用户的头像
// - 给服务器传一张图片
// - 服务器会返回给一个图片的地址

// 要的表单, 那么就必须传表单 由于传统表单只有post和get所以我们需要模拟一个表单
// FormData --> 通过js模拟表单数据
// const fm = new FormData(). fm.append('name','value')
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
// 导入请求，发送我们处理完的图片到后台拿图片地址
import { uploadPhotoAPI } from '@/api'
export default {
  props: {
    photo: {
      type: String,
      require: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.myCropper = new Cropper(this.$refs.image, {
        viewMode: 1,
        dragMode: 'none',
        initialAspectRatio: 1,
        aspectRatio: 1,
        preview: '.before',
        background: false,
        autoCropArea: 0.6,
        zoomOnWheel: false
      })
    },
    confirm() {
      this.myCropper.getCroppedCanvas().toBlob(async (blob) => {
        const { data } = await uploadPhotoAPI(blob)
        // 更新src
        this.$emit('update:avator', data.data.photo)
        // 上传完成更新完头像关闭弹层弹层（图片的....）
        this.$parent.$parent.isShow = false
      })
    }
  }
}
</script>

<style scoped lang="less">
.update-avatar {
  background: #000;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 65%;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    z-index: 9999;
  }
  .toolbar {
    position: fixed;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    color: #fff;
    padding: 0 15px;
    box-sizing: border-box;
  }
}
</style>
