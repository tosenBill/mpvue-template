<template class='adolf'>
  <div class="my-container fixed-body">
    <div class="for-bg-color">
      我的
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Api from '@api'

export default {
  props: ['nowSelectPage'],
  data () {
    return {
      invitationCode: null,
      inputModalText: {
        text: ''
      },
      errCode: false, // 邀请码不存在
      invitationInputModal: ['', '', '', '', '', ''],
      // hasbind: false,
      bindInvitationModal: false,
      sureCallModal: false,
      modalSaleServer: false,
      modalBollen: false,
      shopInfo: {},
      noPayNum: {
        unPaidCount: 0, // 待付款
        waitingDeliverCount: 0, // 待发货
        deliveringCount: 0, // 配送中
        completedCount: 0 // 已完成
      }
    }
  },
  computed: {
    ...mapGetters([
      'login',
      'userInfo',
      'userPhone',
      'ifNeedImprove',
      'setInvitationInfo'
    ])
  },
  components: {
  },
  onLoad (options) {
    console.log(this.setInvitationInfo)
    console.log('my----onload', this.userInfo)
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
    if (this.login && this.nowSelectPage === 'my') {
      this.init()
    }
  },
  onShow () {
    console.log('my----onshow')
    if (this.login && this.nowSelectPage === 'my') {
      this.init()
    }
  },
  methods: {
    init () {
      this.getNoPayNum()
      this.getIfBindInvitation()
    },
    close () {
      this.bindInvitationModal = false
      this.inputModalText.text = ''
    },
    goBind () {
      if (!this.login) {
        this.register_clickHandler()
      } else {
        this.bindInvitationModal = true
      }
    },
    /**
     * 判断用户是否绑定了邀请码
     */
    getIfBindInvitation (params) {
      this.$API.customersInfo(params).then(res => {
        // 如果绑定了
        const data = res.data
        console.log(data)
        if (data.invitationCode) {
          // this.hasbind = true
          this.invitationCode = data.invitationCode
        }
      })
        .catch(res => {})
    },
    async bindInvitation (params) {
      let _res = await this.$API.bindInvitation(params).catch(res => {
        console.log(res, '---------------------')
        res.status === 500 && (this.errCode = true)
      })
      if (_res && _res.data.invitationCode) {
        // this.hasbind = true
        this.invitationCode = _res.data.invitationCode
        this.$store.dispatch('getInvitationInfo', {
          // hasBind: false,
          invitationCode: _res.data.invitationCode
        })
        this.close()
        wx.showToast({
          title: '绑定成功',
          icon: 'success',
          duration: 2000
        })
      }
    },
    click_hander_operation () {
      if (this.$Utils.isArray(this.invitationInputModal) && this.invitationInputModal.indexOf('') !== -1) {
        this.definedToast('请输入正确的邀请码')
      } else {
        const invatitionCode = this.invitationInputModal.join('')
        this.bindInvitation({invitationCode: invatitionCode})
      }
    },
    async getNoPayNum () {
      let { data } = await Api.getCount().catch(res => {})
      if (this.$Utils.isObject(data)) {
        this.noPayNum = data
      }
    },
    goToOrderList (type) {
      if (!this.login) {
        return this.definedToast('请先登录~')
      }
      wx.navigateTo({
        url: '/pages/Order/list?type=' + type
      })
    },
    definedToast (title) {
      wx.showToast({
        title: title,
        icon: 'none',
        duration: 800
      })
    },
    register_clickHandler () {
      this.$store.commit('IF_NEED_IMPROVE', true)
      this.$router.push({ path: '/pages/Auth/index', query: { isImpower: true, redirect: '/pages/Home/index', params: JSON.stringify({ page: 'my' }) } })
    },
    callPhone (telNum) {
      wx.makePhoneCall({
        phoneNumber: telNum
      })
    },
    sureCall () {
      let telNum = '400-6868-832'
      this.callPhone(telNum)
    },
    cancelCall () {
      this.sureCallModal = false
    },
    call () {
      this.sureCallModal = true
    },
    goManageAddress () {
      if (!this.login) {
        this.definedToast('请先登录~')
        return
      }
      wx.navigateTo({
        url: '/pages/Address/index'
      })
    },
    helpCenter () {
      wx.navigateTo({
        url: '/pages/Others/userAgreement'
      })
    }
  },
  onHide () {
    this.sureCallModal = false
  },
  onUnload () {
    this.sureCallModal = false
  },
  watch: {
    inputModalText: {
      handler (cur, old) {
        // console.log(old.text)
        this.errCode = false
        for (let i = 0; i < 6; i++) {
          this.invitationInputModal[i] = old.text.split('')[i] || ''
        }
      },
      deep: true
    }
  }
}
</script>
<style lang="stylus" scoped>
.fixed-body {
  overflow-y: hidden;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.wait-pay-count {
  position: absolute;
  // background #F25D51
  width: 36rpx;
  height: 36rpx;
  line-height: 36rpx;
  right: 6rpx;
  top: -10rpx;
  font-size: 22rpx;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: #F25D51;
  border-radius: 50%;
  border: 1px solid #F25D51;
}

.my-container .boom-modal {
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  display: flex;
  position: fixed;
  top: 0;
  z-index: 2;

  .content-box {
    min-height: 200rpx;
    width: 588rpx;
    background: #fff;
    border-radius: 16rpx;
    height: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    font-size: 32rpx;
    color: #555;
    // padding: 35rpx;
    .del-modal {
      .word {
        text-align: center;
        color: #000;
        font-size: 36rpx;
        padding: 55rpx 0;
        border-bottom: 2rpx solid #eee;
        // width: 588rpx;
        // margin-left: -33rpx;
      }

      .confirm-del-box {
        display: flex;

        .btn {
          flex: 1;
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          // padding-top: 10px;
          height 100rpx
        }

        .border-right {
          border-right: 2rpx solid #eee;
          height: 100rpx;
          position: absolute;
          left: 50%;
        }

        .cancel {
          border-right:2rpx solid #eee;
        }

        .sure {
        }
      }
    }
    .word {
      font-size: 34rpx;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
    }
  }
}

.my-container .boom-modal.invitation-modal{
  .shadow{
    // background:rgba(0,0,0,0.5);
    display:absolute;
    width:100%;
  }
  .content-box{
    display:flex;
    flex-direction:column;
    align-items:center;
    height:500rpx;
    box-sizing:border-box;
    overflow hidden
    .word{
      margin-top 50rpx
      font-size:36rpx;
    }
    .no-code{
      font-size:24rpx;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(247,18,18,1);
      margin-top 15rpx
      height 30rpx
    }
  }
  .input-modal{
    height 66rpx
    display:flex;
    padding:30rpx 0 80rpx;
    .input-box{
      span{
        margin:0 14rpx;
        border-bottom:2rpx solid #E4E4E4;
        width:44rpx;
        height: 65rpx;
        display:inline-block;
        text-align:center;
        color:#333;
        font-size 40rpx
        font-family:PingFang-SC-Medium;
        font-weight:500;
        box-sizing border-box
      }
    }
    input{
      color:transparent;
      position:absolute;
      opacity 0
      width:1060rpx;
      left:-50%;
      height 90rpx
    }
  }
  .invatition-btn{
    position relative
    img{
      width:499rpx;
      height:139rpx;
    }
    span{
      color #fff
      position:absolute;
      left 50%
      top 50%
      transform translate(-50%,-80%)
    }
  }
}
.my-container {
  font-family: PingFang-SC-Regular;
}

.my-container .for-bg-color {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #F5F8FA;
}

.my-container .header {
  background: #fdd317;
  height: 290rpx;
  padding: 0 30rpx;
}

.my-container .header-content {
  position: relative;
  margin-bottom: 160rpx;
}

.my-container .userImgInfo {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20rpx;
  height: 140rpx;
  box-sizing: border-box;
}

.my-container .userImgInfo>img {
  height: 100rpx;
  width: 100rpx;
  border-radius: 50%;
}

.my-container .register-box>.Hi {
  width: 162px;
  // height:23rpx;
  font-size: 24rpx;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  // line-height:29rpx;
  text-align: center;
}

.my-container .register {
  height: 62rpx;
  width: 283rpx;
  // border:2rpx solid #000;
  border-radius: 31rpx;
  line-height: 62rpx;
  text-align: center;
  margin-left: 20rpx;
  font-size: 32rpx;
  font-weight: bold;
  font-family: PingFang-SC-Bold;
  color: rgba(144, 104, 35, 1);
  box-sizing: border-box;
  background: #fff;
  opacity: 0.4;
}

.my-container .onLine {
  font-size: 26rpx;
  margin-left: 20rpx;

  .user-name {
    width: 450rpx;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    font-size: 30rpx;
  }

  .phoneNum {
    font-size: 32rpx;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(1, 1, 1, 1);
  }
}

.my-container .my-order-box {
  padding: 20rpx;
  background: #fff;
  border-radius: 20rpx;
  position: absolute;
  width: 93%;
  left: 3.5%;
  box-sizing: border-box;
  // bottom:-200rpx;
  top: 150rpx;
}

.my-container .order-header {
  border-bottom 2rpx solid #f1f1f1
  padding: 10rpx 15rpx;
}

.my-container .order-header>div:first-child {
  font-size: 30rpx;
  font-family: PingFang-SC-Heavy;
  font-weight: 800;
  color: rgba(0, 0, 0, 1);
  position: relative;
  top: -2rpx;
}

.my-container .order-header>div:last-child {
  font-size: 24rpx;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: #ccc;
}

.my-container .order-status {
  display: flex;
  /* justify-content: space-around; */
  align-items: center;
  padding: 28rpx 0 10rpx 0;
  // width:114%;
  // margin-left:-6%;
}

.my-container .order-status>div {
  width: 25%;
  text-align: center;
  position: relative;
}

.my-container .order-status .icon {
  width: 74rpx;
  height: 74rpx;
}

.my-container .order-status>div>div {
  font-size: 24rpx;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}

.my-container .list-info .icon {
  width: 32rpx;
  height: 32rpx;
  margin-right: 10rpx;
}

.my-container .item {
  display: flex;
  justify-content: space-between;
  width: 93%;
  margin-left: 3.5%;
  background: #fff;
  height: 98rpx;
  align-items: center;
  border-radius: 12rpx;
  padding: 0 32rpx 0 44rpx;
  box-sizing: border-box;
  margin-bottom: 4rpx;
  font-size: 28rpx;
  color: #6a6969;
  font-weight: 500;
}
.item.invitation{
  .notBind{
    width 92rpx
    height 32rpx
    color #fff
    background #fc6c47
    display flex
    justify-content center
    align-items center
    font-size 24rpx
    margin-left 10rpx
  }
  .bind-operation{
    .go-bind{
      // position:absolute;
      // right:94rpx;
      margin-right 4rpx
      font-size:24rpx;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(137,137,137,1);
    }
    .has-bind{
      font-size:28px;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:#333;
    }
  }
}

.my-container .icon-word {
  display: flex;
  align-items: center;
}

.my-container .icon-word .select-word {
  font-size: 28rpx;
  font-family: PingFang-SC-Ragular;
  color: rgba(106, 105, 105, 1);
  font-weight: 400;
  display: flex;
}

.my-container .mayChange {
  margin-bottom: 20rpx;
}

.my-container .kefu-phone {
  font-size: 28rpx;
  font-family: PingFang-SC-Ragular;
  color: rgba(96, 134, 224, 1);
  margin-left: 10rpx;
}

.redPack-money {
  font-size: 36rpx;
  font-family: PingFang-SC-Bold;
  color: rgba(255, 121, 0, 1);
}

.my-container .barusertext {
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
}

.my-container .userBox {
  height: 730rpx;
  width: 72%;
  position: relative;
  top: -140rpx;
}

.my-container .bottomBar {
  height: 100%;
  width: 100%;
  background: #fff;
  border-radius: 20rpx;
  overflow: hidden;
}

.my-container .bottomTxt {
  height: 630rpx;
  margin-top: 90rpx;
  padding-left: 17px;
  padding-right: 17px;
  overflow-y: auto;
  font-size: 28rpx;
  color: #666;
}

.my-container .title {
  position: absolute;
  top: -16rpx;
  height: 100rpx;
  width: 424rpx;
  left: 50%;
  margin-left: -212rpx;
  background-size: cover;
}
</style>
