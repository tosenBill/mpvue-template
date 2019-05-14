<template>
  <div class="Main">
    <div class="content">
      <div v-show="nowSelectPage=='index'">
        <index :nowSelectPage="nowSelectPage"/>
      </div>
      <div v-if="nowSelectPage=='my'">
        <my :nowSelectPage="nowSelectPage"/>
      </div>
    </div>
    <div class="tabBar">
      <div class="btn left" @click.stop="changePage('index')">
        <img :src="'/static/images/home/index_'+(nowSelectPage=='index'?'selected_':'')+'icon.png'" mode="widthFix" class="icon">
        <div class="title">首页</div>
      </div>
      <div class="btn right" @click.stop="changePage('my')">
        <img :src="'/static/images/home/my_'+(nowSelectPage=='my'?'selected_':'')+'icon.png'" mode="widthFix" class="icon my_icon">
        <div class="title">我的</div>
      </div>
    </div>
  </div>
</template>
<script>

import index from '@components/Home/Index'
import my from '@components/Home/My'
import Footers from '@components/Home/Footer'

export default {
  data () {
    return {
      nowSelectPage: ''
    }
  },
  computed: {
  },
  components: {
    index,
    my,
    Footers
  },
  methods: {
    changePage (e) {
      this.setNavigationBarTitle(e)
      this.nowSelectPage = e
    },
    setNavigationBarTitle (e) {
      const shopName = (this.shopInfo ? this.shopInfo.storeName : '商家端')
      const title = e === 'index' ? shopName : '个人中心'
      const backgroundColor = '#fdd317'
      if (wx.setNavigationBarTitle) {
        wx.setNavigationBarTitle({ title: title })
      }

      if (wx.setNavigationBarColor) {
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: backgroundColor
        })
      }

      if (e === 'index') {
        if (wx.showShareMenu) {
          wx.showShareMenu()
        }
      } else {
        wx.hideShareMenu()
      }
    }
  },
  onLoad (opt) { // 判断首次进去是什么页面
    let { page = 'index' } = opt
    console.log(page, 'page---------')
    this.changePage(page)
  },
  onHide () {
  },
  onUnload () {
  },
  onShow () {
    // console.log('main show')
    // if (this.login) {
    //   this.$store.dispatch(types.DO_GET_SHOPCAR_COUNT, {storeId: this.$store.getters.storeId}).then((data) => {
    //     this.shopCarCount = data.count
    //   })
    // }
  },
  mounted () {
    // let _this = this
    // if (wx.createSelectorQuery) {
    //   wx.createSelectorQuery().select('#getNumXY').boundingClientRect(function (rect) {
    //     var position = {
    //       x: rect.left + rect.width,
    //       y: rect.top
    //     }
    //     _this.$store.commit(types.CART_POINT_POSITION, position)
    //   }).exec()
    // }
  },
  onShareAppMessage () {
    const name = '爆款货源集结，限时低价采购，让您赚更多！'
    return {
      title: name,
      path: 'pages/Home/index'
    }
  }
}
</script>
<style lang="stylus" scoped>
.content>div {
  width: 100%;
  height: 100%;
  margin-bottom: 105rpx;
}

.tabBar {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: 100;
  background-color: #fff;
  border-top: 1px solid #f5f5f4;
  display: flex;
  height: 100rpx;

  .btn {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .title {
      font-size: 24rpx;
      line-height: 30rpx;
    }

    .icon {
      width: 40rpx;
      height: 42rpx;
      vertical-align: top;
      margin-top: 10rpx;
    }

    .my_icon {
      width: 50rpx;
      height: 50rpx;
    }
  }

  .left {
    float: left;
  }

  .right {
    float: right;
  }
}
</style>


