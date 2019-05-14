import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import './css/main.scss'
import './css/weui/weui.css'
import Utils from '@utils/utils'
import MpvueRouterPatch from 'mpvue-router-patch'
import API from '@api/index'

Vue.use(MpvueRouterPatch)
Vue.config.productionTip = false
App.mpType = 'app'

// Vue.prototype.$store = store
Vue.prototype.$Utils = Utils
Vue.prototype.$API = API
const app = new Vue({
  store,
  ...App
})
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    window: {
      // 小程序所有页面的顶部背景颜色，文字颜色定义
      // backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '',
      navigationBarTextStyle: 'black'
      // enablePullDownRefresh: true
    },
    networkTimeout: {
      // 设置网络请求的超时时间
      request: 50000,
      downloadFile: 50000
    },
    debug: false
  }
}
