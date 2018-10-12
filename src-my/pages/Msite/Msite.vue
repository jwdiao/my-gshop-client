<template>
  <div class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <a class="header_search" slot="search">
        <i class="iconfont icon-sousuo"></i>
      </a>
      <a class="header_login" slot="login">
        <span class="header_login_text">登录|注册</span>
      </a>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav border-1px">
      <div class="swiper-container" v-if="categorys.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys" :key="index">
              <div class="food_container">
                <img :src="baseImgUrl + category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>

          </div>

        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>

      <ShopList/>
    </div>
  </div>

</template>

<script>

  import {mapState} from 'vuex'
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import ShopList from '../../components/ShopList/ShopList'
  export default {
    data(){
      return{
        baseImgUrl:'https://fuss10.elemecdn.com'
      }
    },
    mounted(){
      //获取商家列表
      this.$store.dispatch('getShops')
      //获取商品分类列表
      this.$store.dispatch('getCategorys')

    },
    /*从后台获取的轮播图(商品分类列表);如果在mounted中执行swiper时,则会出现数据列表还没有加载完成时,就执行swiper.
    这样就会出现轮播图的功能性bug,所以使用watch属性来监视categorys的数据列表加载情况,(可以延时定时器来包裹swiper)
    但是那样不会更新列表后及时执行swiper;使用vue的API $nextTick()方法,此方法是等待状态(初始化状态)更新完以后才执行;
    */
    watch:{
      categorys(){
        this.$nextTick(() => {
          new Swiper('.swiper-container', {
            pagination: {
              el: '.swiper-pagination',
            },
            loop: true
          })
        })
      }
    },
    computed:{
      ...mapState(['address','categorys']),
      categorysArr(){   //二维数组是根据categorys数据计算得来的,所以应该写到computed中
        //遍历categorys时,首先拿到categorys
        const {categorys} = this
        const arr  = [] //这是二维数组
        let smallArr = [] //这是小数组
        categorys.forEach(c => {
          if(smallArr.length === 0){
            arr.push(smallArr)
          }
          smallArr.push(c)
          if(smallArr.length === 8){
           smallArr = []
          }
        })
        return arr
      }
    },
    components:{
      ShopList
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px

</style>
