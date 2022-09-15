<template>
  <div>
    <!-- 导航条 -->
    <form action="/">
      <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
      <van-search
        class="search"
        v-model.trim="keywords"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        :show-action="true"
        @search="onSearch"
        @focus="isShowSearchResult = false"
        @cancel="$router.push('/')"
      />
    </form>
    <!-- 搜索,建议,结果历史为了方便渲染对应的内容采用component动态组件：is是谁渲染谁写法 -->
    <!-- <search-history></search-history>
    <search-result></search-result>
    <SearchSuggesttion></SearchSuggesttion> -->
    <component
      :is="componentName"
      :keywords="keywords"
      @change-keywords="onSearch"
    ></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggesttion from './components/SearchSuggesttion.vue'
// 通过vuex操作本地数据
import { mapMutations, mapState } from 'vuex'
export default {
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggesttion
  },
  data() {
    return {
      keywords: '',
      //   定义一个变量去记录我们是否触发search事件
      isShowSearchResult: false
    }
  },
  methods: {
    ...mapMutations(['SET_HISTORIES']),
    onSearch(keywords) {
      // 当用户内容进入搜索框并且搜索页面出来的才叫历史
      // 搜索的时候将数据存到本地用于渲染 vuex解决
      // 存储数据
      // 搜索历史去重 new Set(未去重的数组)出来是对象...结构再用数组包起来
      this.SET_HISTORIES([...new Set([keywords, ...this.histories])])
      this.isShowSearchResult = true
      this.keywords = keywords
    }
  },
  computed: {
    // state往计算属性映射
    ...mapState(['histories']),
    componentName() {
      if (this.keywords === '') {
        return 'SearchHistory'
      }
      //   当触发搜索事件是变量为true渲染结果组件
      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      //   不触发以上两者显示搜索建议
      return 'SearchSuggesttion'
    }
  }
}
</script>

<style lang="less" scoped>
// c33新选择器 属性选择
// class 和style属性特殊不需要props接收
// 这两个属性vue会自动把class和style合并到组件的根节点上
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
