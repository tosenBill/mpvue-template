import Host from '../config/host'
import Fly from 'flyio/dist/npm/wx'
// const Fly = require('flyio/dist/npm/wx')
const FLY = new Fly()

FLY.config.baseURL = Host.API_HOST

FLY.interceptors.request.use(request => {
  const token = wx.getStorageSync('token')
  if (token) {
    request.headers['Authorization'] = 'Bearer ' + token
  }
  return request
})
FLY.interceptors.response.use(
  response => {
    return response
  },
  err => {
    let code = err.status
    switch (code) {
      case 500 :
        if (err.response.data) {
          wx.showToast({
            title: err.response.data.message || '',
            icon: 'none',
            duration: 3000
          })
        }
        break
      case 401:
        break
      case 403:
        break
    }
    console.log('失败', err)
    return err
  }
)
export default FLY
