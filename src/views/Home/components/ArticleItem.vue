<template>
  <div>
    <!-- 没有图片 -->
    <van-cell
      v-if="article.cover.type === 0"
      :title="article.title"
      :label="label"
      @click="getDetails"
    />
    <!-- 一张图片 -->
    <van-cell
      v-else-if="article.cover.type === 1"
      :title="article.title"
      value="内容"
      :label="label"
      @click="getDetails"
    >
      <van-image
        windth="60"
        height="60"
        :src="article.cover.images[0]"
      ></van-image>
    </van-cell>
    <!-- 三张图片 -->
    <van-cell v-else :title="article.title" @click="getDetails">
      <template #label>
        <van-image
          v-for="(item, index) in article.cover.images"
          :key="index"
          windth="60"
          height="60"
          :src="item"
        ></van-image>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  props: {
    article: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    label() {
      /*eslint-disable */
      const { aut_name, comm_count, pubdate } = this.article
      return `${aut_name} ${comm_count} 评论  ${dayjs(pubdate).fromNow()}`
    }
  },
  methods: {
    getDetails() {
      this.$router.push({
        path: '/detail',
        query: {
          id: this.article.art_id
        }
      })
    }
  }
}
</script>

<style></style>
