const Router = require('../router/index')

// import Router from '../router/index'

export default class Configure {
  /**
   * @description 强制更新
   */
  static forceUpdate () {
    // wx.getUpdateManager 在 1.9.90 才可用，请注意兼容
    if (wx.getUpdateManager) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        console.log('检测是否有新的版本：', res.hasUpdate)
      })
      updateManager.onUpdateReady(function () {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否马上重启小程序？',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate()
            }
          }
        })
      })
      updateManager.onUpdateFailed(function () {
        // 新的版本下载失败
      })
    }
  }

  /**
   * @description 默认路由
   */
  static defaultRouter (opt) {
    console.log(opt.path, 'opt.path')

    let _path = opt.path.indexOf('/') ? '/' + opt.path : opt.path
    console.log(_path, '_path')
    let _allowrRouter = []
    Router.map(p => {
      _allowrRouter.push(p.path)
    })
    // console.log(_allowrRouter.indexOf(_path), '!_allowrRouter.indexOf(_path)')
    if (_allowrRouter.indexOf(_path) === -1) {
      // console.warn('找不到' + _path + '页面', _allowrRouter)
      wx.redirectTo({
        url: '/pages/Auth/index'
      })
    }
  }
}
