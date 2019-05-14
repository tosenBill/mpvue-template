import Host from '../config/host'
import GoodsApi from './interface/Goods'
import Auth from './interface/Auth'
import Order from './interface/Order'
import Address from './interface/Address'
import HomeApi from './interface/Home'

export default{
  ...Host,
  ...GoodsApi,
  ...Auth,
  ...Address,
  ...HomeApi,
  ...Order
}
