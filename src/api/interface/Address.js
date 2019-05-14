/**
 * 商品接口
 */
import Fly from '@api/config'

export default {
  /**
   * @description 我的收货地址列表
   * @type {GET}
   */
  getCustomerAddressList (param = {}) {
    return Fly.get(`/api/customerAddress/my`, param)
  },
  /**
   * @description 新增我的收货地址
   * @type {post}
   */
  addCustomerAddressList (param = {}) {
    return Fly.post(`/api/customerAddress`, param)
  },
  /**
   * @description 更新我的收货地址
   * @type {put}
   */
  updataCustomerAddressList (param = {}) {
    return Fly.put(`/api/customerAddress`, param)
  },
  /**
   * @description 删除我的收货地址
   * @type {delete}
   */
  delCustomerAddressList (param = {}) {
    return Fly.delete(`/api/customerAddress/${param.id}`)
  },
  /**
   * @description 通过id获取地址详情
   * @type {GET}
   */
  getCustomerAddressByAddressId (param = {}) {
    return Fly.get(`/api/customerAddress/${param.id}`)
  },
  /**
   * @description 获取我的默认地址
   * @type {GET}
   */
  getCustomerAddresDefault (param = {}) {
    return Fly.get(`/api/customerAddress/my/default`, param)
  },
  /**
   * @description 获取物流信息
   * @type {GET}
   */
  getLogisticsInfo (param = {}) {
    return Fly.get(`/api/expressInfos/byJoinId`, param)
  },
  /**
   * @description 根据id查询收货地址
   * @type {GET}
   */
  customerAddress (param = {}) {
    // return Fly.get(`/api/customerAddress/${param.id}`, param)
  }
}
