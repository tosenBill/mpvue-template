/*
 * @Author: 沈童
 * @Description: 项目路由配置文件
 * @Date: 2019-05-13 16:16:39
 */

const Activitys = [

]
module.exports = [
  /**
   * @description 启动页
   */
  {
    path: '/pages/Auth/index',
    config: {
      navigationBarTitleText: ''
    }
  },
  /**
   * @description 首页
   */
  {
    path: '/pages/Home/index',
    config: {
      navigationBarTitleText: '首页',
      enablePullDownRefresh: true,
      onReachBottomDistance: 50
    }
  },
  ...Activitys
]
