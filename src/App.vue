<template>
  <div>
    <!-- 动画效果想让谁做动画包谁，mode指定先如后出还是先出后入 -->
    <transition name="van-slide-up" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
// 下载vant
// rem适配 让rem动起来 盒子使用rem
// 将项目中css所有的px->>rem 用post-css预处理器 自己能做的很少 需要我们自己下包postcss-pxtorem
// 配置postcss-pxtorem 新建.根目录新建postcssrc.js
export default {}
</script>

<style lang="less"></style>
