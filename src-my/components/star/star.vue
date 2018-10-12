<template>
  <div class="star" :class="`star-${size}`">
    <span class="star-item on" v-for="(sc,index) in starClasses" :key="index" :class="sc"></span>

  </div>
</template>
<script>
  const CLASS_ON = 'on'
  const CLASS_HALF = 'half'
  const CLASS_OFF= 'off'

  export default {
    props:{
      size:Number,
      score:Number,
    },
    computed:{
      /*
      动态生成星星时,是根据score来得出的,所以要使用computed属性;
      遍历span,根据方法计算得出on /half /off
        1.当分数向下取整时,就为on
        2.分数-整数分数就为half,但是默认计算小数时会有误差,所以要放大*10
        3.利用while,总星星数<5时,就为off的星星了
       */
      starClasses(){
        const scs = []
        const {score} = this
        const scoreInter = Math.floor(score)
        for (let i = 0; i < scoreInter; i++) {
         scs.push(CLASS_ON)
        }
        if(score*10 - scoreInter*10 >= 5){
          scs.push(CLASS_HALF)
        }
        while(scs.length < 5){
         scs.push(CLASS_OFF)
        }
        return scs
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
 @import "../../common/stylus/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/star48_on')
        &.half
          bg-image('./images/star48_half')
        &.off
          bg-image('./images/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star36_on')
        &.half
          bg-image('./images/star36_half')
        &.off
          bg-image('./images/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star24_on')
        &.half
          bg-image('./images/star24_half')
        &.off
          bg-image('./images/star24_off')
</style>
