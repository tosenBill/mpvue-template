/*
 * @Author: 徐长剑
 * @Description: vuex 定义action文件
 * @Date: 2018-08-27 13:49:09
 * @Last Modified time: 2018-08-27 13:49:09
 */
import MutationsType from './type'

import API from '@/api'

export default {
  // 进入app store
  setUser: ({ commit }, data) => {
    commit(MutationsType.SET_USERS, data)
  },
  getOpenId: ({ commit }, query) => {
    return API.getOpenId(query).then(res => {
      let data = res.data
      commit(MutationsType.GET_OPEN_ID, data.openId)
      commit(MutationsType.GET_TOKEN, data.token)
      if (data.customerDTO) {
        commit(MutationsType.USER_INFO, data.customerDTO)
        commit(MutationsType.USER_PHONE, data.customerDTO.phone)
      }
      return data
    })
  },
  userLogin: ({ commit }, query) => {
    return API.userLogin(query).then(res => {
      commit(MutationsType.GET_TOKEN, res.data.token)
      return res.data
    })
  },
  getInvitationInfo: ({ commit }, data) => {
    commit(MutationsType.INVITATION_INFO, data)
  },
  getUserPhone ({ commit }, query) {
    return API.getUserPhone(query).then(res => {
      commit(MutationsType.USER_PHONE, res.data.phoneNumber)
      return res.data
    })
  },
  // 埋点
  reportAnalytics ({ commit }, {type, data}) {
    // if (process.TYPE_ENV === 'production' || wx.reportAnalytics) {
    //   wx.reportAnalytics(type, data)
    // }
    wx.reportAnalytics(type, data)
  }

}
