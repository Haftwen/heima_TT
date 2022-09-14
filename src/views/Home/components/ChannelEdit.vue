<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <!-- 标题 -->
    <van-cell title="我的频道">
      <van-button
        class="btn"
        size="mini"
        round
        style="color: red; border-color: red"
        @click="isEdit = !isEdit"
      >
        {{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <!-- 频道 -->
    <div class="my-pannel">
      <van-grid gutter="10" :border="false">
        <van-grid-item
          :class="{ active: item.name === '推荐' }"
          v-for="(item, index) in myChannels"
          :key="item.id"
          :text="item.name"
          :icon="isEdit && item.name != '推荐' ? 'cross' : ''"
          @click="handleMyChannels(item, index)"
        />
      </van-grid>
    </div>
    <!-- 推荐频道 -->
    <!-- 标题 -->
    <van-cell title="推荐频道"></van-cell>
    <!-- 所有频道-我得频道就是推荐频道的内容 -->
    <!-- 内容 -->
    <div class="recommend-pannel">
      <van-grid gutter="10" :border="false">
        <van-grid-item
          v-for="item in recommendChannels"
          :key="item.id"
          :text="item.name"
          icon="plus"
          @click="$emit('add-channel', item)"
        />
      </van-grid>
    </div>
  </div>
</template>

<script>
// 导入所有频道的接口
import { getAllChannelsApi } from '@/api'
export default {
  name: 'ChannelEdit',
  props: {
    myChannels: Array
  },
  data() {
    return {
      isEdit: false,
      allChannels: []
    }
  },
  created() {
    this.getAllChannels()
  },
  methods: {
    async getAllChannels() {
      try {
        const { data } = await getAllChannelsApi()
        this.allChannels = data.data.channels
      } catch (error) {
        console.log('错误')
      }
    },
    // 处理我的频道
    handleMyChannels(item, index) {
      // 如果是编辑状态下，并且不是推荐就删除频道
      if (this.isEdit && item.name !== '推荐') {
        this.$emit('del-channels', item.id)
      } else {
        // 如果不是编辑状态我们点击之后就关闭弹窗并且跳转到对应的频道
        // 通知父组件根据index切换高亮，并且关闭弹窗
        this.$emit('change-active', index)
      }
    }
  },
  //   计算属性得到 推荐频道=全部频道-我的频道
  computed: {
    recommendChannels() {
      // filter方法返回的是一个数组 必须return符合条件的
      return this.allChannels.filter((allChannelsItem) => {
        // 利用数组的find方法在我得频道中查找与全部频道中相同的如果命中了就是不需要的 相反就是需要的
        return !this.myChannels.find(
          (myChannelsItem) => myChannelsItem.id === allChannelsItem.id
        )
      })
    }
  }
}
</script>

<style scoped lang="less">
// postcss插件无法将行内的px转成rem
// 推荐高亮且不显示x号
:deep(.active) {
  .van-grid-item__text {
    color: red;
  }
}
.channel-edit {
  padding-top: 92px;
}
:deep(.btn) {
  width: 100px;
  font-size: 25px;
}
:deep(.van-grid-item__content) {
  background-color: #f4f5f6;
}
// 我的频道
.my-pannel {
  // 编辑按钮居中
  .van-cell__value {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  // 关闭按钮样式
  :deep(.van-grid-item__content) {
    position: relative;

    .van-grid-item__content {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
:deep(.van-icon-cross) {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 25px;
  transform: translate(20%, -35%);
  border: 0.02667rem solid #000;
  border-radius: 50%;
  text-align: center;
  line-height: 0.32rem;
}
// 推荐频道
.recommend-pannel {
  // 推荐频道加号样式
  :deep(.van-grid-item__content) {
    flex-direction: row;

    .van-grid-item__icon {
      font-size: 0.5rem;
    }

    .van-grid-item__text {
      margin-top: 0;
    }
  }
}
</style>
