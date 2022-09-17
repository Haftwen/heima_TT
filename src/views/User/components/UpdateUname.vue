<template>
  <div>
    <!-- 顶部导航 -->
    <van-nav-bar
      title="更新昵称"
      left-text="取消"
      right-text="保存"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      left-arrow
    />
    <!-- 文本输入 -->
    <van-field
      v-model="uname"
      rows="2"
      autosize
      type="textarea"
      maxlength="11"
      show-word-limit
    />
  </div>
</template>

<script>
import { UpdateUserInfoAPI } from '@/api'
export default {
  data() {
    return {
      uname: ''
    }
  },
  methods: {
    onClickLeft() {
      this.$parent.$parent.isShowName = false
    },
    onClickRight() {
      this.UpdateUserInfo()
    },
    async UpdateUserInfo() {
      await UpdateUserInfoAPI({ name: this.uname })
      //   更新名字
      this.$emit('update:nickName', this.uname)
      this.$parent.$parent.isShowName = false
    }
  }
}
</script>

<style></style>
