<template>
  <div>
    <van-picker
      title="更新性别"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import { UpdateUserInfoAPI } from '@/api'
export default {
  data() {
    return {
      columns: ['男', '女'],
      sex: 1
    }
  },
  methods: {
    onCancel() {
      this.$parent.$parent.isShowSex = false
    },
    onConfirm(value, index) {
      this.sex = index
      this.UpdateUserInfo()
      this.$parent.$parent.isShowSex = false
    },
    async UpdateUserInfo() {
      try {
        await UpdateUserInfoAPI({ gender: this.sex })
        this.$emit('update:sex', this.columns[this.sex])
        this.$toast.success('修改性别成功')
      } catch (error) {
        if (error) {
          this.$toast.fail('更新失败')
        }
      } finally {
        this.$parent.$parent.isShowSex = false
      }
    }
  }
}
</script>

<style></style>
