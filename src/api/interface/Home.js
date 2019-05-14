/**
 * 首页通知
 */
import Fly from '@api/config'

export default {
  /**
   * @description 获取首页所有启用通知
   * @type {GET}
   */
  getNotifies () {
    return Fly.get(`/api/notifies/open`)
  },
  /**
   * @description 获取首页商品列表
   * @type {GET}
   */
  getHomeProductList (params = {}) {
    return Fly.get(`/api/product/homeProductList`, params)
  },
  /**
   * @description 获取首页banner
   * @type {GET}
   */
  getBanners () {
    return Fly.get(`/api/banner/bannerList`)
  },
  /**
   * @description 获取banner详情页面
   * @type {GET}
   */
  getBannerDetail (params = {}) {
    return Fly.get(`/api/banner/bannerDetail/${params.bannerId}`)
  }
}
