/**
 * Created by Administrator on 2017/1/12.
 */

export default {
  // 用户信息getters  返回用户信息
  getUser: state => {
    return state.users
  },
  userInfo: state => state.userInfo, // 用户信息
  userPhone: state => state.userPhone, // 用户手机号
  token: state => state.token, // token
  openId: state => state.openId, // openid
  login: state => state.login, // 是否登录
  ifNeedImprove: state => state.ifNeedImprove, // 是否需要去授权
  isFromOrderConfirm: state => state.isFromOrderConfirm, // 是否是从订单页进入的
  saveFromAddress: state => state.saveFromAddress, // 保存点击选择地址的
  setProductDetail: state => state.setProductDetail, // 立即购买传入订单数据
  setInvitationInfo: state => state.setInvitationInfo // 邀请码信息
}
