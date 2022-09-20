<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="onClickLeft"
    ></van-nav-bar>
    <!-- /导航栏 -->
    <div class="main-wrap">
      <!-- 加载完成-文章详情 -->
      <div class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articleInfo.title }}</h1>
        <!-- /文章标题 -->
        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleInfo.aut_photo"
          />
          <div slot="title" class="user-name">黑马头条号</div>
          <div slot="label" class="publish-date">14小时前</div>
          <van-button
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            v-if="articleInfo.is_followed"
            @click="changeStatus"
            >关注</van-button
          >
          <van-button
            class="follow-btn"
            round
            size="small"
            v-else
            @click="changeStatus"
            >已关注</van-button
          >
        </van-cell>
        <!-- /用户信息 -->
        <!-- 文章内容 -->
        <div class="article-content markdown-body">
          <!-- /加载完成-文章详情 -->
          <div v-html="articleInfo.content"></div>
        </div>
        <van-divider>正文结束</van-divider>
        <!-- 评论列表 -->
        <discuss :id="articleInfo.art_id" :item="item"></discuss>
      </div>
      <!-- /加载完成-文章详情 -->
    </div>
    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="discuss"
        >写评论</van-button
      >
      <van-icon name="comment-o" color="#777" />
      <van-icon
        color="#777"
        name="star-o"
        @click="collected"
        v-if="articleInfo.is_collected"
      />
      <van-icon name="star" color="#ff9632" @click="collected" v-else />
      <van-icon color="#777" name="good-job-o" />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
    <!-- 评论输入内容的弹框 可以抽离的部分但是不想抽了-->
    <van-popup
      class="popup"
      v-model="isShowPopup"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <!-- 组件 -->
      <add-comment :id="articleInfo.art_id" @addItem="addItem"></add-comment>
    </van-popup>
    <!-- 回复评论 -->
    <reply-to-comments></reply-to-comments>
  </div>
</template>

<script>
import ReplyToComments from './components/ReplyToComments.vue'
import {
  getArticlesDetials,
  addUserAPI,
  removeUserAPI,
  removeCollectAPI,
  collectAPI
} from '@/api'
import '@/views/styles/github-markdown.css'
// 导入评论区组件
import discuss from './components/discuss.vue'
// 导入发表评论
import AddComment from './components/AddComment.vue'
export default {
  name: 'ArticleIndex',
  components: {
    discuss,
    AddComment,
    ReplyToComments
  },
  data() {
    return {
      articleInfo: {},
      isShowPopup: false,
      item: {}
    }
  },
  created() {
    this.getArticles()
  },
  methods: {
    onClickLeft() {
      this.$router.push('/ ')
    },
    async getArticles() {
      const { data } = await getArticlesDetials(this.$route.query.id)
      this.articleInfo = data.data
    },
    // 关注或者取消关注
    async changeStatus() {
      if (this.articleInfo.is_followed) {
        await removeUserAPI(this.articleInfo.aut_id)
        this.articleInfo.is_followed = false
      } else {
        await addUserAPI(this.articleInfo.aut_id)
        this.articleInfo.is_followed = true
      }
    },
    // 收藏或者取消收藏
    async collected() {
      if (this.articleInfo.is_collected) {
        const data = await removeCollectAPI(this.articleInfo.art_id)
        console.log(data)
        this.articleInfo.is_collected = false
      } else {
        await collectAPI(this.articleInfo.art_id)
        this.articleInfo.is_collected = true
      }
    },
    // 评论
    discuss() {
      this.isShowPopup = true
    },
    addItem(item) {
      this.item = item
      // 关闭弹窗
      this.isShowPopup = false
    }
  }
}
</script>

<style scoped lang="less">
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 30px !important;
  }
}
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
