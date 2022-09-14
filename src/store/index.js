import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

// 下载持久化的工具包 vue2使用
// 1.yarn add vuex-persistedstate@3.2.1 持久化state
// 2.引入 在上边引入是一个函数
// 3.plugins调用函数即可
// 插件的配置项 key:默认值是vuex
// storage 默认是本地存储 可以自己设置
// reducer 默认是一个函数，return一个对象，对象就作为value存储 参数是state
export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'toutiao',
      // storage:window.localStorage默认就是这个
      reducer(state) {
        const { tokenObj, myChannels } = state
        return { tokenObj, myChannels }
      }
    })
  ],
  state: {
    tokenObj: {},
    // a:1配置过reducer 就只会存储tokenObj并不会存储a了就
    // 未登录状态的数组
    myChannels: []
  },
  getters: {
    isLogin(state) {
      // 取反一次返回布尔值false两次为true 没有是字符串
      return !!state.tokenObj.token
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.tokenObj = token
    },
    /**
     *
     *我们修改过数据以后的最新数组channels
     * @param {Array} channels
     */
    SET_MY_CHANNELS(state, channels) {
      state.myChannels = channels
    }
  },
  actions: {},
  modules: {}
})
