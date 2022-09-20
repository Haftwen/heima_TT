<template>
  <div class="article">
    <!-- 滚动条触底加载van-list组件 -->
    <!-- load：触底触发的事件 -->
    <!-- offset默认值为300当滚动条与底部距离多少时触发 -->
    <!-- immediate-check 第一渲染时是否触发默认值为true-->
    <!-- 为了防止请求多次使用同一时间产生并发需要给组件加上v-model=loading属性 -->
    <!-- loading属性 加给van-list组件  -->
    <!-- 1.loading为true的时候，load事件不会被触发 -->
    <!-- 2.loading为false的时候，load事件会被触发 -->
    <!-- 3.当事件触发以后 load会被修改为true 需要我们手动调整为false -->
    <!-- 优化：当我们没有内容的时候提示用户没有更多内容 -->
    <!-- 利用finished的属性 当为false的时候load事件可以触发 当为true的时候将不会再触发 并且显示提示文本 finished-text -->
    <!-- 对错误进行处理error.sync 当遇到错误的时候就提示刷新 无错误时值为false-->
    <!-- 若列表数据加载失败，将 error 设置成 true 即可显示错误提示，用户点击错误提示后会重新触发 load 事件。 -->
    <!-- van-pull-refresh组件实现上拉刷新效果 其中isloading默认为false当使用一次后变成true需要手动调回来 -->
    <!-- 其原理就是当我们刷新时把请求来的数据放在articles数组前边渲染所以请求可以复用 -->
    <van-pull-refresh v-model="isLoading" @refresh="getNextPage">
      <van-list
        @load="getNextPage"
        offset="100"
        :immediate-check="false"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多数据了傻逼"
        :error.sync="error"
        error-text="请求失败点击重新加载"
      >
        <article-item
          v-for="item in articles"
          :key="item.art_id"
          :article="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api'
import ArticleItem from './ArticleItem'
export default {
  name: 'articles',
  components: {
    ArticleItem
  },
  props: {
    id: {
      type: [String, Number]
    }
  },
  data() {
    return {
      articles: [],
      loading: false,
      preTimeStamp: '',
      finished: false,
      error: false,
      isLoading: false,
      // 文章id
      articleId: ''
    }
  },
  created() {
    this.getFirstPageArticle()
  },
  methods: {
    async getFirstPageArticle() {
      // 获取当前时间戳
      //   new Date().valueOf()
      //   Date.now()
      //   +new Date()
      try {
        const { data } = await getArticles(this.id, +new Date())
        this.articles = data.data.results
        // 第一次需要保存上次请求返回的时间戳
        this.preTimeStamp = data.data.pre_timestamp
      } catch (error) {
        // js的错误 上抛 400上抛中文，507原封不动上抛
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    },
    async getNextPage() {
      // 错误信息处理
      try {
        // 模拟错误
        // if (Math.random() < 0.5) {
        //   throw new Error()
        // }
        //  发送请求获取下一页数据(主要改变的是事件属性需要传入上次请求返回的时间)重新添加进数组
        // 1.发送请求
        const { data } = await getArticles(this.id, this.preTimeStamp)
        // 无数据时停止触发并给用户提示 无的时候是null 所以取反
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        // 在这里进行判断看是刷新还是正常加载
        if (this.isLoading) {
          this.articles.unshift(...data.data.results)
        } else {
          // 2.数据添加到articles数组
          this.articles.push(...data.data.results)
        }
        // 3.更新时间戳
        this.preTimeStamp = data.data.pre_timestamp
      } catch (error) {
        // 报错进行处理
        this.error = true
      } finally {
        // 最终都会执行
        // 4.更新loading状态
        this.loading = false
        // 刷新情况下也需要手动改回false
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
// 如何让元素拥有自己的滚动条，1.定高度，2.设置 overflow/auto /scroll /overlay
.article {
  // 运算符号前后必须有空格 这个方法
  height: calc(100vh - 100px - 92px - 83px);
  overflow: auto;
  // &: 代表当前元素他爹
  // ::-webkit-scrollbar : 滚动槽
  // ::-webkit-scrollbar-thumb: 滚动的滑块
  // .article::-webkit-scrollbar
  &::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #3296fa;
    border-radius: 10px;
  }
}
</style>
