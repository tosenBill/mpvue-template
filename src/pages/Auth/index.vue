<template>
  <div id="Auth">
    <div class="container" v-if="isImpower">
      <div v-if="!userImpower" class="user impower">
        <div class="img-box">
          <img src="/static/images/user_impower_bg.jpg" mode="widthFix" class="img">
          <img class="placeholder-img img" src="/static/images/head-img.jpg" mode="widthFix">
        </div>
        <div class="h1">汇订货申请获得以下权限</div>
        <div class="h2">获取您的公开信息 （昵称,头像等）</div>
        <!-- <div class="agree-select">
          <checkbox-group @change="checkboxChange">
            <label class="checkbox">
              <checkbox style="" :checked="agreeImpower" />
              授权即代表同意用户协议
            </label>
          </checkbox-group>
        </div> -->
        <button style="margin-top:50rpx;" :disabled="!agreeImpower" class="btn" :class="{'hasAgreeBtn': !agreeImpower}" @getuserinfo="getUserInfoSuccess" open-type="getUserInfo">授权微信用户信息</button>
      </div>
      <div v-if="!loginImpower&&userImpower" class="login impower">
        <div class="img-box">
          <img src="/static/images/improve-login.jpg" mode="widthFix" class="img">
          <img class="placeholder-img img" src="/static/images/head-img.jpg" mode="widthFix">
        </div>
        <div class="h1">商家端</div>
        <button  class="btn" @getphonenumber="getPhoneNumberSuccess" open-type="getPhoneNumber">微信用户一键登录</button>
      </div>
      <!-- <div @click="backToDetail">back</div> -->
    </div>
  </div>
</template>
<script>
/*
 * @Title: 授权登录
 * @Author: 沈童
 * @Date: 2019-05-14 11:06:46
 * @Params: isImpower 传入则需要授权
 * @Params: redirect 传入则需要授权
 * @Description: 1、’授权用户信息’，保存userinfo到vuex中
 * @Description: 2、’微信用户一键登录’：掉获取用户手机号接口，成功之后掉register接口，成功之后，保存token，islogin=true
 */
import { mapGetters } from 'vuex'
export default {
  components: {},
  data () {
    return {
      agreeImpower: true,
      hasAgree: false,
      userImpower: false,
      isImpower: false, // 是否需要授权
      redirect: '',
      params: ''
    }
  },
  computed: {
    ...mapGetters([
      'userInfo', 'openId', 'userPhone', 'token'
    ])
  },
  onLoad (opt) {
    console.log('授权页面 传入参数', opt)
    let { isImpower = false, redirect = '/pages/Home/index', params } = opt
    this.isImpower = isImpower
    this.redirect = redirect
    this.params = params
    this.login_handler()
  },
  onShow () {
    let title = !this.isImpower ? '商家端' : '用户授权'
    if (!this.isImpower) {
      this.redirectTo_handler()
    }
    wx.setNavigationBarTitle({title})
  },
  methods: {
    redirectTo_handler () {
      let {redirect, params = {}} = this
      if (this.isImpower) {
        return wx.navigateBack(1)
      }
      try {
        if (this.$Utils.isString(params) && params.length) {
          params = JSON.parse(params)
        }
      } catch (e) {
        params = {}
      }
      this.$router.replace({path: redirect, query: params})
    },
    checkboxChange () {
      this.agreeImpower = !this.agreeImpower
    },
    // 用户授权
    getUserInfoSuccess (res) {
      console.log('授权页面 获得手机号返回:', res)
      if (res.target && res.target.errMsg.indexOf('ok') !== -1) {
        let _userInfo = res.target.userInfo
        _userInfo.fender = (_userInfo.gender === 0 ? '未知' : (_userInfo.gender === 1 ? '男' : '女'))
        this.$store.commit('USER_INFO', _userInfo)
        this.userImpower = true
      }
      console.log(this.userInfo, '_userInfo')
    },
    getPhoneNumberSuccess (res) {
      const target = res.target
      console.log('授权页面 获得手机号返回:', res)
      if (res.target && res.target.errMsg.indexOf('ok') !== -1) {
        this.$store.dispatch('getUserPhone', {encryptedData: target.encryptedData, ivStr: target.iv, openId: this.openId}).then(data => {
          const {avatarUrl, city, gender, nickName, province} = this.userInfo
          const {openId, userPhone} = this
          this.$store.dispatch('userLogin', {
            city,
            gender,
            nickName,
            openId,
            province,
            headPortraitImgUrl: avatarUrl,
            phone: userPhone
          }).then(data => {
            this.redirectTo_handler()
          })
        })
      } else {
        wx.showToast({
          title: '获取微信手机号失败',
          icon: 'none',
          duration: 3000
        })
      }
    },
    /**
     * @description 微信登录 通过openID获得用户登录状态
     */
    login_handler () {
      wx.login({
        success: (res) => {
          console.log('授权页面 微信登录返回:', res)
          if (res.code) {
          // 发起网络请求
            this.$store.dispatch('getOpenId', {code: res.code}).then((_res) => {
              console.log('授权页面 获得用户登录状态接口:', _res)
            })
          } else {
            console.warn('授权页面 登录失败！' + res.errMsg)
          }
        }
      })
    }
  },
  onHide () {

  },
  onUnload () {

  },
  mounted () {
  },
  watch: {
    agreeImpower (newVal, oldVal) {
      if (newVal === true) {
        this.hasAgree = true
      } else {
        this.hasAgree = false
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
checkbox{
  //  border-radius: 50%;/* 圆角 */
   width: 40rpx; /* 背景的宽 */
   height: 40rpx; /* 背景的高 */
   transform:scale(.5)
}
  #Auth{
    .impower{
    	padding-top: 100rpx;
    	text-align: center;
      .img-box{
        position relative
        width:531rpx;
        margin: 0 auto
      }
    	.img{
    		width: 531rpx;
        height 436rpx
    	}
      .img-box .placeholder-img{
        position absolute
        width 105rpx
        height 105rpx !important
        left:80rpx;
        top:34rpx;
      }
      .agree-select{
        padding 10rpx 0 15rpx;
      }
      .agree-select label{
        font-size:24rpx;
        font-family:PingFang-SC-Regular;
        font-weight:bold;
        color:rgba(62,85,169,1);
        line-height:33rpx;
      }
    	.btn{
    		color: #fff;
    		border-radius: 40rpx;
    		border: none;
    		width: 670rpx;
    		line-height: 90rpx;
        font-size 40rpx
    	}
    }
    .login{
    	.img{
        width 595rpx
    		height: 412rpx;
    	}
    	.h1{
    		font-size:26rpx;
    		color: #999;
    		margin-top: 60rpx;
    	}
    	.btn{
    		background-color: #40ba20;
    		margin-top: 140rpx;
    	}
      .img-box{
        width 595rpx
      }
      .img-box .placeholder-img{
        width 183rpx
        height 183rpx !important
        left auto
        right 62rpx
        top 92rpx
      }
    }
    .user{
    	.h1{
    		font-size:28rpx;
    		margin-top: 20rpx;
    	}
    	.h2{
    		font-size:28rpx;
    		color: #999;
    	}
    	.btn{
    		background-color: #ff7900;
    		// margin-top: 50rpx;
    	}
    }
    .hasAgreeBtn{
      background #fccaa1 !important
    }
  }
</style>
