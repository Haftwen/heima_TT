<template>
  <div class="profile">
    <!-- 头部 -->
    <header>
      <!-- 登录的状态 -->
      <!-- 判断是否有token来选择展示内容v-if 由于可能用于其他页面 所以去story里变写方便全局去使用登录状态 -->
      <div class="login banner" v-if="isLogin">
        <van-row></van-row>
        <van-row>
          <van-col span="12">
            <van-row
              type="flex"
              justify="space-around"
              align="center"
              style="height: 100%"
            >
              <van-image
                round
                width="1.5rem"
                height="1.5rem"
                :src="userInfo.photo"
              />
              <span class="mobile">{{ userInfo.name }}</span>
            </van-row>
          </van-col>
          <van-col span="7"></van-col>
          <van-col span="5">
            <van-row
              type="flex"
              justify="center"
              align="center"
              style="height: 100%"
            >
              <van-button
                size="mini"
                round
                class="edit-btn"
                @click="$router.push('/user')"
                >编辑按钮</van-button
              >
            </van-row>
          </van-col>
        </van-row>
        <van-row>
          <van-grid class="grid" :border="false">
            <van-grid-item text="头条">
              <template #icon>{{ userInfo.art_count }}</template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon>{{ userInfo.fans_count }}</template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon>{{ userInfo.follow_count }}</template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon>{{ userInfo.like_count }}</template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <!-- 未登陆状态 -->
      <div class="logout banner" v-else @click="$router.push('/login')">
        <van-image width="1.76rem" height="1.76rem" :src="mobileSrc" />
        <span class="text">登录 / 注册</span>
      </div>
    </header>
    <!-- 主体 -->
    <main>
      <van-grid column-num="2" clickable>
        <van-grid-item text="收藏">
          <template #icon>
            <span class="toutiao toutiao-shoucang"></span>
          </template>
        </van-grid-item>
        <van-grid-item text="历史">
          <template #icon>
            <span class="toutiao toutiao-lishi"></span>
          </template>
        </van-grid-item>
      </van-grid>
      <div class="link">
        <van-cell title="消息通知" is-link></van-cell>
        <van-cell title="小智同学" is-link></van-cell>
      </div>
    </main>
    <!-- 底部 -->
    <footer>
      <van-button block v-if="isLogin" @click="exit" style="color: red"
        >退出</van-button
      >
    </footer>
  </div>
</template>

<script>
// 引入loginin状态
import { mapGetters } from 'vuex'
// 组件引入图片
import mobileSrc from '@/assets/images/mobile.png'
// 请求用户信息
import { getUserInfo } from '@/api'
export default {
  name: 'My',
  created() {
    this.getInfo()
  },
  methods: {
    async exit() {
      await this.$dialog.confirm({
        title: '黑马头条',
        message: '你确定要退出？？'
      })
      this.$store.commit('SET_TOKEN', {})
    },
    // 获取用户信息
    async getInfo() {
      try {
        // 用户登陆了发不登陆不发
        if (!this.isLogin) return
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (error) {
        // 细分失败 不同接口失败不同
        // js 和400 507希望程序员看到 401希望提示用户
        if (error.response && error.response.status === 401) {
          this.$toast.fail('用户认证失败，请登录')
        } else {
          throw error
        }
      }
    }
  },
  data() {
    return {
      mobileSrc,
      userInfo: {}
    }
  },
  computed: {
    // 固定写法等价于计算属性
    ...mapGetters(['isLogin'])
  }
}
</script>

<style lang="less" scoped>
.profile {
  height: 100vh;
  background-color: #f5f7f9;
}
.toutiao-shoucang {
  color: red;
}
.toutiao {
  font-size: 40px;
}
.toutiao-lishi {
  color: orange;
}
.link {
  margin: 10px 0;
}
//必须有baground-postion才能合写
.banner {
  width: 100%;
  height: 5.33333rem;
  background: url(../../assets/images/banner.png) no-repeat 0 0 / cover;
}
.logout {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .text {
    font-size: 30px;
    margin-top: 10px;
  }
}
.login {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .mobile {
    font-size: 30px;
    color: #fff;
  }
  .van-col {
    height: 100%;
  }
  .edit-btn {
    width: 1.6rem;
    height: 0.42667rem;
    color: #666;
  }
  :deep(.grid) {
    color: #fff;
    .van-grid-item__content {
      font-size: 30px;
      background-color: inherit; // 继承颜色
    }
    .van-grid-item__text {
      color: #fff;
    }
  }
}
</style>
