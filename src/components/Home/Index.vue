<template>
  <div id="Home" class="home">
    <div class="container">
      <div>home页</div>
    </div>
  </div>
</template>
<script>
import Api from '@api'
import Utils from '@utils/utils'
export default {
  props: ['nowSelectPage'],
  components: {},
  data () {
    return {
      goodsCount: 0
    }
  },
  computed: {},
  watch: {},
  methods: {
    init () {
      this.getGoodCount()
    },
    /** 获取banner */
    getGoodCount () {
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
      Api.getGoodCount && Api.getGoodCount().then(res => {
        wx.hideLoading()
        if (res.status === 200) {
          let data = Utils.resolveData(res.data, [{ path: 'bannerImg', width: 200 }])
          this.bannerList = data
        }
      })
        .catch(rest => {
          wx.hideLoading()
        })
      wx.hideLoading()
    }
  },
  // 下拉刷新
  onPullDownRefresh () {
    this.init()
    wx.stopPullDownRefresh()
  },
  // 触底刷新
  onReachBottom () {
  },
  onLoad () {
    this.init()
  },
  onReady () {
  },
  onShow () {
  },
  onHide () {
  },
  onUnload () {
  },
  mounted () {
  }

}
</script>
<style lang="scss" scoped>
  .home{
    .container{

    }
  }
</style>
