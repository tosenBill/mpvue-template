/*
 * @Author: 徐长剑
 * @Description: vuex 设置state文件文件
 * @Date: 2018-08-27 13:49:09
 * @Last Modified time: 2018-08-27 13:49:09
 */
import MutationsType from './type'

export default {

  // 设置登陆信息
  [MutationsType.SET_USERS] (state, data = {}) {
    state.users = data
  },
  // 登录用户信息
  [MutationsType.USER_INFO] (state, data = {}) {
    state.userInfo = data
  },
  // 登录用户手机号
  [MutationsType.USER_PHONE] (state, data = '') {
    state.userPhone = data
  },
  // 登录用户openid
  [MutationsType.GET_OPEN_ID] (state, data = '') {
    state.openId = data
  },
  // 登录用户token
  [MutationsType.GET_TOKEN] (state, data = '') {
    if (data) {
      state.login = true
      state.token = data
      wx.setStorageSync('token', data)
    }
  },
  // 是否需要进入授权页面
  [MutationsType.IF_NEED_IMPROVE] (state, data = false) {
    state.ifNeedImprove = data
  },
  // 立即购买进入订单确认页面
  [MutationsType.SET_PRODUCT_DETAIL] (state, data = {}) {
    state.setProductDetail = data
  },
  // 是不是使用选择后的地址
  [MutationsType.IS_FROM_ORDER_CONFIRM] (state, data = false) {
    state.isFromOrderConfirm = data
  },
  // 保存选择后的地址
  [MutationsType.SAVE_FROM_ADDRESS_ITEM] (state, data = {}) {
    state.saveFromAddress = data
  },
  // 邀请码信息
  [MutationsType.INVITATION_INFO] (state, data = {}) {
    state.setInvitationInfo = data
  }
}
