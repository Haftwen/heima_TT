<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="登录" class="nav-bar" />
    <!-- 表单 -->
    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <!-- 字体图标 -->
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <!-- 验证码按钮 -->
        <template #button>
          <van-button
            v-if="isShowCodeBtn"
            @click="sendCode"
            class="btn"
            type="default"
            block
            size="small"
            round
            native-type="button"
            >获取验证码</van-button
          >
          <!-- 倒计时互斥 -->
          <van-count-down
            :time="15 * 1000"
            format="ss秒"
            v-else
            @finish="isShowCodeBtn = true"
          />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendCodeAPI } from '@/api'
import { mobileRules, codeRules } from './rules'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowCodeBtn: true
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
    loading() {
      this.$toast.loading({
        message: '加载中...', // 提示文案
        forbidClick: true, // 禁止点击
        duration: 0 // 展示时长为0，一直展示
      })
    },
    async onSubmit() {
      // 登录细节完善
      // 登陆前
      this.loading()
      // 登录
      try {
        const { data } = await login(this.mobile, this.code)
        // console.log(data)
        // 将得到的数据存入vuex做持久化处理
        this.SET_TOKEN(data.data)
        // 跳转路由
        this.$router.push('/profile')
        this.$toast.success('登录成功')
      } catch (error) {
        // 细分一下错误信息提高用户体验
        // 如果是用户手机号或者验证码输入错误让用户能知道
        // error.response.data 后端返回的数据 error.response.status后端返回的状态码
        // 也可以用es11的可选链操作符 if（error.response？.status===400）
        if (error.response && error.response.status === 400) {
          this.$toast.fail(error.response.data.message)
          // 如果是程序员的错程序员能知道
        } else {
          // 1.js错误，2.507后台错误
          console.dir(error)
          // 手动清楚loading否则一直加载
          this.$toast.clear()
        }
      }
    },
    // 发送验证码请求
    async sendCode() {
      // 验证数据是不是合法 form绑定ref .$refs.form.validate('mobile') 方法验证这个数据
      await this.$refs.form.validate('mobile') // 返回一个promimse
      // 发送请求
      this.loading()
      try {
        await sendCodeAPI(this.mobile)
        // 显示倒计时
        this.isShowCodeBtn = false
        this.$toast.success('验证码发送成功')
      } catch (error) {
        // 细分错误
        if (
          error.response &&
          (error.response.status === 429 || error.response.status === 400)
        ) {
          this.$toast.fail(error.response.data.message)
        } else {
          // 清楚那个加载框框
          this.$toast.clear()
          throw error
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
// scoped 只作用于当前组件
// vue-cli 提供了语法：deep（） 深度选择器
.nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
// 父级穿透了孩子不需要了 组件内部样式需要穿透
:deep(.form) {
  .van-cell__title {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
  .toutiao {
    font-size: 40px;
  }
}
.btn {
  height: 0.64rem;
  background-color: #eee;
  color: #a58594;
}
</style>
