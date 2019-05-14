/*
 * @Author: 徐长剑
 * @Description: vuex 定义state文件
 * @Date: 2018-08-27 13:49:09
 * @Last Modified time: 2018-08-27 13:49:09
 */
export default {
  // 用户的登陆信息和token
  users: {
    name: '一只小怪兽'
  },
  userInfo: {},
  userPhone: '',
  openId: '',
  login: false,
  token: '',
  ifNeedImprove: false,
  isFromOrderConfirm: false, // 是不是使用选择后的地址
  saveFromAddress: {}, // 保存选择后的地址
  setProductDetail: {}, // 商品详情页面数据
  setInvitationInfo: {} // 邀请码信息
}
