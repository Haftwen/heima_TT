<template>
  <div>
    <!-- 搜索框 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button
          icon="search"
          size="small"
          round
          block
          @click="$router.push('/search')"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- 频道及文章 -->
    <!-- active高亮tab的索引 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <!-- 频道也是请求而来的传给list发请求用 -->
        <article-list :id="item.id"></article-list>
      </van-tab>
      <span class="toutiao toutiao-gengduo" @click="isShow = true"></span>
    </van-tabs>
    <van-popup
      v-model="isShow"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left "
    >
      <!-- 频道传给编辑组件 -->
      <!-- <channel-edit :my-channels="channels"></channel-edit> 为了风格一致短横线写法同样能渲染 -->
      <!-- $event就是子组件传过来的参数值 -->
      <channel-edit
        v-if="isShow"
        :myChannels="channels"
        @change-active=";[(isShow = false), (active = $event)]"
        @del-channels="delChannels"
        @add-channel="addChannel"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
// 引入文章详情组件
import ArticleList from './components/ArticleList.vue'
import { getChannelApi, delChannelApi, addChannelAPI } from '@/api'
// 引入弹出框的组件
import ChannelEdit from './components/ChannelEdit.vue'
// 登陆状态 用于操作登录不登陆的两套系统
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    ArticleList,
    ChannelEdit
  },
  data() {
    return {
      active: 0,
      channels: [],
      isShow: false
    }
  },
  created() {
    this.initChannels()
  },
  methods: {
    // 将存储数据的方法抽过来
    ...mapMutations(['SET_MY_CHANNELS']),
    // 登录和未登陆的初始化 单独封装成一个方法 供created调用
    initChannels() {
      // 如果登录了 那就去发送请求获取用户的数据
      if (this.isLogin) {
        this.getChannel()
      } else {
        // 如果未登录 判断 本地是否有数据 如果有就用本地的 如果没有发送请求获取默认数据
        // 不用方法读取 用属性读取
        if (this.$store.state.myChannels.length === 0) {
          // 本地无数据
          this.getChannel()
        } else {
          this.channels = this.$store.state.myChannels
        }
      }
    },
    async getChannel() {
      try {
        const { data } = await getChannelApi()
        // 需要两套系统来操作登陆了操作线上 没登陆操作本地存储
        this.channels = data.data.channels
      } catch (error) {
        // 如果是js错误 axios507 提示用户刷新一下
        if (!error.response) {
          throw error
        } else {
          const status = error.response.status
          // status === 507 ？？ this.$toast.fail('请刷新') 相当于或者||不是&&
          status === 507 && this.$toast.fail('请刷新')
        }
      }
    },
    // 删除频道根据id，都是分两步进行，第一步改变视图层，第二部发请求改变服务器数据
    async delChannels(id) {
      try {
        const newChannels = this.channels.filter((item) => item.id !== id)
        // 1.发送请求改变后端数据
        if (this.isLogin) {
          await delChannelApi(id)
        } else {
          this.SET_MY_CHANNELS(newChannels)
        }
        // 2.改变视图层
        this.channels = newChannels
        this.$toast.success('删除成功！！')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请登录以后删除')
        } else {
          throw error
        }
      }
    },
    // 添加频道到我的频道中 之所以上下同步变化是因为我们edit组件中的computed数据变化时在不断触发
    // 都是分两步进行，第一步改变视图层，第二部发请求改变服务器数据
    async addChannel(item) {
      try {
        // 1.发送请求添加频道
        if (this.isLogin) {
          await addChannelAPI(item.id, this.channels.length)
        } else {
          this.SET_MY_CHANNELS([...this.channels, item])
        }
        // 2.视图改变
        this.channels.push(item)
        this.$toast.success('添加成功')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请登录以后再添加')
        } else {
          throw error
        }
      }
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  }
}
</script>

<style lang="less" scoped>
.navbar {
  background-color: #3296fa;

  // inherit 继承
  // unset 不设置
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button--default {
    background-color: #5babfb;
    border: 0;
    color: #fff;
    font-size: 30px;
  }

  .van-icon {
    color: #fff;
  }
  .van-button--block {
    width: 7.4rem;
  }
}
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
</style>
