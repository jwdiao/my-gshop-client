import Vue from 'vue'
import VueRouter from 'vue-router'

import MSite from '../pages/Msite/Msite.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/Login/Login'
//引入userinfo路由
import Shop from '../pages/shop/shop'
import ShopGoods from '../pages/shop/shopGoods/shopGoods'
import ShopRatings from '../pages/shop/shopRatings/shopRatings'
import ShopInfo from '../pages/shop/shopInfo/shopInfo'

Vue.use(VueRouter)
export default new VueRouter({
  routes:[
    {
      path:'/msite',
      component:MSite,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/search',
      component:Search,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/order',
      component:Order,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/profile',
      component:Profile,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/login',
      component:Login
    },
    {
      path: '/shop',
      component: Shop,
      children:[
        {
          path: '/shop/goods',
          component: ShopGoods
        },
        {
          path: '/shop/ratings',
          component: ShopRatings
        },
        {
          path: '/shop/info',
          component: ShopInfo
        },
        {
          path: '',
          redirect:'/shop/goods'
        },
      ]
    },
    {
      path:'/',
      redirect:'/msite'
    },
  ]
})




