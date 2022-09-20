<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      offset="100"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item, index) in list" :key="index">
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d" slot="title">{{ item.aut_name }}</span>
        <div slot="label">
          <p style="color: #363636">{{ item.content }}</p>
          <p>
            <span style="margin-right: 10px">{{ item.pubdate }}</span>
            <van-button
              size="mini"
              type="default"
              @click="ReplyToComments(item.com_id)"
              >回复{{ item.reply_count }}</van-button
            >
          </p>
        </div>
        <van-icon slot="right-icon" name="good-job-o" />
      </van-cell>
    </van-list>
  </div>
</template>

<script>
// 把comid传给reply 让他带上id发请求
import { getDiscussAPI } from '@/api'
import { mapMutations } from 'vuex'

export default {
  props: {
    id: {
      type: [String, Number, Object],
      require: true
    },
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  // 监视属性当数据变化时添加入数组
  watch: {
    item: {
      deep: true,
      handler() {
        this.list.unshift(this.item)
        this.$toast.success('评论成功')
        // 关闭弹框
        this.$emit('addItem')
      }
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      isShowPopup: false,
      comId: ''
    }
  },
  // 解决数据立即更新 监视属性变化
  methods: {
    ...mapMutations(['SET_REPLY']),
    // 将数据存储进来
    ...mapMutations(['SET_COMID']),
    async onLoad() {
      // 异步更新数据
      const { data } = await getDiscussAPI({
        type: 'a',
        source: this.id,
        offset: this.offset,
        limit: 10
      })
      // 将数据添加到列表当中
      const { results } = data.data
      this.list.push(...results)
      // 将新增的评论数据添加到数组最前边当中
      // 加载状态结束
      this.loading = false
      //    判断是否还有数据
      if (results.length) {
        // 有数据就更新获取下页
        this.offset = data.data.last_id
      } else {
        // 如果没数据就结束
        this.finished = true
      }
    },
    // 回复评论
    async ReplyToComments(id) {
      // 点击的时候将isShow改成true
      this.SET_REPLY(true)
      // 拿到了对应的评论id 发送请求即可
      this.comId = id
      this.SET_COMID(this.comId)
    }
  }
}
</script>

<style scoped lang="less">
:deep(.popup) {
  z-index: 2024;
}
</style>
