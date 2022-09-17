<template>
  <div>
    <!-- 导航条 -->
    <van-nav-bar
      class="navbar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 信息修改 -->
    <van-cell title="头像" is-link @click="$refs.file.click()"
      ><van-image round width="0.8rem" height="0.8rem" :src="avator"
    /></van-cell>
    <!-- 昵称性别生日 -->
    <van-cell title="昵称" is-link @click="UpName" :value="nickName"></van-cell>
    <van-cell title="性别" is-link @click="isShowSex = true" :value="sex">
    </van-cell>
    <van-cell title="生日" is-link @click="isShowAge = true" :value="birthday">
    </van-cell>
    <!-- 1.点击修改头像选择图片 -->
    <!-- 更新头像选择文件得部分 利用iput file的属性 然后利用属性hidden隐藏  然后注册点击事件 通过ref获取元素-->
    <!-- accept 规定文件选择的类型 -->
    <input
      type="file"
      hidden
      ref="file"
      accept=".png,.jpg,.pdf"
      @change="selectPic"
    />
    <!-- 2.通过change事件知道用户操作了,然后获取用户选择的图片,根据用户选择的图片去渲染我们的组件 -->
    <!-- 选择的图片被保存在两个位置 1.file.value属性上(绝对路径会有坑) 另一个就是files伪数组里,保存的file对象
      multiple多倍可以传多张,但是不需要,所以伪数组索引为一的就是文件的二进制对象 -->
    <!-- 3.如何将file对象转成base64 -->
    <!-- 1.FileReader:文件阅读器 -->
    <!-- const fr = new FileReader()  接收结果 异步操作需要onload fr.onload= (e) => { e.target.result /*base64*/}-->
    <!-- 更新头像的弹出层 -->
    <van-popup
      v-model="isShow"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!-- 抽离弹出层代码结构美观 -->
      <!-- bug2防止图片不更新 让插件生成的内容每次都销毁再创建 -->
      <update-avator
        v-if="isShow"
        :photo="photo"
        :avator.sync="avator"
      ></update-avator>
    </van-popup>
    <!-- 更新昵称的弹出层 -->
    <van-popup
      v-model="isShowName"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-uname :nickName.sync="nickName"></update-uname>
    </van-popup>
    <!-- 更新性别的弹出层 -->
    <van-popup v-model="isShowSex" position="bottom" :style="{ height: '45%' }">
      <update-sex :sex.sync="sex"></update-sex>
    </van-popup>
    <!-- 更新年龄的弹层 -->
    <van-popup v-model="isShowAge" position="bottom" :style="{ height: '45%' }">
      <update-age :birthday.sync="birthday"></update-age>
    </van-popup>
  </div>
</template>

<script>
import UpdateAvator from './components/UpdateAvator.vue'
import UpdateUname from './components/UpdateUname.vue'
import UpdateSex from './components/UpdateSex.vue'
import UpdateAge from './components/UpdateAge.vue'
import { getUserInfoAPI } from '@/api'
import { resolveToBase64 } from '@/utils'
// 上传图片
// import { uploadPhotoAPI } from '@/api'
export default {
  components: {
    UpdateAvator,
    UpdateUname,
    UpdateSex,
    UpdateAge
  },
  data() {
    return {
      isShow: false,
      photo: '',
      avator: '',
      isShowName: false,
      isShowSex: false,
      isShowAge: false,
      nickName: '',
      sex: '',
      sexList: ['男', '女'],
      birthday: ''
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async selectPic() {
      // 获取用户file的二进制对象 把二进制对象转成base64 src也能识别它
      const file = this.$refs.file.files[0]
      // 封装成函数调用
      // const fr = new FileReader()
      // fr.readAsDataURL(file)
      // fr.onload = (e) => {
      //   console.log(e.target.result)
      // }
      const base64 = await resolveToBase64(file)
      // 传递传完开弹窗
      this.photo = base64
      this.isShow = true
      // 解决不能同时选中一张图的bug
      this.$refs.file.value = ''
    },
    UpName() {
      this.isShowName = true
    },
    async getUserInfo() {
      const { data } = await getUserInfoAPI()
      this.avator = data.data.photo
      this.nickName = data.data.name
      this.sex = this.sexList[data.data.gender]
      this.birthday = data.data.birthday
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  background: #3296fa;
  /deep/.van-nav-bar__title {
    color: #fff;
  }
  /deep/.van-icon {
    color: #fff;
  }
}
</style>
