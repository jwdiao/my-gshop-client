import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from'./store'
import HeaderTop from './components/HeaderTop/HeaderTop'

//注册全局组件
Vue.component('HeaderTop', HeaderTop)

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
