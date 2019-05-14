import Fly from '@api/config'
export default {
  /**
   * @description 获取openid 已注册的用户信息
   * @param {*} param
   */
  getOpenId  (param) {
    return Fly.post(`api/customers/auth?code=${param.code}`)
  },
  /**
   * @description 用户注册
   * @param {*} param
   */
  userLogin  (param) {
    return Fly.post('api/customers/register', param) // 用户注册
  },
  /**
   * @description 根据用户加密信息获取手机号
   * @param {*} param
   */
  getUserPhone  (param) {
    return Fly.get(`api/customers/phone`, param) // 获取手机号
  },
  /**
   * @description 获取用户登录信息，包含绑定信息
   * @param {*} param
   */
  customersInfo (param) {
    return Fly.get(`api/customers/info`, param)
  },
  /**
   * @description 绑定邀请码
   * @param {*} param
   */
  bindInvitation (param) {
    return Fly.put(`api/customers/addInvitationCode?invitationCode=${param.invitationCode}`, param)
  }
}
