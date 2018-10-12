import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from'./store'
import HeaderTop from './components/HeaderTop/HeaderTop'
import { Button } from 'mint-ui'

import 'swiper/dist/css/swiper.min.css'
import './mock/mockServer'

//注册全局组件
Vue.component('HeaderTop', HeaderTop)
Vue.component(Button.name, Button);
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
