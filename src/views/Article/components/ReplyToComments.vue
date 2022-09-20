<template>
  <!-- 对评论进行评论 -->
  <div>
    <van-popup
      class="popup"
      v-model="$store.state.isShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!-- 顶部关闭 -->
      <van-nav-bar
        :title="`${total}条评论`"
        left-arrow
        @click-left="onClickLeft"
      />
      <!-- 回复内容 -->
      <van-list
        v-model="loading"
        @load="onLoad"
        :finished="finished"
        offset="100"
        finished-text="没有更多了"
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
              <van-button size="mini" type="default"
                >回复{{ item.reply_count }}</van-button
              >
            </p>
          </div>
          <van-icon slot="right-icon" name="good-job-o" />
        </van-cell>
      </van-list>
      <!-- 回复的底部样式 -->
      <van-tabbar>
        <van-button plain type="info" @click="isShowPopup = true"
          >发表评论</van-button
        >
      </van-tabbar>
      <!-- 评论的评论弹出框 -->
      <van-popup
        class="popup"
        v-model="isShowPopup"
        position="bottom"
        :style="{ height: '30%' }"
      >
        <!-- 组件 -->
        <div>
          <van-field
            class="text"
            v-model="pldpl"
            autosize
            type="textarea"
            maxlength="50"
            placeholder="请输入留言"
            show-word-limit
          />
          <van-button text="发布" @click="add"></van-button>
        </div>
      </van-popup>
    </van-popup>
  </div>
</template>

<script>
import { getDiscussAPI, publishRecommentAPI } from '@/api'
// 导入控制弹窗显示隐藏的东西
export default {
  data() {
    return {
      loading: false,
      finished: false,
      isShowPopup: false,
      list: [],
      pldpl: '',
      //   评论的数量
      total: ''
    }
  },
  methods: {
    // 这个是当前这条评论的全部数据
    async onLoad() {
      const { data } = await getDiscussAPI({
        type: 'c',
        source: this.$store.state.comId,
        offset: this.offset,
        limit: 10
      })
      this.list.push(...data.data.results)
      this.total = data.data.total_count
      this.loading = false
      if (data.data.results.length) {
        // 有数据就更新获取下页
        this.offset = data.data.last_id
      } else {
        // 如果没数据就结束
        this.finished = true
      }
    },
    // 这个请求是评论的评论的请求
    async add() {
      const { data } = await publishRecommentAPI({
        target: this.$store.state.comId,
        content: this.pldpl,
        art_id: this.$route.query.id
      })
      console.log(data)
      this.list.unshift(data.data.new_obj)
      this.isShowPopup = false
    },
    onClickLeft() {
      // 返回上一级  bug
      this.$router.go(0)
    }
  }
}
</script>

<style></style>
