<template>
  <div id="footer">
    <div class="container">
      <div class="item home">
        <img src="/static/images/home-active-icon.png" alt="">
        <span>首页</span>
      </div>
      <div class="item my">
        <img src="/static/images/my-icon.png" alt="">
        <span>我的</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  computed: {},
  watch: {},
  onLoad () {
  },
  onShow () {

  },
  onHide () {

  },
  onUnload () {

  },
  mounted () {

  },
  methods: {}
}
</script>
<style lang="scss" scoped>
  #footer{

    .container{
      width:100%;
      height: 100rpx;
      display: flex;
      position:fixed;
      bottom:0;
      left:0;
      .item{
        flex: 1;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        img{
          width:41rpx;
          height:42rpx;
        }
      }
    }
  }
</style>
