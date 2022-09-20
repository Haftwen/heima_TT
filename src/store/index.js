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
        const { tokenObj, myChannels, histories } = state
        return { tokenObj, myChannels, histories }
      }
    })
  ],
  state: {
    tokenObj: {},
    // a:1配置过reducer 就只会存储tokenObj并不会存储a了就
    // 未登录状态的数组
    myChannels: [],
    // 搜索历史
    histories: [],
    isShow: false,
    // 评论id
    comId: ''
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
    },
    /**
     *
     * @param {*} histories 删除或添加以后新的搜索历史
     */
    SET_HISTORIES(state, histories) {
      state.histories = histories
    },
    // 设置评论的评论的弹窗是显示还是隐藏
    SET_REPLY(state, boole) {
      state.isShow = boole
    },
    // 将文章评论id存储
    SET_COMID(state, id) {
      state.comId = id
    }
  },
  actions: {},
  modules: {}
})
