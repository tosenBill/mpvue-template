/**
 * 首页通知
 */
import Fly from '@api/config'

export default {
  /**
   * @description 获取订单数量的角标
   * @type {GET}
   */
  getCount () {
    return Fly.get(`/api/orders/my/count`)
  },
  /**
   * @description 根据类型查询我的订单
   * @type {GET}
   */
  getOrderList (params = {}) {
    return Fly.get(`/api/orders/my/byType`, params)
  },
  /**
   * @description 支付订单
   * @param {*} id 订单ID
   */
  payOrder (id) {
    return Fly.put(`/api/orders/${id}/pay`)
  },
  /**
   * @description 取消订单
   * @param {*} id 订单ID
   */
  cancelOrder (id) {
    return Fly.put(`/api/orders/${id}/cancel`)
  },
  /**
   * @description 确认收货
   * @param {*} id 订单ID
   */
  confirmReceipt (id) {
    return Fly.put(`/api/orders/${id}/confirmReceipt`)
  },
  /**
   * @description 创建订单
   * @param {*} param
   */
  createOrder (param) {
    return Fly.post(`/api/orders`, param)
  },
  /**
   * @description 获取订单详情
   * @type {GET}
   */
  getOrderDetail (id) {
    return Fly.get(`api/orders/${id}`)
  }
}
