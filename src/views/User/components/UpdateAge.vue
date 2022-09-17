<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
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
      minDate: new Date(1900, 1, 1),
      maxDate: new Date(2023, 12, 12),
      currentDate: new Date(1999, 1, 18),
      date: ''
    }
  },
  methods: {
    onCancel() {
      this.$parent.$parent.isShowAge = false
    },
    onConfirm(value, index) {
      const year = value.getFullYear()
      const day = value.getDate() < 10 ? `0${value.getDate()}` : value.getDate()
      const month =
        value.getMonth() < 10
          ? `0${value.getMonth() + 1}`
          : value.getMonth() + 1
      const date = `${year}-${month}-${day}`
      this.date = date
      this.UpdateUserInfo()
      this.$parent.$parent.isShowAge = false
    },
    async UpdateUserInfo() {
      await UpdateUserInfoAPI({ birthday: this.date })
      this.$emit('update:birthday', this.date)
      this.$parent.$parent.isShowAge = false
    }
  }
}
</script>

<style></style>
