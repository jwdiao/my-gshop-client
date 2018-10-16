<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <!--左侧导航区域-->
        <ul ref="typesUl">
          <li class="menu-item" v-for="(good, index) in goods" :key="index" :class="{current: index===currentIndex}"
              @click="selectItem(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <!--右侧导航区域-->
      <div class="foods-wrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods" :key="index"
                  @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57"
                       :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopCart/>
    </div>

    <!--显示放大的food标签的区域-->
    <Food :food="food" ref="food"/>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  import Food from '../../../components/Food/Food'
  import shopCart from'../../../components/shopCart/shopCart'
  export default {
    data() {
      return {
        scrollY:0,//左侧
        tops:[],//右侧
        food:{},
        isShow:false,
      }
    },
    components:{
      Food,
      shopCart,
    },



    mounted(){
      this.$store.dispatch('getGoods',()=>{
        this.$nextTick(() =>{
          //scrollY:在后面滑动过程中不断更新,初始化滚动对象
          this._initscroll()
          this._initTops()

        })
      })

    },
    methods:{
      //因为在methods中是定义回调函数的,所以为了区分其它函数下面加_下划线
      _initscroll(){
        //左侧滚动对象
       this.leftScroll =  new BScroll('.menu-wrapper',{
          click:true //会派发点击事件
        })
        //后面要用到rightScroll,但函数作用域看不到,所以用this.
       this.rightScroll =  new BScroll('.foods-wrapper',{
         click:true,
         probeType:1
       })
        //绑定scroll的监听
        this.rightScroll.on('scroll',({x,y})=>{
            // console.log('scroll',x,y)
          //更新scrollY值
          this.scrollY = Math.abs(y)
        })
        //绑定scrollEnd监听
        this.rightScroll.on('scrollEnd',({x,y})=>{
          console.log('scroll',x,y)
          //更新scrollY值
          this.scrollY = Math.abs(y)
        })
      },
      _initTops(){
        const tops = []
        let top = 0
        tops.push(top)
        //根据父元素得到子元素的值
        const lis = this.$refs.foodsUl.querySelectorAll('.food-list-hook')
        lis.forEach(li =>{
          top += li.clientHeight
          tops.push(top)
        })
        //更新状态
        this.tops = tops
      },
      //选择左侧的某个分类项
      selectItem(index){
        //得到index的对应的目标的位置
        const y = -this.tops[index]
        //更新scrollY,让点击左侧时,立刻变化
        this.scrollY = -y
        //让右侧列表滚动到此处
        this.rightScroll.scrollTo(0,y,300)
      },

      //显示隐藏放大的food
      /*
      父标签调用子标签中的方法时,是通过给子标签中定义一个ref标识,通过标识来调用
       */
      showFood(food){
        //先更新food
        this.food = food
        this.$refs.food.toggleShow()
      }
    },
    computed:{
      ...mapState(['goods']),
      //当前分类下标
      currentIndex(){
        const{scrollY,tops} = this

        //scrollY>=当前top &&<下一个top
        //top:在列表显示之后统计,后面就不会再变化了
        //scrollY:在后面滑动过程中不断更新
        //这是滑动最关键的一个环节

        const index = tops.findIndex((top,index)=>scrollY>=top && scrollY<tops[index+1])
        //只有当当前分类的下标发生改变才去执行
        if(this.index != index){
          this.index = index
          //让右侧滚动到index对应的的位置
          if(this.leftScroll){
            this.leftScroll.scrollToElement(this.$refs.typesUl.children[index],200)
          }
        }
        return index
      }
    },

  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 224px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>


