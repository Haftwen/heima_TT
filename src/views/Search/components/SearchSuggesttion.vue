<template>
  <!-- map
 - 返回新数组, 长度和原数组一致, 函数的返回值新数组那一项的值
 动态正则
 - /Anglar/ig 字面量形式的正则, 不能动态生成正则的内容
 - new RegExp(字符串,修饰符'ig')
 字符串的 replace
 - 字符串.replace(正则,函数)
 - 这个函数参数 match, 匹配上的结果, 函数的返回值回作为替换的结果 -->
  <div>
    <van-cell
      icon="search"
      v-for="(item, index) in highLightSuggestions"
      :key="index"
      @click="$emit('change-keywords', suggestions[index])"
    >
      <!-- 改成插槽然后对应的关键词高亮 -->
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
// 获取搜索建议数据
import { getSuggestionAPI } from '@/api'
// 利用lodash进行防抖处理 下载引入使用
import { debounce } from 'lodash'
export default {
  props: {
    keywords: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  watch: {
    keywords: {
      // 进来立即监视
      immediate: true,
      // 自动调用
      handler: 'getSuggestion'
    }
  },
  methods: {
    // 利用lodash进行防抖处理 下载引入使用
    getSuggestion: debounce(async function () {
      try {
        const { data } = await getSuggestionAPI(this.keywords)
        // console.log(data)
        // this.suggestions = data.data.options.filter((item) => Boolean(item))
        // 处理后端的数据null NAN等等不要
        this.suggestions = data.data.options.filter(Boolean)
      } catch (error) {
        if (error.response) {
          this.$toast.fail('获取搜索建议失败')
        } else {
          throw error
        }
      }
    }, 300)
  },
  computed: {
    highLightSuggestions() {
      const reg = new RegExp(this.keywords, 'ig')
      return this.suggestions.map((str) => {
        return str.replace(
          reg,
          (match) => `<sapn style="color:red">${match}</sapn>`
        )
      })
    }
  }
}
</script>

<style></style>
