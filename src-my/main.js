import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from'./store'
import HeaderTop from './components/HeaderTop/HeaderTop'
import { Button } from 'mint-ui'
import CartControl from './components/CartControl/CartControl'
import Split from './components/split/Split'
//图片的懒加载,也是一个库,下载引入使用
import lazyLoad from 'vue-lazyLoad'

import loading from './components/Food/images/timg.gif'

import 'swiper/dist/css/swiper.min.css'
import './mock/mockServer'
import './filters'


//注册全局组件
Vue.component('HeaderTop', HeaderTop)
Vue.component(Button.name, Button);
Vue.component('CartControl',CartControl)
Vue.component('Split',Split)
Vue.use(lazyLoad,{
  loading
})

new Vue({
  el: '#app',

 /*  components: { App },
   template: '<App/>',*/
  /*render: function (createElement) {  //函数返回的标签会被渲染到el中
    return createElement(App)   // '<App/>'
  }*/
  render: h => h(App),

  router,
  store
})
