<template>
  <div class="result">
    <!-- 下滑加载 -->
    <!-- loading false的时候可以加载 加载完为 ture 需要手动改成false -->
    <!-- @load一上来就调用一次 当我们再次滚到底部loading为false还是能继续调用 -->
    <!-- 问题一eg:数据过少只有两行就是触底不停的触发,利用finished(先false 满足条件改) 属性为true阻止load事件加载-->
    <!-- error进行错误处理 -->
    <van-list
      v-model="loading"
      @load="getResults"
      :finished="finished"
      finished-text="没有更多了哦~"
      :error.sync="error"
      error-text="网络错误,点击重新加载"
    >
      <van-cell
        v-for="item in results"
        :key="item.art_id"
        :title="item.title"
        @click="
          $router.push({
            path: '/detail',
            query: { articleId: item.art_id }
          })
        "
      ></van-cell>
    </van-list>
  </div>
</template>

<script>
import { getResultsAPI } from '@/api'
export default {
  props: {
    keywords: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      loading: false,
      page: 1,
      per_page: 10,
      results: [],
      finished: false,
      error: false
    }
  },
  methods: {
    async getResults() {
      try {
        // 测试
        // if (Math.random() < 0.7) {
        //   throw new Error()
        // }
        // 发送请求
        const { data } = await getResultsAPI(
          // 请求第二页
          this.page++,
          this.per_page,
          this.keywords
        )
        // <!-- 问题一eg:数据过少只有两行就是触底不停的触发,利用finished(先false 满足条件改) 属性为true阻止load事件加载-->
        const results = data.data.results
        if (results.length === 0) {
          this.finished = true
        }
        // 处理数据
        // this.results.push(...data.data.results)
        this.results = [...this.results, ...results]
      } catch {
        this.error = true
      } finally {
        // 关闭loading
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
// 让顶部固定在顶部
.result {
  //下面盒子 定高 overflow
  height: calc(100vh - 108px);
  // overlay用法与auto基本一致
  overflow: overlay;
}
</style>
