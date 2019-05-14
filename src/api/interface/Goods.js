/**
 * 商品接口
 */
import Fly from '@api/config'

export default {
  /**
   * @description 获取商品列表
   * @type {GET}
   */
  getGoods (param = {}) {
    return Fly.get(`api/customers/auth?`, param)
  },
  /**
   * @description 获取商品详情
   * @type {GET}
   */
  getGoodsDetail (param = {}) {
    return Fly.get(`/api/product/productDetail/${param.productId}`)
  },
  /**
   * @description 判断商品库存和是不是下架
   * @type {POST}
   */
  checkProduct (param = []) {
    return Fly.post(`/api/product/checkProduct`, param)
  }
}
