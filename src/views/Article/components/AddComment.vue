<template>
  <div>
    <van-field
      class="text"
      v-model="discussItem"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button text="发布" @click="disContent"></van-button>
  </div>
</template>

<script>
import { publishRecommentAPI } from '@/api'
export default {
  props: {
    id: {
      type: [String, Number, Object],
      require: true
    }
  },
  data() {
    return {
      discussItem: '',
      newComment: {}
    }
  },
  methods: {
    // 评论文章按钮处理内容
    async disContent() {
      const { data } = await publishRecommentAPI({
        target: this.id,
        content: this.discussItem
      })
      //   console.log(data.data.new_obj)
      //   将这条数据添加到数据列表数组当中去
      this.newComment = data.data.new_obj
      this.$emit('addItem', this.newComment)
      this.discussItem = ''
    }
  }
}
</script>

<style></style>
